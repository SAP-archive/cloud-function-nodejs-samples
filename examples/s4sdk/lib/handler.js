'use strict';
/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

const { BusinessPartner } = require('@sap/cloud-sdk-vdm-business-partner-service');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
module.exports = async function (event, context) {
    return BusinessPartner.requestBuilder()
        .getAll()
        .top(5)
        .execute(await context.getSecretValueJSON('s4-destination', 'credentials'));
};
