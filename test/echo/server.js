'use strict';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const bodySizeLimit = 1000000;
const bodyMimeTypes = '*/*';
const localHostPort = process.argv.length > 2 ? parseInt(process.argv[2]) : 0;

morgan.token('remote-port', (req, res) => req.connection.remotePort);

const app = express();
app.use(morgan(':remote-addr :remote-port :method :url :status - :res[content-length] bytes - :res[content-type] - :response-time ms'));
app.use(bodyParser.raw({limit: `${bodySizeLimit}mb`, type:bodyMimeTypes}));
app.use(bodyParser.json({limit: `${bodySizeLimit}mb`}));
app.use(bodyParser.urlencoded({limit:`${bodySizeLimit}mb`, extended: true}));

app.all('*', (req, res) => {
    switch (req.method) {
        case 'OPTIONS':
            res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
            res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
            res.end();
            break;
        case 'POST':
            res.header('content-type', req.headers['content-type']);
            res.status(200).send(req.body);
            break;
        default:
            res.status(500).send(http.STATUS_CODES[500]);
    }
});

const srv = app.listen(localHostPort);
console.log(`http server listening at port ${srv.address().port}`);

