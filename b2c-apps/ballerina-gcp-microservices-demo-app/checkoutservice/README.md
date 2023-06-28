# Checkout Service

The checkout service gets called when the user confirms the checkout request. This service represents an intermediate coordination service between several services.
The `PlaceOrder` remote function will be called upon the checkout request. It will call the `Cart Service` to get the products of the cart in the user's account. Then it will match those products with `Catalog Service` and call the `Currency Service` to convert the prices to the user's preferred currency. Then it calls `Shipping Service` to get the shipping quote and it converts the shipping cost to the user's preferred currency using the `Currency Service`. Then the service calculates the total cost and calls the `Payment Service` so it would be charged from the card and it returns a transaction id. Then we ship the order using the `Shipping Service` then clear the cart of the user using the `Cart Service`. Finally, we send an email with all the details to the user's email using `Email Service` and return the order summary to the caller.

```bal
configurable string cartHost = "localhost";

service "CheckoutService" on new grpc:Listener(9094) {
    final CartServiceClient cartClient;
    ...

    function init() returns error? {
        self.cartClient = check new ("http://" + cartHost + ":9092");
        ...
    }

    remote function PlaceOrder(stubs:PlaceOrderRequest request) returns stubs:PlaceOrderResponse|grpc:Error|error {
        ...
    }
    
    ...
}
```
