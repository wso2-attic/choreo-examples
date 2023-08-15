import ballerinax/trigger.shopify;
import ballerinax/slack;
import ballerina/log;


configurable string shopifyApiSecretKey = ?;
configurable string slackOauthToken = ?;

slack:ConnectionConfig slackConfig = {
    auth: {
        token: slackOauthToken
    }
};

slack:Client slackClient = check new(slackConfig);

shopify:ListenerConfig listenerConfig = {
    apiSecretKey: shopifyApiSecretKey
};

listener shopify:Listener shopifyListener = new(listenerConfig, 8090);

service shopify:OrdersService on shopifyListener {
    remote function onOrdersCreate(shopify:OrderEvent event) returns error? {

        string message = event?.name.toString();
        slack:Message messageParams = {
            channelName: "orders",
            text: "New order! No: " + message
        };

        string _ = check slackClient->postMessage(messageParams);

        log:printInfo("Message sent: " + messageParams.text);
    }
    remote function onOrdersCancelled(shopify:OrderEvent event) returns error? {

        string message = event?.name.toString();
        slack:Message messageParams = {
            channelName: "orders",
            text: "Order Canceled! Name: " + message
        };

        string _ = check slackClient->postMessage(messageParams);

        log:printInfo("Message sent: " + messageParams.text);
    }
    remote function onOrdersFulfilled(shopify:OrderEvent event) returns error? {
        // Write your logic here
    }
    remote function onOrdersPaid(shopify:OrderEvent event) returns error? {
        // Write your logic here
    }
    remote function onOrdersPartiallyFulfilled(shopify:OrderEvent event) returns error? {
        // Write your logic here
    }
    remote function onOrdersUpdated(shopify:OrderEvent event) returns error? {
        // Write your logic here
    }
}
