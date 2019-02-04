/*jshint mocha:true*/
'use strict';

const assert = require('assert');
const faas = require('@sap/faas');

describe('call other function example', () => {

//  ************************************************************************************************

    it('chain-func1 calls chain-func2', (done) => {
        faas.test(done,
            {},
            async (context) => {
                const source = (new Date().toISOString());
                const result = await context.callFunction('chain-func1', {
                    type: 'text/plain',
                    data: source
                });
                assert.equal(result.type, 'text/plain; charset=utf-8');
                assert.equal(result.data,  source + ' >> chain-func1 >> chain-func2');
            }
        );
    });

//  ************************************************************************************************

});