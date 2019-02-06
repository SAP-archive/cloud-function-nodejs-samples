# Example: hello-amqp
This is a helloworld AMQP 1.0 and functions example.

The producer function sends a message, each time it is executed via an HTTP trigger.

The consumer functions is subscribed to the queue which the producer function uses as a message target.

The consumer function prints the message payload into the logs.

## Requirements
To run this sample an `Enterprise Messaging Service @SAP CP` is required.

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

## Test
Invoke the producer function via invoking the HTTP trigger URL. 
The HTTP trigger URL can be retrieved:
```
faas-cli httptrigger get hello-amqp-http -s <FAAS_SERVICE> -k <FAAS_KEY>
```

View the logs of the consumer function.
```
faas-cli function logs hello-amqp-consumer -s <FAAS_SERVICE> -k <FAAS_KEY>
```

Expected result:
* The logs should display the sent message:
```
msg: {
  "text": "Hello"
}
```

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).