# Example: Function calling another Function

A function `chain-func1` will call another function `chain-func2`.

## Deployment
Use the faas CLI.

### Deploy as Project

Deploy the complete `call-other-function` sample as a project.
```
$ faas-cli project deploy --from-file call-other-function -s <FAAS_SERVICE> -k <FAAS_KEY> -v
```
