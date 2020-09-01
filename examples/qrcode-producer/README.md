# Example: QR Code Producer

This example deploys a function which generates the current timestamp as an QR code.
The QR code is displayed in a browser window.

## Deployment
Deploy the project:
```bash
 xfsrt-cli faas project deploy
```

## Test
The output received after executing the [deployment](#Deployment) step contains the trigger endpoint.

Invoke the function `build-qrcode` via invoking the HTTP trigger URL.

The returned function output should the QR code of the current timestamp.


## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](../LICENSE.txt).
