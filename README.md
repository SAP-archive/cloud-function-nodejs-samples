# Functions Node.js - Samples for SAP Cloud Platform Extension Factory

## Description
In the following the capabilities of the sub component **Functions** of the **SAP Cloud Platform Extension Factory, serverless runtime** (in short: **Functions**) will be demonstrated. Functions provide a cloud-based serverless framework for the development of decoupled and resilient applications and integration flows (using SAP Cloud Integration) to support asynchronous communication principles.
Direct integration with SAP S/4HANA Business Event Handling allows efficient development of innovative and scaling extensions.

This repository provides documentation and samples of how to implement functions (Node.js) on **SAP Cloud Platform** in the Cloud Foundry environment. Details on each sample application and the covered scenario are described in the table _List of content and sample projects_ below.

For more details about **Functions** take a look at [Functions on SAP Help portal](https://help.sap.com/viewer/bf7b2ff68518427c85b30ac3184ad215/Cloud/en-US/7b8cc2b0e8d141d6aa37c7dff4d70b82.html).

## List of content and sample projects

|Sample/Content|Scenario|Scenario Description|
|---|---|---|
|[amqp-echo](./examples/amqp-echo)| Basic `AMQP 1.0` example | An echo function with messaging |
|[call-other-function](./examples/call-other-function)| Basic example | A function calls another function |
|[hello-oauth](./examples/hello-oauth) | Basic `OAuth` example | The function is triggred by an HTTP request and does `OAuth` validation of the token using a pre-defined public key |
|[hello-oauth-xsuaa](./examples/hello-oauth-xsuaa) | Advanced `OAuth` example using custom `XSUAA` | The function is triggred by an HTTP request and does `OAuth` validation of the token using a custom `XSUAA` instance |
|[hello-secret](./examples/hello-secret) | Basic example | A function extracts data from a secret |
|[hello-timer](./examples/hello-timer)| Basic example | A function that is triggered according to a CRON expression based schedule |
|[qrcode-producer](./examples/qrcode-producer)| Basic example | A function produces the current timestamp as QR code |
|[s4sdk](./examples/s4sdk)| Advanced example | A function leverages the `SAP Cloud SDK for JavaScript` to interact with the `BusinessPartner` API exposed by an `SAP S/4HANA` system |
|[kafka-producer](./examples/kafka-producer)| Advanced example, requires Kafka broker instance | A function is triggered by a message and produces a message on a Kafka topic |

## Requirements
To run the samples, make sure you have completed the [initial setup](https://help.sap.com/viewer/bf7b2ff68518427c85b30ac3184ad215/Cloud/en-US/80f67e476a8447378a72b3fcfbce8f3e.html) first.

1. Install Node.js

   Download and install [Node.js](https://nodejs.org/en/download/)(includes npm).
   The Node.js version must be >= 8.12.x.
   
2. Install __xfsrt-cli__

    Download the binary either from Nexus or from the [CP Tools Page](https://tools.hana.ondemand.com/#cloud).

3. Install __faas-sdk__

    Add the SAP NPM Registry to your npm configuration for all `@sap` scoped modules.
    ```bash
    npm config set "@sap:registry=https://npm.sap.com"
    ```

    Installation or update:
    * Linux
        ```bash
        sudo npm install @sap/faas -g
        ````
    * Windows (as usual user)
        ```bash
        npm install @sap/faas -g
        ````

    Finally, run:
    ```bash
    faas-sdk version
    ```
    to test successful installation.

4. Install CloudFoundry command line tools (CF CLI)

    [Download and install the Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html).

    Run the command `cf login`, and [login to your Cloud Foundry environment](https://developers.sap.com/tutorials/hcp-cf-getting-started.html).

    Make sure your **SAP Cloud Platform Extension Factory** [service instance](https://help.sap.com/viewer/bf7b2ff68518427c85b30ac3184ad215/Cloud/en-US/06f5c1adeb304f37b88d51dcd30d9a1b.html) and [service key](https://help.sap.com/viewer/bf7b2ff68518427c85b30ac3184ad215/Cloud/en-US/8400ccd0efc94c3096a9468c1e5f63ce.html) exist.

    Further necessary configuration and settings are dependent on the specific sample and are documented there.

## Download and Installation

To download and install the samples just [clone](https://gist.github.com/derhuerst/1b15ff4652a867391f03) this repository using this command:
```bash
git clone https://github.com/SAP/cloud-function-nodejs-samples
```

For details on how to configure and run the samples please take a look into the README in the corresponding samples directory.

The file __faas.json__ in each sample directory is used as a manifest. It defines secrets, functions and triggers
for one single project.

## Debugging using `Visual Studio Code`

For debugging purposes, the following template `launch.json` can be adapted and used:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/examples/<specific_example>/node_modules/@sap/faas/lib/cli.js",
            "cwd": "${workspaceFolder}/examples/<specific_example>",
            "args": [
                "run",
                "-y",
                "values.yaml"
            ]
        }
    ]
}
```

## Support
This project is _as-is_ with no support, no changes being made.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the _SAP SAMPLE CODE LICENSE AGREEMENT, v1.0-071618_ except as noted otherwise in the [LICENSE file](./LICENSE.txt).
