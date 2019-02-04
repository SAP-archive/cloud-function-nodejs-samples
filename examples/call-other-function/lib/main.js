'use strict';

const request = require('request');

module.exports = {
    f1: first,
    f2: second
};

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
async function first(event, context) {
    const result = await context.callFunction('chain-func2', {
        type: 'text/plain',
        data: (typeof event.data === 'string' ? event.data : (new Date()).toISOString()) + ' >> ' + context.funcName
    });
    return result.data;
}

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
function second(event, context) {
    return event.data + ' >> ' + context.funcName;
}

