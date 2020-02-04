'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/


const { Kafka } = require('kafkajs');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<any>}
 */
async function publisher(event, context) {

    const kafkaHost = await context.getConfigValueString('kafka', 'host');
    const topic = await context.getConfigValueString('kafka', 'topic');

    const message = event.data;


    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: [kafkaHost]
    });

    // The client connects to a Kafka broker
    const producer = kafka.producer();

    const run = async () => {
        // Producing
        await producer.connect();
        await producer.send({
            topic: topic,
            messages: [
                { value: message },
            ],
        });

    };

    run().catch(console.error);

}

module.exports = {
    publisher,
};