# AWS S3 - Uploader
In this example, an uploader function is deployed. It is triggered by an HTTP trigger, extracts the payload from the request body which it then uploads to a configurable S3 bucket with a timestamp of the current time as its key. 


## Requirements
* Access/Credentials for an Amazon Web Services (AWS) S3 bucket, either through a custom account or by using the [`SAP Object Store`](https://help.sap.com/viewer/2ee77ef7ea4648f9ab2c54ee3aef0a29/Cloud/en-US/84eb69a421294ba0a407579490413dfa.html).

## Deployment
First, create a deployment file to provide credentials.

Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file.
Make the following adjustment:
  * specify the account credentials for the S3 bucket `s3`->`credentials.json`.


Finally, deploy the project as usual.
Run inside the project directory:
```bash
xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
The output received after executing the [deployment](#Deployment) step contains the trigger URL.

Invoke the function `uploader` via HTTP POST request with the HTTP trigger URL, using e.g. `cURL`:
```bash
curl --header "Content-Type: application/json"   --request POST   --data '{"hello":"world"}'   <HTTP_TRIGGER_URL>
```
The output should be a JSON containing metadata information about the S3 upload.
