'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/

const jwt = require('jsonwebtoken');
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
    let publicKey;
    try {
        publicKey = await context.getSecretValueJSON('sec-oauth', 'verification.json');
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
                reject(new Error('"Basic" authentication not supported'));
                return;
            default:
                event.setUnauthorized();
                reject(new Error("no valid authentication header found"));
                return;
        }

        jwt.verify(event.auth.credentials, preparePublicKey(publicKey.verificationkey), {}, (error, decoded) => {
            if (error) {
                event.setUnauthorized();
                reject(new Error('authentication failed'));
                return;
            }

            resolve(decoded);
            return;
        });
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