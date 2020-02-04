'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/

const jwt = require('jsonwebtoken');
const SAP_JWT_TRUST_ACL = JSON.stringify([{ clientid: '*', identityzone: '*' }]);
const PEM_KEY_STR_BEGIN = '-----BEGIN PUBLIC KEY-----';
const PEM_KEY_STR_END = '-----END PUBLIC KEY-----';
const PEM_KEY_LEN_BEGIN = PEM_KEY_STR_BEGIN.length;
const PEM_KEY_LEN_END = PEM_KEY_STR_END.length;

module.exports = {
    validate
};

/**
 * Validates JWT
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<?Object>}
 */
async function validate(event, context) {
    let config;
    try {
        config = await context.getSecretValueJSON('sec-oauth', 'credentials.json');
    } catch (error) {
        console.log("could not get secret value:\n" + error);
        return error;
    }
    return new Promise((resolve, reject) => {
        switch (event.auth.type) {
            case 'Bearer':
                break;
            case 'Basic':
                event.setUnauthorized();
                reject(new Error(`"Basic" authentication not supported`));
                return;
            default:
                event.setUnauthorized();
                reject(new Error(`no valid authentication header found`));
                return;
        }
        jwt.verify(event.auth.credentials, preparePublicKey(config.verificationkey), {}, (error, decoded) => {
            if (error) {
                event.setUnauthorized();
                reject(new Error(`token invalid`));
                return;
            }
            const sapError = offlineValidationSap(decoded, config);
            if (sapError) {
                event.setUnauthorized();
                reject(new Error(`token invalid in regards to SAP-specific validation ${sapError}`));
                return;
            }
            resolve(decoded);
        });
        reject(new Error('authentication failed'));
    });
}

function preparePublicKey(keyStr) {

    if (keyStr.indexOf('\n') !== -1) {
        //already contains newlines -> no further processing
        return keyStr;
    }

    if (!keyStr.startsWith(PEM_KEY_STR_BEGIN) || !keyStr.endsWith(PEM_KEY_STR_END)) {
        //No public key definition - give up
        return keyStr;
    }

    // restore new lines

    const seg = [PEM_KEY_STR_BEGIN];
    let off = PEM_KEY_LEN_BEGIN;
    let end = keyStr.length - PEM_KEY_LEN_END;
    for (; off < end; off += 64) {
        seg.push(keyStr.substring(off, off + Math.min(64, end - off)));
    }
    seg.push(PEM_KEY_STR_END);
    return seg.join('\n');
}

function offlineValidationSap(decodedToken, config) {
    if (!decodedToken.cid) {
        return new Error('Client Id not contained in access token. Giving up!');
    }
    if (!decodedToken.zid) {
        return new Error('Identity Zone not contained in access token. Giving up!');
    }

    let subscriptionsAllowed = false;
    if (decodedToken.cid.indexOf('!t') !== -1 || decodedToken.cid.indexOf('!b') !== -1) {
        subscriptionsAllowed = true;
    }
    if ((decodedToken.cid === config.clientid) && (decodedToken.zid === config.identityzoneid || subscriptionsAllowed === true)) {
        return null;
    } else if (SAP_JWT_TRUST_ACL) {
        let parsedACL;
        try {
            parsedACL = JSON.parse(SAP_JWT_TRUST_ACL);
        } catch (err) {
            return new Error(`JWT trust ACL (ACL SAP_JWT_TRUST_ACL):\n${SAP_JWT_TRUST_ACL}\ncould not be parsed successfully.\nError: ${err.message}`);
        }
        let foundMatch = false;
        for (const aclEntry of parsedACL) {
            if (((decodedToken.cid === aclEntry.clientid) || ('*' === aclEntry.clientid)) && ((decodedToken.zid === aclEntry.identityzone) || ('*' === aclEntry.identityzone))) {
                foundMatch = true;
                break;
            }
        }
        if (!foundMatch) {
            return new Error(`No match found in JWT trust ACL, found client "${decodedToken.cid}" and identity zone "${decodedToken.zid}", expected client "${config.clientid}" and identity zone "${config.identityzoneid}"`);
        }
    } else {
        if (decodedToken.cid !== config.clientid) {
            return new Error(`Client ID mismatch, found "${decodedToken.cid}", expected "${config.clientid}"`);
        } else {
            return new Error(`Identity zone mismatch, found "${decodedToken.zid}", expected "${config.identityzoneid}"`);
        }
    }
}
