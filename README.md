# Functions Node.js - Samples for SAP Cloud Platform Functions

## Description
SAP Cloud Platform Functions provides a cloud-based serverless functions framework for the development of decoupled and resilient applications and integration flows (using SAP Cloud Integration) to support asynchronous communication principles.
Direct integration with SAP S/4HANA Business Event Handling allows efficient development of innovative and scaling extensions.

This repository provides documentation and samples of how to implement functions (Node.js) for SAP Cloud Platform Functions in the Cloud Foundry environment. Details on each sample application and the covered scenario are described in the table _List of content and sample projects_ below.

For more details of **SAP Cloud Platform Functions** take a look at [SAP Cloud Platform Functions on SAP Help portal](https://help.sap.com/viewer/product/SAP_FUNCTIONS/Cloud/en-US).

This repository provides samples of how to implement a function (Node.js) for SAP Cloud Platform Functions in the Cloud Foundry environment.

## List of content and sample projects

|Sample/Content|Scenario|Scenario Description|
|---|---|---|
|[amqp-echo](./examples/amqp-echo)| Basic `AMQP 1.0` example | An echo function with messaging |
|[call-other-function](./examples/call-other-function)| Basic example | A function calls another function |
|[ebaas-forwarder](./examples/ebaas-forwarder) | Advanced example | A message from `Enterprise Messaging Service @SAP CP` triggers a function. It is forwarded and stored in `Enterprise Backend as a Service @SAP CP`  |
|[hello-amqp](./examples/hello-amqp) | Basic `AMQP 1.0` example | Whenever a producer function is executed, it sends a message, which is consumed by a another function |
|[hello-secret](./examples/hello-secret) | Basic example | A function extracts data from a secret |
|[qrcode-producer](./examples/qrcode-producer)| Basic example | A function produces the current timestamp as QR code |
|[slack-classify-image](./examples/slack-classify-image)| Advanced example, requires Slack integration | An image post in Slack triggers a function. The function classifies the image via `SAP Leonardo` |

## Requirements
To run the samples a `Functions Service @SAP CP` is required.
Further necessary configuration and settings are dependent on the specific sample and are documented there.

## Download and Installation
To download and install the samples just clone this repository via:
```
git clone https://github.com/SAP/cloud-function-nodejs-samples
```

Initial steps:

1. Install __`faas-cli`__

   Download the binary either from Nexus or from [CP Tools Page](https://tools.hana.ondemand.com/#cloud).

2. Install __`faas-sdk`__

   Add the SAP NPM Registry to your npm configuration for all `@sap` scoped modules.
   ```bash
   npm config set "@sap:registry https://npm.sap.com"
   ```

   Installation or update:
   * Linux
     ```bash
     sudo npm install @sap/faas -g
     ```
   * Windows (as usual user)
     ```bash
     npm install @sap/faas -g
     ```

    And run:
    ```
    faas-sdk version
    ```
    to test successful installation.

2. Run `cf` login for your CF space
3. Make sure your `Functions Service @SAP CP` service and service key exists

For details on how to configure and run the samples please take a look into the README in the corresponding samples directory.

The file `faas.json` in each sample directory is used as a manifest. It defines secrets, functions and triggers
for one single project.

## Support
This project is _'as-is'_ with no support, no changes being made.
You are welcome to make changes to improve it but we are not available for questions or support of any kind.

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the _SAP SAMPLE CODE LICENSE AGREEMENT, v1.0-071618_ except as noted otherwise in the [LICENSE file](./LICENSE.txt).
