'use strict';

const client = require('./client');

module.exports = function(event, context) {
    const options = context.getSecretValueJSON('hello-amqp-service-secret', 'dial');
    const target = context.getConfigValueString('hello-amqp-client', 'target');

    const stream = client.stream(options,target);

    return new Promise((resolve, reject) => {

        stream.write({
            payload: Buffer.from(JSON.stringify({text: 'Hello'})),
            done: () => { resolve('Message sent'); },
            failed: reject
        });

    });
};