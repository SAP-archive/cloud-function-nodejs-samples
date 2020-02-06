/*jshint mocha:true*/
'use strict';

const assert = require('assert');
const faas = require('@sap/faas');

describe('hello timer example', () => {

//  ************************************************************************************************

    it('using default values', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                const result = await context.callFunction('hello-timer', {});
                assert.equal(result.type, 'text/plain; charset=utf-8');
            }
        );
    });

//  ************************************************************************************************

});

