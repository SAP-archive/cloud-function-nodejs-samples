'use strict';

module.exports = function(event, context) {

    const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    console.log('msg: ' + msg.toString());

    return 'Done';

};