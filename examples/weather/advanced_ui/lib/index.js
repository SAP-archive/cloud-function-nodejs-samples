'use strict';
/** 
* @typedef {import("@sap/faas").Faas.Event} Faas.Event 
* @typedef {import("@sap/faas").Faas.Context} Faas.Context 
*/


const ejs = require('ejs');
const request = require('request');
const fs = require('fs');

let app = require('./public/js/app');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<string>}
 */
async function getWeather(event, context) {
    const [htmlContent, cssContent, posturl] = await Promise.all([readFile(__dirname + '/views/index.ejs'), readFile(__dirname + '/public/css/style.css'), context.getConfigValueString('configs', 'posturl')]);

    console.log(posturl);
    let jsUIContent = `let url = "${posturl}"; (${app.toString()})()`;
    let htmlRenderized = ejs.render(htmlContent, { cssRender: cssContent, appjsRender: jsUIContent });
    event.setResponseType('text/html');
    return htmlRenderized;
};


/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<any>}
 */
async function postWeather(event, context) {
    let city = event.data.city;
    let apiKey = await context.getSecretValueString('credentials', 'openweatherapikey');
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    const result = await new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            if (error) {
                console.log(error);
                resolve({});
            } else {
                resolve(body);
            }
        });
    });
    return result;
};

let readFile = (filename) => {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = {
    getWeather: getWeather,
    postWeather: postWeather
};

