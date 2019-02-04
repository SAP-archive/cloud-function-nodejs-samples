'use strict';

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function(event, context) {
    const text = context.getSecretValueString('sec1', 'text');
    const rval = context.getSecretValueJSON('sec1', 'rv.json');
    return rval.Info.Success;
};
