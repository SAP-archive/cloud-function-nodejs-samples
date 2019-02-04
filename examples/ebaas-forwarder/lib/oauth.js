'use strict';

const oac = require('client-oauth2');
let cached = null;

/**
 * @param {FaasContext} context
 * @return {Promise}
 */
function token(context) {
    return new Promise((resolve, reject) => {
        const now = Date.now();
        if (cached !== null && now < cached.expires.valueOf() - 2000) {  // 2 seconds earlier
            resolve(cached.accessToken);
            return;
        }

        const cfg = context.getSecretValueJSON('ebaas-forwarder', 'oa2');
        const client = new oac({
            accessTokenUri: cfg.endpoint,
            clientId: cfg.client,
            clientSecret: cfg.secret,
            scopes: []
        });

        client.owner.getToken(cfg.user, cfg.password).then((result) => {
            const exp = new Date(result.expires);
            console.log(`access token updated, valid until ${exp.toGMTString()}`);
            cached = result;
            resolve(result.accessToken);
        });
    });
}

module.exports = {
    token
};

