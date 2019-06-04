'use strict';

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
const handler = async (event, context) => {
    const now = new Date();
    console.log(now.toISOString());
    return now.toISOString();
};

module.exports = handler;
