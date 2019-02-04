/*jshint mocha:true*/
'use strict';

const assert = require('assert');
const faas = require('@sap/faas');

describe('hello secret example', () => {

//  ************************************************************************************************

    it('using default values', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                const result = await context.callFunction('hello-secret', {});
                assert.equal(result.type, 'text/plain; charset=utf-8');
                assert.equal(result.data, 'Demo');
            }
        );
    });

//  ************************************************************************************************

    it('using deploy values', (done) => {
        faas.test(done,
            {
                'deploy-values': '../mock/values.yaml'
            },
            async (context) => {
                const result = await context.callFunction('hello-secret', {});
                assert.equal(result.type, 'text/plain; charset=utf-8');
                assert.equal(result.data, 'Nice Test!');
            }
        );
    });

//  ************************************************************************************************

    it('read secret text', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                assert.equal(context.getSecretValueString('sec1', 'text'), 'Hello World!');
            }
        );
    });

//  ************************************************************************************************

    it('read secret json', (done) => {
        faas.test(done,
            {
            },
            async (context) => {
                assert.deepStrictEqual(context.getSecretValueJSON('sec1', 'rv.json'), {
                    "Info": {
                        "Success": "Demo",
                        "Failure": "Todo"
                    },
                    "Code": {
                        "Success": "A",
                        "Failure": "X"
                    }
                });
            }
        );
    });

//  ************************************************************************************************

});

