# Example: CloudEvent Echo

The project contains a coffee event handler function and one CloudEvents trigger.
It handles the following event types:
* `com.sap.coffee.required` replying with `com.sap.coffee.produced`
* `com.sap.coffee.produced` replying with `com.sap.coffee.consumed`
* `com.sap.coffee.consumed` not sending any reply

It carefully avoids sending the same events it receives as this would immediately lead to cyclic event (message) processing as in this example also the event source will be identical.

## Requirements
* Login to your `Cloud Foundry` (CF) subaccount (using `cf login`),
* Login to your `FaaS` instance (using `xsfrt login`),
* Select an __`SAP CP Enterprise Messaging`__ (EM) service in your CF space.

## Deployment
Register your EM service in your FaaS environment. This will copy credentials from CF service key to a secure store inside FaaS.
So far this is a manual step, an administrative one:
```bash
xfsrt-cli faas service register -s <EMInstanceServiceName> -b <EMInstanceServiceKey>
```
Check the result by running.
```bash
xfsrt-cli faas service list
```
This command will list all registred services from your currently connected FaaS environment.
Keep the console window open, you may want to double-check the data in the next step.

Create a deployment file.
It will apply data to your project while it is deployed, any secret, config or service data that you would __not__ like to see inside git.
By default (if you just provide a file name) the file is created in sub-folder `deploy` which shall be ignored by git.
However, you can also specify an relative or absolute path anywhere on your machine.

Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```

The file contains now all defaults from your project. Update the generated file:
* Provide your registered service `instance` (uuid)
* Provide your registered service `key` to use (key name)
* You may want to double-check the output of command `xsfrt faas service list`

Optionally run `npm install` for project `devDependencies`:
* to run a unit test for the function
* to run and debug the function locally
* to see code proposals and better understand the function parameters

Finally, deploy the project as usual.
Run inside the project directory:
```bash
 xfsrt-cli faas project deploy -y values.yaml
```

### Test
Test the setup by sending sample events.
Use for example [`@sap/xb-msg-amqp-v100`](https://github.wdf.sap.corp/xs2-xb/xb-msg-amqp-v100), it is already registered under devDependencies:

* Edit the file `./simulate/config.js`, replace `xxx` by real credentials, further settings as needed
* Run `npm install` to get a local copy of the messaging client
* Run `node ./node_modules/@sap/xb-msg-amqp-v100/examples/producer.js ../../../../simulate/config.js`

The messaging client project contains more examples.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).