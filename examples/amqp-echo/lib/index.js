'use strict';

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function(event, context) {
    return event.data;
};
