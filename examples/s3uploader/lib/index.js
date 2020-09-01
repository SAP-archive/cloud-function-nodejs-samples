'use strict';
/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

const AWS = require('aws-sdk');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<any>}
 */
module.exports = async function (event, context) {

    let credentials = await context.getSecretValueJSON('s3', 'credentials.json');

    let s3 = new AWS.S3({
        accessKeyId: credentials.access_key_id,
        secretAccessKey: credentials.secret_access_key
    });

    // let body = (event.data && typeof event.data === 'object') ? JSON.stringify(event.data) : event.data;
    const contentType = event.getContentType();
    let body;
    switch (contentType) {
        case 'application/json':
            body = JSON.stringify(event.data);
            break;
        case 'text/plain':
            body = event.data;
            break;
        default:
            body = Buffer.from(event.data, 'binary');
    }
    let params = {
        Bucket: credentials.bucket,
        Key: Date.now().toString(),
        Body: body,
    };
    try {
        return await s3.upload(params).promise();
    } catch (e) {
        console.log(e);
        return e;
    }
};