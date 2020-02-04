'use strict';

const qr = require('qrcode');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
module.exports = async function (event, context) {
    return new Promise((resolve, reject) => {
        const nowUTC = (new Date()).toISOString();

        const stream = event.getResponseStream('image/png');
        stream.on('finish', resolve);
        stream.on('error', reject);

        qr.toFileStream(stream, nowUTC);
    });
};

