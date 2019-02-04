/*jshint mocha:true*/
'use strict';

const assert = require('assert');
const faas = require('@sap/faas');

describe('valid build requests', () => {

//  ************************************************************************************************

    it('current time in iso format', (done) => {
        faas.test(done,
            {
                'deploy-values' : ''
            },
            async (context) => {
                const result = await context.callFunction('build-qrcode', {});
                assert.equal(result.type, 'image/png');
                assert.ok(result.data.length > 0);
            }
        );
    });

//  ************************************************************************************************

});

