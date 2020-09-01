# Example: Function calling another Function

A function __`chain-func1`__ will call another function __`chain-func2`__.

## Deployment
Deploy the complete __`call-other-function`__ sample as a project.
```
$ xfsrt-cli faas project deploy -v
```

## Test
The output received after executing the [deployment](#Deployment) step contains the trigger endpoint.

Invoke the __`chain-func1`__ function via invoking the HTTP trigger URL.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).