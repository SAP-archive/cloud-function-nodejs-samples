# Example: hello-timer

This example deploys a function which is tiggered by a timer. The function is triggered
5 seconds past every minute. It will log the current timestamp to the console.

Cron expression for schedule:

```
sec min h mon dom dow
5   */1 * *   *   *
``` 

## Deployment
Deploy sample as a project.
```
$ faas-cli project deploy -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).
