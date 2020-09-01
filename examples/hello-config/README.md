# Example: hello-secret

This example deploys a function which extracts information from a secret.

## Deployment
First, create a deployment file to provide credentials.
Run inside the project directory:
```bash
faas-sdk init-values -y values.yaml
```
Update the generated file. And finally, deploy the project as usual:
```bash
 xfsrt-cli faas project deploy -y ./deploy/values.yaml -v
```

### Test
The output received after executing the [deployment](#Deployment) step contains the trigger endpoint.

Invoke the function `hello-secret` via invoking the HTTP trigger URL.

The returned function output should be identical to the value specified in `values.yaml` under `secret-values`->`sec1`->`rv.json`->`Info`->`Success`


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).