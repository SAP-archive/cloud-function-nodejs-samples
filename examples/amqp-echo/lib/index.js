'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>|*}
 */
module.exports = function (event, context) {
    if (event.ce) {
        return event.sendResponseEvent(event.ce);
    } else {
        return event.data;
    }
};
