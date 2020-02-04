# Example: Kafka Producer

A function is triggered by messages via AMQP trigger.
It will produce corresponding messages to a configured topic of a Kafka broker instance.

## Deployment

### Requirements
* Make sure you have downloaded and gone through the [Kafka Quickstart](https://kafka.apache.org/quickstart)
* A working instance of __`Enterprise Messaging@SAP CP`__ in a space of your subaccount.
* In your messaging instance, have two queues set up for:

    __i__ incoming messages (`inp01`): which are consumed inside the function

    __ii__  one where errors are directed to (`err01`)

* One topic for addressing:

    __iii__ error messages

### Preliminary step
Create a deployment file to provide credentials for topic and queue names and for the Kafka setup.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```

Make the following adjustments:

With respect to __`Enterprise Messaging@SAP CP`__:

* `sourceAddress` of `inp01` should point to the queue referred to in __i__
* `targetAddress` of `err01` should point to the topic referred to in __iii__

With respect to the Kafka setup:
* `topic`: the topic on which the producer sends the messages
* `host`: the host url of the Kafka broker

### Deployment
Finally, deploy the project as usual.
Run inside the project directory:
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml
```

### Test
Test the setup by sending a sample message to the queue named in `inp01`. Because the amqp trigger `kafkapush` is watching the queue, it will trigger the function  `publisher` which connects to the configured Kafka broker, subscribes to the topic and produces messages on it. Check if everything is working correctly by verifying that the messages produced to the topic can be consumed. Use the [consumer script](https://kafka.apache.org/quickstart#quickstart_consume) with your connection credentials in order to see the produced messages.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).