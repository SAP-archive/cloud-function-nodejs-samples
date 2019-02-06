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
 faas-cli project deploy -y ./deploy/values.yaml -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).