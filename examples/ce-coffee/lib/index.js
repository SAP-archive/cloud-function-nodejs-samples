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
module.exports = function(event, context) {

    if (!event.ce) {
        return event.setBadRequest();
    }
    console.log(event.ce.source, event.ce.type);

    const reply = Object.assign({}, event.ce);
    switch (event.ce.type) {
        case 'com.sap.coffee.required':
            reply.type = 'com.sap.coffee.produced';
            break;
        case 'com.sap.coffee.produced':
            reply.type = 'com.sap.coffee.consumed';
            break;
        case 'com.sap.coffee.consumed':
            return undefined; // return no content
        default:
            return event.setBadRequest();
    }

    return event.sendResponseEvent(reply);

};
