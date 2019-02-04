'use strict';

const qr = require('qrcode');

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function(event, context) {
    return new Promise((resolve, reject) => {
        const nowUTC = new Date().toISOString();

        const stream = event.getResponseStream('image/png');
        stream.on('finish', resolve);
        stream.on('error', reject);

        qr.toFileStream(stream, nowUTC);
    });
};

