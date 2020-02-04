# Example: weather with advanced ui

This example deploys two functions that represent a simple webpage. It allows the user to provide the name of a city and gives back the temperature in that city. 

The implementation uses the [OpenWeatherMap API](https://openweathermap.org/api) to retrieve the data and was adapted based upon [this tutorial](https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893).


## Requirements

* You have to create a free account on [OpenWeatherMap.org](openweathermap.org/guide). Follow the guide and create an API key which you will need in the [Deployment](#Deployment) section.


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

The HTTP trigger URLs for the the functions can be retrieved from:
```
xfsrt-cli faas project get weather
```
The `artifacts` array contains two objects with the respective URL in the `name` property (and a `reference` to HTTP triggers `post` and `get`, respectively)

Copy the URL of the `post` trigger. Update your configuration in [values.yaml](.deploy/values.yaml) and with the URL.

Re-deploy the project.

Invoke the function `getweather` via invoking the `get` HTTP trigger URL in a Browser.

You should see a web page showing a form to fill in with the name of a city of your choice. Once you click submit, the weather for the chosen city will be displayed. In this way, you can add multiple cities and you are also able
to remove the corresponding tile by clicking the delete button in the top right corner.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).