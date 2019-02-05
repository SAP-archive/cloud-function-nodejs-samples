# Example: AMQP echo

A function is triggered by messages via AMQP trigger.
It will return (echo) the received payload.
According to the trigger configuration the function result will be sent as new message using a given topic.

## Deployment

First, create a deployment file to provide credentials, topics and queue names.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file. And finally, deploy the project as usual:
```bash
 faas-cli project deploy -y ./deploy/values.yaml -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```
