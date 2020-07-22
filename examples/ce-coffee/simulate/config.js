'use strict';

/**
 * The exported object defines the options for the message client.
 * Redefine the credentials
 * An example program of the client is running.
 * Feel free to use the client within your own code.
 */

module.exports = {
    uri: 'wss://enterprise-messaging-messaging-gateway.cfapps.sap.hana.ondemand.com/protocols/amqp10ws',
    oa2: {
        endpoint: 'https://xxx.authentication.sap.hana.ondemand.com/oauth/token',
        client: 'xxx',
        secret: 'xxx'
    },
    tune: {
        ostreamPayloadCopyLimit : 1500
    },
    data: {
        message : {
            payload: {
                chunks: [
                    Buffer.from('espresso')
                ],
                properties: {
                    'cloudEvents:specversion': '1.0',
                    'cloudEvents:source': 'urn:sap:topicNS:sap/test/cs',
                    'cloudEvents:type': 'com.sap.coffee.required',
                    'cloudEvents:id': 'demo',
                    'cloudEvents:cause': 'demo',
                    'cloudEvents:subject': ''
                },
                type: 'plain/text'
            },
        },

        target       : 'topic:sap/test/cs/ce/com/sap/coffee/produced',

        maxCount     : 10,
        logCount     : 1
    }
};
