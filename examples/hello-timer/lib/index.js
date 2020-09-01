'use strict';
/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
module.exports = async function (event, context) {
    const nowUTC = (new Date()).toISOString();
    if (event.ce) {
        console.log(event.ce.source, event.ce.time.toISOString());
    } else {
        console.log('run at', nowUTC);
    }
    return nowUTC;
};

