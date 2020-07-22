'use strict';

/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.test} test
 */

const assert = require('assert');
const {describe, it} = require('mocha');
const {test} = require('@sap/faas');

describe('call other function example', () => {

//  ************************************************************************************************

    it('shall call ce-coffee-handler', (done) => {
        test(done,
            {},
            async (context) => {
                const result = await context.callFunction('ce-coffee-handler', {
                    type: 'application/cloudevents+json',
                    data: {
                        specversion: '1.0',
                        source: 'sap/faas/demo',
                        type: 'com.sap.coffee.produced',
                        id: 'demo',
                        cause: 'demo',
                        subject: '',
                        data: 'espresso',
                        datacontenttype: 'text/plain'
                    }
                });
                assert.strictEqual(result.type, 'application/cloudevents+json');
            }
        );
    });

//  ************************************************************************************************

});