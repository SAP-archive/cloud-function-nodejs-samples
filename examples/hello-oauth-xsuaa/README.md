# Example: hello-oauth-xsuaa

This examples deploys a function that when triggered does a `OAuth` token based validation of the request.
The check confirms that the `Authorization` header carries a valid JSON Web Token (`JWT`), and additionally does `XSUAA` specific validation of the provided credentials information. If all the validations succeed, the function logs the token payload.

## Requirements
To run this sample, an instance of __`Authorization & Trust Management @SAP CP`__ of Service Plan `application` is required.

## Deployment

First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file with your specific __`Authorization & Trust Management`__ instance credentials. And finally, deploy the project:
```bash
xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
First, get a `JWT` using your `XSUAA` credentials.
In order to do that, setup an HTTP request like the following:

```
POST https://xxx.authentication.sap.hana.ondemand.com/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id:<client-id>
client_secret:<client-secret>
grant_type:client_credentials
response_type:token
```

Replace the token endpoint (`<url>/oauth/token`), client id and secret with the real values corresponding to your __`Authorization & Trust Management`__ instance.

Once you have retrieved the token, the HTTP trigger URL can be retrieved from:
```bash
xfsrt-cli faas project get hello-oauth-xsuaa
```
The output contains the trigger endpoint.

Call the function `fun-oauth-xsuaa` using the endpoint with the token:

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