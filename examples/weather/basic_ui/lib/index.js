'use strict';
/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

const ejs = require('ejs');
const request = require('request');
const fs = require('fs');

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
async function getWeather(event, context) {
    let [htmlContent, cssContent] = await Promise.all([readFile(__dirname + '/views/index.ejs'), readFile(__dirname + '/public/css/style.css')]);
    let htmlRenderized = ejs.render(htmlContent, { cssRender: cssContent, weather: null, error: null });
    event.setResponseType('text/html');
    return htmlRenderized;
}

/**
 * @param {Faas.Event} event
 * @param {Faas.Context} context
 * @return {Promise<*>}
 */
async function postWeather(event, context) {
    let [htmlContent, cssContent] = await Promise.all([readFile(__dirname + '/views/index.ejs'), readFile(__dirname + '/public/css/style.css')]);

    let city = event.data.city;
    let apiKey = await context.getSecretValueString('credentials', 'openweatherapikey');
    // req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const htmlOutput = await new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            if (error) {
                console.log(error);
                let htmlRenderized = ejs.render(htmlContent, { weather: null, error: 'Error, please try again', cssRender: cssContent });
                resolve(htmlRenderized);
            } else {
                console.log(response);
                let weather = JSON.parse(body);
                let htmlRenderized;
                if (weather.main === undefined) {
                    htmlRenderized = ejs.render(htmlContent, { weather: null, error: 'Error, please try again', cssRender: cssContent });
                } else {
                    let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                    htmlRenderized = ejs.render(htmlContent, { weather: weatherText, error: null, cssRender: cssContent });
                }
                resolve(htmlRenderized);
            }
        });
    });
    event.setResponseType('text/html');
    return htmlOutput;
}

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

