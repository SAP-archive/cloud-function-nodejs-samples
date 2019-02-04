'use strict';

const amqp = require('@sap/xb-msg-amqp-v100');

const MSG_RETRY_MS = 3000;

let cached = null;

/*
const options ={
    uri: 'wss://enterprise-messaging-messaging-gateway.cfapps.eu10.hana.ondemand.com/protocols/amqp10ws',
    oa2:{
        endpoint: 'https://xxx.authentication.eu10.hana.ondemand.com/oauth/token',
        client: 'xxx',
        secret: 'xxx'
    }
};
*/

function stream(options, target) {
    if (cached !== null) {
        return cached;
    }

    const client = new amqp.Client(options);
    cached = client.sender('out').attach(target);

    client
        .on('connected',(destination, peerInfo) => {
            console.log('connected', peerInfo.description);
        })
        .on('assert', (error) => {
            console.log(error.message);
        })
        .on('error', (error) => {
            console.log(error.message);
        })
        .on('reconnecting', (destination) => {
            console.log('reconnecting, using destination ' + destination);
        })
        .on('disconnected', (hadError, byBroker, statistics) => {
            console.log('connection lost, trying to reconnect in ' + MSG_RETRY_MS + ' ms');
            setTimeout(client.connect.bind(client), MSG_RETRY_MS);
        });

    client.connect();

    return cached;
}

module.exports = {
    stream
};