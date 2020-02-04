# To debug function locally
The helper files based on `kubeless` have been removed. Please use:
* `faas-sdk` to implement Node.js function projects
* `xfsrt-cli` to upload projects to the cloud

More details can be found [here](https://github.wdf.sap.corp/faas/faas-runtime-nodejs/blob/master/README.md).

## Installation
Add the SAP NPM Registry to your npm configuration for all `@sap` scoped modules.
```bash
npm config set "@sap:registry=https://npm.sap.com"
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

## Advantages
You will be able to:
* init projects
* init deployment files
* run and debug your functions locally
* test secret definitions as well
* test with deployment files
* write unit tests for functions using the runtime API
* work with a local IDE of your choice
