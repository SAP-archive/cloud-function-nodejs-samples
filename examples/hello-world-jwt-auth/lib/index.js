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
  let msg;
  if (event.auth && event.auth.type === '') {
    msg = 'hello world w/o auth';
  } else {
    msg = 'hello world authenticated';
  }
  console.log(msg);
  let decodedJsonWebToken = event.decodeJsonWebToken();
  return {
    "message": msg,
    "caller-data": event.data,
    "caller-token-client-id": decodedJsonWebToken.payload["client_id"]
  };
};
