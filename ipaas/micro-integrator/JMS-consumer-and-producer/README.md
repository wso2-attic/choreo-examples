# Data service integration

This samples show how to create a integration which consume message from a JMS queue and send those messages to another JMS queue.

## Setting up ActiveMQ
- For this sample, [ActiveMQ](https://activemq.apache.org/download.html) is used as the broker.

## Setting up additional configurations
- JMS transport details should be added to the deployment.toml
- Create new deployment.toml file in the project root if it not present
- Add the following JMS sender and receiver configurations accordingly
```
[[transport.jms.sender]]
name = "myQueueSender"
parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
parameter.provider_url = "tcp://localhost:61616"
parameter.connection_factory_name = "QueueConnectionFactory"
parameter.connection_factory_type = "queue"
parameter.cache_level = "producer"

[[transport.jms.listener]]
name = "myQueueListener"
parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
parameter.provider_url = "tcp://localhost:61616"
parameter.connection_factory_name = "QueueConnectionFactory"
parameter.connection_factory_type = "queue"
parameter.cache_level = "consumer"

```

## Create a MI Integration
- Login to [Choreo console](https://console.choreo.dev/)
- Select iPaaS profile and create new component with name `Event-Triggeredd Integration`
- Give a name and description
- Authorize and select the GitHub details
- Select the `GitHub Account`
- Select the forked repository for `GitHub Repository`
- Select the `Branch` as `main`
- Select `WSO2 MI` as `Build Preset`
- Enter `ipaas/micro-integrator/JMS-consumer-and-producer` for the `Project Path`
- Then click on create
- Once done, go to `Deploy` section and click on `Deploy Manually` button

## Testing
- Once done go to the ActiveMQ web console or to a JMS client to send message to `SimpleStockQuoteServiceSource`
- This service will listen messages on `SimpleStockQuoteServiceSource` and send them to `SimpleStockQuoteService` queue.

