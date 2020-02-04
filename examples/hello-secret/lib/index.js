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
module.exports = async function (event, context) {
    const text = await context.getSecretValueString('sec1', 'text');
    const rval = await context.getSecretValueJSON('sec1', 'rv.json');
    return rval.Info.Success;
};
