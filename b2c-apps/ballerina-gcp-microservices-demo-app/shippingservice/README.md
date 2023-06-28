# Shipping Service

The `Shipping Service` is a mock service where it returns a constant shipping cost if the cart is not empty. It also has the capability to generate a mock tracking number for the shipment. 

```bal
remote function GetQuote(stubs:GetQuoteRequest request) returns stubs:GetQuoteResponse {
    stubs:CartItem[] items = request.items;
    int count = 0;
    foreach var {quantity} in items {
        count += quantity;
    }
    float cost = 0.0;
    if count != 0 {
        cost = 8.99;
    }
    float cents = cost % 1;
    int dollars = <int>(cost - cents);

    return {
        cost_usd: {currency_code: "USD", nanos: <int>(cents * FRACTION_SIZE), units: dollars}
    };
}

remote function ShipOrder(stubs:ShipOrderRequest request) returns stubs:ShipOrderResponse {
    stubs:Address address = request.address;
    return {
        tracking_id: generateTrackingId(string `${address.street_address}, ${address.city}, ${address.state}`)
    };
}
```

### A Glimpse of comparison

The below figure provides a glimpse of the comparison of the source codes written in the Go and Ballerina languages.

<img src="/images/shipping-service.png">
