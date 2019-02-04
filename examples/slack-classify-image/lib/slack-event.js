'use strict';

/**
 * @param {FaasEvent} event
 * @param {FaasContext} context
 * @return {Promise|*}
 */
module.exports = function(event, context) {
    if (event.data.challenge) {
        return {challenge: event.data.challenge};
    } else {
        return context.callFunction('classify-image', {
            type: 'application/json',
            data: event.data
        });
    }
};

