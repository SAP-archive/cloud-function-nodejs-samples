# hello-secret Example

This example deploys a function which extracts information from a secret.

## Deployment
Use the faas CLI.

### Deploy as Project
```
$ faas-cli project deploy --from-file hello-secret -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```