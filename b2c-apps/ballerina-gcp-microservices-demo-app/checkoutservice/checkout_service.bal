// Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/grpc;
import ballerina/log;
import ballerina/uuid;
import ballerinax/jaeger as _;
import lakshansivagnanasothy/client_stubs as stubs;
import lakshansivagnanasothy/money;

const string LOCALHOST = "localhost";

configurable string cartHost = LOCALHOST;
configurable string catalogHost = LOCALHOST;
configurable string currencyHost = LOCALHOST;
configurable string shippingHost = LOCALHOST;
configurable string paymentHost = LOCALHOST;
configurable string emailHost = LOCALHOST;

configurable decimal cartTimeout = 3;
configurable decimal catalogTimeout = 3;
configurable decimal currencyTimeout = 3;
configurable decimal shippingTimeout = 3;
configurable decimal paymentTimeout = 3;
configurable decimal emailTimeout = 3;

# The service retrieves the user cart, prepares the order, and orchestrates the payment, shipping, and email notification.
@display {
    label: "Checkout",
    id: "checkout"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "CheckoutService" on new grpc:Listener(9094) {
    @display {
        label: "Cart",
        id: "cart"
    }
    private final stubs:CartServiceClient cartClient;

    @display {
        label: "Catalog",
        id: "catalog"
    }
    private final stubs:ProductCatalogServiceClient catalogClient;

    @display {
        label: "Currency",
        id: "currency"
    }
    private final stubs:CurrencyServiceClient currencyClient;

    @display {
        label: "Shipping",
        id: "shipping"
    }
    private final stubs:ShippingServiceClient shippingClient;
    @display {
        label: "Payment",
        id: "payment"
    }
    private final stubs:PaymentServiceClient paymentClient;

    @display {
        label: "Email",
        id: "email"
    }
    private final stubs:EmailServiceClient emailClient;

    function init() returns error? {
        self.cartClient = check new (string `http://${cartHost}:9092`, timeout = cartTimeout);
        self.catalogClient = check new (string `http://${catalogHost}:9091`, timeout = catalogTimeout);
        self.currencyClient = check new (string `http://${currencyHost}:9093`, timeout = currencyTimeout);
        self.shippingClient = check new (string `http://${shippingHost}:9095`, timeout = shippingTimeout);
        self.paymentClient = check new (string `http://${paymentHost}:9096`, timeout = paymentTimeout);
        self.emailClient = check new (string `http://${emailHost}:9097`, timeout = emailTimeout);
        log:printInfo("Checkout service gRPC server started.");
    }

    # Places the order and process payment, shipping and email notification.
    #
    # + request - `PlaceOrderRequest` containing user details
    # + return - returns `PlaceOrderResponse` containing order details
    remote function PlaceOrder(stubs:PlaceOrderRequest request) returns stubs:PlaceOrderResponse|grpc:Error|error {
        log:printInfo(string `Received place order request with user_id=${request.user_id} user_currency=${request.user_currency}`);

        string orderId = uuid:createType1AsString();
        stubs:CartItem[] userCartItems = check self.getUserCartItems(request.user_id, request.user_currency);
        stubs:OrderItem[] orderItems = check self.prepOrderItems(userCartItems, request.user_currency);
        stubs:Money shippingPrice = check self.convertCurrency(check self.quoteShipping(request.address, userCartItems),
            request.user_currency);

        stubs:Money totalCost = {
            currency_code: request.user_currency,
            units: 0,
            nanos: 0
        };
        totalCost = money:sum(totalCost, shippingPrice);
        foreach var {item, cost} in orderItems {
            stubs:Money itemCost = money:multiplySlow(cost, item.quantity);
            totalCost = money:sum(totalCost, itemCost);
        }

        string transactionId = check self.chargeCard(totalCost, request.credit_card);
        log:printInfo(string `Payment went through ${transactionId}`);
        string shippingTrackingId = check self.shipOrder(request.address, userCartItems);
        //check self.emptyUserCart(request.user_id);

        stubs:OrderResult 'order = {
            order_id: orderId,
            shipping_tracking_id: shippingTrackingId,
            shipping_cost: shippingPrice,
            shipping_address: request.address,
            items: orderItems
        };
        log:printInfo('order.toString());
        stubs:Empty|grpc:Error result = self.sendConfirmationMail(request.email, 'order);
        if result is grpc:Error {
            log:printError(string `Failed to send order confirmation to ${request.email}`, result);
        } else {
            log:printInfo(string `Order confirmation email sent to ${request.email}`);
        }

        return {'order};
    }

    function getUserCartItems(string userId, string userCurrency) returns stubs:CartItem[]|grpc:Error {
        //stubs:GetCartRequest getCartRequest = {user_id: userId};
        // stubs:Cart|grpc:Error cartResponse = self.cartClient->GetCart(getCartRequest);
        // if cartResponse is grpc:Error {
        //     log:printError("Failed to call getCart of cart service", cartResponse);
        //     return cartResponse;
        // }
        stubs:Cart cartResponse = {
            user_id: "testuser123",
            items: [
                {
                    product_id: "OLJCESPC7Z",
                    quantity: 1
                }
            ]
        };
        return cartResponse.items;
    }

    function prepOrderItems(stubs:CartItem[] cartItems, string userCurrency) returns stubs:OrderItem[]|grpc:Error {
        stubs:OrderItem[] orderItems = [];
        foreach stubs:CartItem item in cartItems {
            stubs:GetProductRequest productRequest = {id: item.product_id};
            stubs:Product|grpc:Error productResponse = self.catalogClient->GetProduct(productRequest);
            if productResponse is grpc:Error {
                log:printError("Failed to call getProduct of catalog service", productResponse);
                return error grpc:InternalError(
                                    string `Failed to get product ${item.product_id}`, productResponse);
            }

            stubs:CurrencyConversionRequest conversionRequest = {
                'from: productResponse.price_usd,
                to_code: userCurrency
            };

            stubs:Money|grpc:Error conversionResponse = self.currencyClient->Convert(conversionRequest);
            if conversionResponse is grpc:Error {
                log:printError("Failed to call convert of currency service", conversionResponse);
                return error grpc:InternalError(string `Failed to convert price of ${item.product_id} to
                    ${userCurrency}`, conversionResponse);
            }
            orderItems.push({item, cost: conversionResponse});
        }
        return orderItems;
    }

    function quoteShipping(stubs:Address address, stubs:CartItem[] items) returns stubs:Money|grpc:InternalError {
        stubs:GetQuoteRequest quoteRequest = {
            address,
            items
        };
        stubs:GetQuoteResponse|grpc:Error getQuoteResponse = self.shippingClient->GetQuote(quoteRequest);
        if getQuoteResponse is grpc:Error {
            log:printError("Failed to call getQuote of shipping service", getQuoteResponse);
            return error grpc:InternalError(
                string `Failed to get shipping quote: ${getQuoteResponse.message()}`, getQuoteResponse);
        }
        return getQuoteResponse.cost_usd;
    }

    function convertCurrency(stubs:Money usd, string userCurrency) returns stubs:Money|grpc:InternalError {
        stubs:CurrencyConversionRequest conversionRequest = {
            'from: usd,
            to_code: userCurrency
        };
        stubs:Money|grpc:Error convertionResponse = self.currencyClient->Convert(conversionRequest);
        if convertionResponse is grpc:Error {
            log:printError("Failed to call convert of currency service", convertionResponse);
            return error grpc:InternalError(
                string `Failed to convert currency: ${convertionResponse.message()}`, convertionResponse);
        }
        return convertionResponse;
    }

    function chargeCard(stubs:Money total, stubs:CreditCardInfo card) returns string|grpc:InternalError {
        stubs:ChargeRequest chargeRequest = {
            amount: total,
            credit_card: card
        };
        stubs:ChargeResponse|grpc:Error chargeResponse = self.paymentClient->Charge(chargeRequest);
        if chargeResponse is grpc:Error {
            log:printError("Failed to call charge of payment service", chargeResponse);
            return error grpc:InternalError(
                string `Could not charge the card: ${chargeResponse.message()}`, chargeResponse);
        }
        return chargeResponse.transaction_id;
    }

    function shipOrder(stubs:Address address, stubs:CartItem[] items) returns string|grpc:UnavailableError {
        stubs:ShipOrderRequest orderRequest = {};
        stubs:ShipOrderResponse|grpc:Error shipOrderResponse = self.shippingClient->ShipOrder(orderRequest);
        if shipOrderResponse is grpc:Error {
            log:printError("Failed to call shipOrder of shipping service", shipOrderResponse);
            return error grpc:UnavailableError(
                string `Shipment failed: ${shipOrderResponse.message()}`, shipOrderResponse);
        }
        return shipOrderResponse.tracking_id;
    }

    function emptyUserCart(string userId) returns grpc:InternalError? {
        stubs:EmptyCartRequest request = {
            user_id: userId
        };
        stubs:Empty|grpc:Error emptyCart = self.cartClient->EmptyCart(request);
        if emptyCart is grpc:Error {
            log:printError("Failed to call emptyCart of cart service", emptyCart);
            return error grpc:InternalError(
                string `Failed to empty user cart during checkout: ${emptyCart.message()}`, emptyCart);
        }
    }

    function sendConfirmationMail(string email, stubs:OrderResult orderResult) returns stubs:Empty|grpc:Error {
        return self.emailClient->SendOrderConfirmation({
            email,
            'order: orderResult
        });
    }
}
