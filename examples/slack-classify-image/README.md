# Example: Classify an Image posted in Slack with Leonardo

A function is triggered by an image upload to a Slack channel. The function receives an event about the image upload. It then invokes the __`SAP Leonardo`__ image classification API with the image and waits for the response. The response itself contains a prediction about the possible content of the image. The function then posts the prediction to the channel. 

## Requirements

* A Slack application, for example within a test workspace, is required.
The Slack application should define a bot user and be subscribed to the __`file_shared`__ bot event.
Bot events are used, because image classification should be limited to channels where the bot user is invited.


## Deployment
First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file:
* An api key for the image classification can be obtained at [Leonardo image classification overview](https://api.sap.com/api/image_classification_api/overview).
* Also specify the Slack bot user token.

And finally, deploy the project :
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

## Configure Slack Endpoint
Go to the Configuration UI of your Slack application, navigate to __`Event Subscriptions`__ and toggle __`Enable Events`__. Configure the HTTP trigger URL as the corresponding slack bot event request endpoint URL.
The HTTP trigger URL can be retrieved from:
```
xfsrt-cli faas project get slack
```
The `artifacts` array contains an object with the URL in its `name` property (and a `reference` to HTTP trigger `slack-handler`)

## Test
Install the Slack application to your workspace. In Slack, create a channel. Invite the bot to your channel.
Click on the attachment upload button inside the channel, select an image of your choice and upload it.
As a response, you should get an `SAP Leonardo` powered probability estimation of what is contained in the image. 

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).
