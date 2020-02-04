# Example: Function calling another Function

A function __`chain-func1`__ will call another function __`chain-func2`__.

## Deployment
Deploy the complete __`call-other-function`__ sample as a project.
```
$ xfsrt-cli faas project deploy -v
```

## Test
The HTTP trigger URL can be retrieved from:
```
xfsrt-cli faas project get chain
```
The `artifacts` array contains an object with the URL in its `name` property (and a `reference` to the HTTP trigger `chain-simple`)

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).