# QR Code Producer

This example deploys a function which generates the current timestamp as an QR code.
The QR code is displayed in a browser window.

## Deployment
Use the faas CLI.

### Deploy as Project
```
$ faas-cli project deploy --from-file qrcode-producer -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```

