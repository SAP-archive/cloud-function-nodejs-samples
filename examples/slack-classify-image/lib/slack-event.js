'use strict';
/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>|*}
 */
module.exports = function (event, context) {
    if (event.data.challenge) {
        return { challenge: event.data.challenge };
    }
    context.callFunction('slack-classify', { // do not await
        type: 'application/json',
        data: event.data
    });
};

