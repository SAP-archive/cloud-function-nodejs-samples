# Example: weather with basic ui

This example deploys two functions that represent a simple webpage. It allows the user to provide the name of a city and gives back the temperature in that city. 

The implementation uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve the data and was adapted based upon [this tutorial](https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b).


## Requirements

* You have to create a free account on [OpenWeatherMap.org](https://openweathermap.org/guide). Follow the guide and create an API key which you will need in the [Deployment](#Deployment) section.


## Deployment
First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file with your API key. And finally, deploy the project as usual:
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```
The deployment contains two functions with each of them having an HTTP trigger attached: `getweather` which is triggered by the `GET` request of the start page, `postweather` for the `POST` request when the form is submitted.

### Test
The output received after executing the [deployment](#Deployment) step contains the trigger URLs.

Copy the URL of the `post` trigger. Navigate to [HTML template file](./lib/views/index.ejs) and paste the URL as the value of the `action` attribute inside the `form` tag.

Re-deploy the project.

Invoke the function `getweather` via invoking the `get` HTTP trigger URL in a Browser.

You should see a web page showing a form to fill in with the name of a city of your choice. Once you click submit, you will get back the current temperature in that city.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).
