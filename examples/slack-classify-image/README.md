# Example: Classify an Image posted in Slack with Leonardo

## Prerequisites

A Slack application, for example within a test workspace, is required.
The Slack application defines a bot user.
The Slack application is subscribed to the __`file_shared`__ bot event.
Bot events are used, because image classification should be limited to channels where the bot user is invited.
You can manage the slack application.


## Deployment
First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file.
A token can be obtained at [Leonardo image classification overview](https://api.sap.com/api/image_classification_api/overview).
Also specify the Slack bot user token.

And finally, deploy the project as usual:
```bash
 faas-cli project deploy -y ./deploy/values.yaml -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```

## Configure Slack Endpoint
Configure the HTTP trigger URL as the corresponding slack bot event request endpoint URL.

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).
