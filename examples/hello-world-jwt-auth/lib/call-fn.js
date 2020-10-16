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
    const result = await context.callFunction('hello-world', {
        type: 'text/plain',
        data: (typeof event.data === 'string' ? event.data : (new Date()).toISOString()) + ' >> ' + context.funcName
    });
    return result.data;
};