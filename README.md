# cloud-function-nodejs-samples
SAP Cloud Platform Functions samples written in Node.JS

## Contents
Folder [examples](examples) provides different examples as sub-folders,
where each could be hosted in an own repository actually.

The file `faas.json` is used as manifest. It defines secrets, functions and triggers
for one single project.

## Start with examples:

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
3. Make sure your FaaS service and service key exists

To run the examples:
1. Move to an empty directory and clone this repository:
   ```bash
   git clone git@github.com:SAP/cloud-function-nodejs-samples.git
   ```

2. Select an example and run in that directory
   ```bash
   faas-sdk project run
   ```

2. Afterwards run in the same directory
   ```bash
   faas-cli project deploy -s my-faas-service -k my-faas-service-key -v
   ```
