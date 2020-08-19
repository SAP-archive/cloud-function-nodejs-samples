# Example: hello-timer

This example deploys a function `hello-timer` which logs the execution time according to three different schedules.
The schedule for the function invocation is defined with a cron expression for each trigger.
The function is triggered by the timers `timer1`, `timer2`, `timer3` and logs the corresponding name of the trigger and timestamp of the invocation. 

## Deployment
```bash
 xfsrt-cli faas project deploy -v
```

## Test
In order to verify that the function `hello-timer` is invoked according to the configurations of the three timer triggers, view the logs using:
```
xfsrt-cli faas project logs --functions hello-timer
```

Expected result:
* You should be able to see that e.g. `timer1` causes log entries of format `"/default/sap.xfs.faas/timer1 <timestamp>` to be written every 15 seconds.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).