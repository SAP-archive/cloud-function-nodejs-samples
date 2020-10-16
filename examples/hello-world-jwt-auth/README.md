# Example: hello-world-jwt-auth

This examples deploys two functions and showcases the usage of a Json Web Token (JWT) for authentication purposes. 
The first function `hello-world` has two different HTTP triggers attached to it. The first trigger `jwt-auth` has authentication enabled. Once deployed, the authentication service will look for a JWT in the authorization header of the HTTP request. If present, it will try to validate the JWT against a pre-configured custom `XSUAA` instance and will let the request pass when the validity of the token was successfully confirmed.

The other trigger `no-auth` has no additional authentication enabled. This is to show that a function can be triggered by several triggers, either with authentication or without.

As a third showcase, another function, `call-hello-world`, is deployed to call `hello-world` - again without any authentication being necessary.


## Requirements
To run this sample, an instance of __`Authorization & Trust Management @SAP CP`__ of Service Plan `application` is required.

In order to be able to make use of the instance for authentication within the project, the instance has to be registered by doing:

```bash
xfsrt-cli faas service register
```

In the response output, choose the `XSUAA` instance that you want to use for authentication.

## Deployment

First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file with your specific __`Authorization & Trust Management`__ instance credentials under `service-values`. And finally, deploy the project:
```bash
xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
First, obtain a JWT using your `XSUAA` credentials.
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
xfsrt-cli faas project get hello-world-jwt-auth
```
The output contains the trigger endpoint for `jwt-auth`.

Call the function `hello-world` using the endpoint with the token:

```
GET <HTTPTriggerURL>
Authorization: Bearer <token>
```

The JSON output should contain information about the authentication method and the token you just passed to the request.

You can also check the function log on the command line
```bash
xfsrt-cli faas project logs hello-world-jwt-auth --functions hello-world
```
The output should contain a log stating that the function was called with authentication.

The endpoint of the other HTTP trigger `no-auth` for the function `hello-world` can also be found using the command mentioned above.
Calling the function using this endpoint, you should be able to trigger the function immediately and see the output without any authentication step beforehand.

Finally, you can also trigger the function `hello-world` using the other function `call-hello-world` which has its own HTTP trigger `call-hello-world`. When using the corresponding endpoint, the function `call-hello-world` will invoke `hello-world`, passing on the time of invocation and its name in the payload to `hello-world`. As before, the invocation does not require authentication and again retrieving the log of `hello-world` will confirm this as well. 

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).