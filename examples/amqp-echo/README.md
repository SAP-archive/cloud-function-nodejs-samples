# Example: AMQP echo

A function is triggered by messages via AMQP trigger.
It will return (echo) the received payload.
According to the trigger configuration the function result will be sent as a new message using a given topic.

## Deployment

### Requirements
* Make sure you are logged into your `Cloud Foundry` subaccount (using `cf login`)
* A working instance of __`Enterprise Messaging @SAP CP`__ in a space of above mentioned subaccount.
* In your messaging instance, have three queues set up for:

    __i__ incoming messages (`inp01`): which are consumed inside the function

    __ii__ messages returned by the function (`out01`)

    __iii__  one where errors are directed to (`err01`)

* Two topics for addressing:

    __iv__ messages produced by the function

    __v__ error messages

### Preliminary step
For this example we will register a service using the xfsrt-cli. This will simplify credential handling required for interacting with enterprise messaging inside the function:

Given the __`Enterprise Messaging`__ service instance name and binding, run the following command:

```bash
xfsrt-cli faas service register -s <EMInstanceServiceName> -b <EMInstanceServiceBinding>
```

Create a deployment file to provide credentials, topics and queue names.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file:
* Make the following adjustments:
    * `sourceAddress` of `inp01` should point to the queue referred to in __i__
    * `targetAddress` of `out01` should point to the topic referred to in __iv__
    * `targetAddress` of `err01` should point to the topic referred to in __v__

### Deployment
Finally, deploy the project as usual.
Run inside the project directory:
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml
```

### Test
Test the setup by sending a sample message to queue `inp01`. Because the amqp trigger `amqp-echo` is watching the queue, it will trigger the function  `amqp-echo` which simply returns the received message payload. According to the configuration, the returned result is sent to the topic defined in `out01`. Check if everything is working correctly by verifying that the queue subscribed to the topic received the message. If the returned function result was an error, the message was be sent to topic `err01` and the subscribed queue received it.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).