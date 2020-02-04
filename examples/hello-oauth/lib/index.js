'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/

const auth = require('./auth');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
module.exports = async function (event, context) {
    let params;
    try {
        params = await auth.validate(event, context);
    } catch (error) {
        return error.message;
    }

    // start with application logic

    console.log('jwt token payload: ' + JSON.stringify(params, null, 4));
    return { my: 'data' };
};

