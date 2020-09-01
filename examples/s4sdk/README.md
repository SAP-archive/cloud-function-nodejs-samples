# S4SDK - Business Partner
The `BusinessPartner` example demonstrated here is described in the [Blog - sap-s4hana-cloud-sdk-for-javascript-beta](https://blogs.sap.com/2018/10/02/writing-an-example-application-using-the-sap-s4hana-cloud-sdk-for-javascript-beta/).

## Requirements
* Access/Credentials for an `S4/HANA Cloud` system that provides a `BusinessPartner` OData Service. Alternatively, set up a mock server described [here](https://sap.github.io/cloud-s4-sdk-book/pages/mock-odata.html) and deploy it remotely on your account. Make sure you are logged into your subaccount (using `cf login`)

## Deployment
First, create a deployment file to provide credentials.

Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file.
Make the following adjustment:
  * specify the secret credentials for the S4/HANA system under `s4-destination`->`credentials`.

  If the mock server is used, authorization to access is not in place, so user and password can be left out. Only the URL has to be specified which is returned on the console upon deploying the mock server.


Finally, deploy the project as usual.
Run inside the project directory:
```bash
xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
The output received after executing the [deployment](#Deployment) step contains the trigger URL.

Invoke the function `s4sdk-business-partner` via invoking the HTTP trigger URL.

The output should be the first five elements of the `BusinessPartner` Service.
