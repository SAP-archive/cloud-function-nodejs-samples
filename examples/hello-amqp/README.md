# hello-amqp Example
This is a helloworld AMQP 1.0 and functions example.

The producer function sends a message, each time it is executed via an HTTP trigger.

The consumer functions is subscribed to the queue which the producer function uses as a message target.

The consumer function prints the message payload into the logs.

## Prerequisite

You have an enterprise messaging service instance.

Configure and use the following `values.yaml` for project deployment:

```
secret-values:
  hello-amqp-service:
    amqp:
      incoming:
        inp1:
          sourceAddress: 'queue:hello-amqp'
          sndSettleMode: 0
          rcvSettleMode: 0
          maxLinkCredit: 50
    dial:
      uri: 'wss://<enterprise-messaging>/protocols/amqp10ws'
      oa2:
        endpoint: 'https://xxx/oauth/token'
        client: 'xxx'
        secret: 'xxx'
    sasl:
      mechanism: ''
      user: ''
      password: ''
  hello-amqp-client:
    target: 'topic:faas/hello-amqp'
``` 

## Deployment

With the faas-cli:

```
faas-cli project deploy --from-file hello-amqp -y values.yaml -s <my-faas> -k <my-faas-service-key> -v
```

## Test
Invoke the producer function via invoking the HTTP trigger URL. 
The HTTP trigger URL can be retrieved:
```
faas-cli httptrigger get hello-amqp-http -s faas-canary -k cli-key 
```

View the logs of the consumer function.
```
faas-cli function logs hello-amqp-consumer -s faas-canary -k cli-key
```

Expected result:
* The logs should display the sent message:
```
msg: {
  "text": "Hello"
}
```