# Slack Integration Example: Classify an Image with Leonardo

## Prerequisites

A slack application, for example within a test workspace, is required.
The slack application defines a bot user.
The slack application is subscribed to the `file_shared` bot event.
Bot events are used, because image classification should be limited to channels where the bot user is invited.
You can manage the slack application.

## Deployment
Use the faas CLI.

Configure the credentials within the [secret](./secret) folder.
A token can be obtained at [Leonardo image classification overview](https://api.sap.com/api/image_classification_api/overview).
Also specify the Slack bot user token.

### Deploy as Project
```
$ faas-cli project deploy --from-file slack-classify-image -s <FAAS_SERVICE> -k <FAAS_KEY>
```

## Configure Slack Endpoint
Configure the HTTP trigger URL as the corresponding slack bot event request endpoint URL.