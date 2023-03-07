# JMS producer and consumer integration

These samples demonstrate how to create an integration that consumes messages from a JMS queue and sends those messages to another JMS queue.

## Setting up ActiveMQ
- In this sample, ActiveMQ is used as the broker. You can download ActiveMQ from their official website: [ActiveMQ](https://activemq.apache.org/download.html).

## Setting up additional configurations
- The JMS transport details should be added to the deployment.toml file.
- If a deployment.toml file is not present in the project root, create a new one.
- Add or edit the following JMS sender and receiver configurations as needed:
```
[[transport.jms.sender]]
name = "myQueueSender"
parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
parameter.provider_url = "$env{JMS_PROVIDER_URL}"
parameter.connection_factory_name = "QueueConnectionFactory"
parameter.connection_factory_type = "queue"
parameter.cache_level = "producer"

[[transport.jms.listener]]
name = "myQueueListener"
parameter.initial_naming_factory = "org.apache.activemq.jndi.ActiveMQInitialContextFactory"
parameter.provider_url = "$env{JMS_PROVIDER_URL}"
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
- JMS connection url is configure to read from environment variable. Hence configure `JMS_PROVIDER_URL` as a variable. ex: `JMS_PROVIDER_URL=tcp://<hostname or public IP>:61616`

## Testing
- Once done go to the ActiveMQ web console or to a JMS client to send message to `SimpleStockQuoteServiceSource`
- This service will listen messages on `SimpleStockQuoteServiceSource` and send them to `SimpleStockQuoteService` queue.

