# Example: hello-oauth

This examples deploys a function that when triggered does a `OAuth` token based validation of the request.
If the check confirms that the `Authorization` header carries a valid JSON Web Tokens (`JWT`) token, the function logs the token payload to the console.

## Requirements
To run this sample, a custom token validation setup is required.

For demo purposes the following can be used to generate your own `JWT` (assuming you are in UNIX system environment).
Run outside of the project directory:
```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```
This generates two files: 
* `jwtRS256.key`: the private key 
* `jwtRS256.key.pub`: the public key which you are required to provide as a secret in the [deployment](#Deployment) step

Go to [jwt.io](https://jwt.io) and choose `RS256` as Algorithm in the dropdown menu.
Paste your public key and private key in the corresponding fields under `Verify Signature`.
This will generate a `JWT` on the left panel that you should save for the final [testing](#Test).

## Deployment

First, create a deployment file to provide the custom verfication key.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file with the public key you generated above. And finally, deploy the project:
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
The HTTP trigger URL can be retrieved from:
```bash
xfsrt-cli faas project get hello-oauth
```
The `artifacts` array contains an object with the URL in its `name` property (and a `reference` to HTTP trigger `trig-oauth`)

Setup your HTTP request according to this to trigger the function:
```
GET <HTTPTriggerURL>
Authorization: Bearer <token>
```

Check the function log on the command line
```bash
xfsrt-cli faas project logs -n hello-oauth --functions fun-oauth
```

The output should contain the token payload.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).