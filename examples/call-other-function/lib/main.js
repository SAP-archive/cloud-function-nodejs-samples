'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
async function first(event, context) {
    const result = await context.callFunction('chain-func2', {
        type: 'text/plain',
        data: (typeof event.data === 'string' ? event.data : (new Date()).toISOString()) + ' >> ' + context.funcName
    });
    return result.data;
}

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
async function second(event, context) {
    return event.data + ' >> ' + context.funcName;
}

module.exports = {
    f1: first,
    f2: second
};

