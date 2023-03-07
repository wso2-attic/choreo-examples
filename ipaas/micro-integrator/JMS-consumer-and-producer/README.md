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
- Login to the [Choreo console](https://console.choreo.dev/)
- Select the iPaaS profile and create a new component with name `Event-Triggeredd Integration`
- Provide a name and description for the component.
- Authorize and select the GitHub details
- Select the `GitHub Account` and the forked repository for `GitHub Repository`
- Select the `Branch` as `main`
- Select `WSO2 MI` as `Build Preset`
- Enter ipaas/micro-integrator/JMS-consumer-and-producer as the project path.
- Click on "Create" to create the component.
- Once the component is created, go to the "Deploy" section and click on the "Deploy Manually" button.
- The JMS connection URL is configured to read from an environment variable. Therefore, configure the `JMS_PROVIDER_URL` as a variable, for example: `JMS_PROVIDER_URL=tcp://<hostname or public IP>:61616`.

## Testing

Once you have completed the setup, you can go to the ActiveMQ web console or use a JMS client to send a message to the `SimpleStockQuoteServiceSource` queue. This service will listen to messages on `SimpleStockQuoteServiceSource` and send them to `SimpleStockQuoteService` queue

