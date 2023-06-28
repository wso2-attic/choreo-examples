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
import ballerina/test;
import lakshansivagnanasothy/client_stubs as stubs;

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "ProductCatalogService" on new grpc:Listener(9091) {
    remote function ListProducts(stubs:Empty value) returns stubs:ListProductsResponse {
        return {
            products: []
        };
    }

    remote function GetProduct(stubs:GetProductRequest value) returns stubs:Product|error {
        return {
            id: "OLJCESPC7Z",
            name: "Sunglasses",
            description: "Add a modern touch to your outfits with these sleek aviator sunglasses.",
            picture: "/static/img/products/sunglasses.jpg",
            price_usd: {
                currency_code: "USD",
                units: 19,
                nanos: 990000000
            },
            categories: ["accessories"]
        };
    }

    remote function SearchProducts(stubs:SearchProductsRequest value) returns stubs:SearchProductsResponse|error {
        return error("method not implemented");
    }
}

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "CartService" on new grpc:Listener(9092) {
    remote function AddItem(stubs:AddItemRequest request) returns stubs:Empty|error {
        return error("method not implemented");
    }

    remote function GetCart(stubs:GetCartRequest request) returns stubs:Cart|error {
        return {user_id: "3", items: [{product_id: "OLJCESPC7Z", quantity: 1}]};
    }

    remote function EmptyCart(stubs:EmptyCartRequest request) returns stubs:Empty|error {
        return {};
    }
}

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "CurrencyService" on new grpc:Listener(9093) {
    remote function GetSupportedCurrencies(stubs:Empty request) returns stubs:GetSupportedCurrenciesResponse|error {
        return error("method not implemented");
    }

    remote function Convert(stubs:CurrencyConversionRequest request) returns stubs:Money|error {
        return {
            currency_code: request.to_code,
            units: request.'from.units,
            nanos: request.'from.nanos
        };
    }
}

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "ShippingService" on new grpc:Listener(9095) {
    remote function GetQuote(stubs:GetQuoteRequest request) returns stubs:GetQuoteResponse|error {
       stubs:Money usdCost = {currency_code: "USD", nanos: 99000000, units: 8};
        return {
            cost_usd: usdCost
        };
    }

    remote function ShipOrder(stubs:ShipOrderRequest request) returns stubs:ShipOrderResponse|error {
        return {tracking_id: "AB15A51G1051A"};
    }
}

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "PaymentService" on new grpc:Listener(9096) {
    remote function Charge(stubs:ChargeRequest value) returns stubs:ChargeResponse|error {
        return {
            transaction_id: "12345678945613254689"
        };
    }
}

@grpc:Descriptor {value: stubs:DEMO_DESC}
service "EmailService" on new grpc:Listener(9097) {
    remote function SendOrderConfirmation(stubs:SendOrderConfirmationRequest request) returns stubs:Empty|error {
        return {};
    }
}

@test:Config {}
function intAddTest() returns error? {
    stubs:CheckoutServiceClient ep = check new ("http://localhost:9094");

    stubs:PlaceOrderRequest req = {
        user_id: "3",
        address: {
            country: "Sri lanka",
            city: "Colombo",
            state: "Western",
            street_address: "56,Palm Grove",
            zip_code: 10300
        },
        credit_card: {
            credit_card_number: "4444444444444448",
            credit_card_cvv: 123,
            credit_card_expiration_year: 2023,
            credit_card_expiration_month: 10

        },
        email: "ballerina@wso2.com",
        user_currency: "USD"
    };
    stubs:PlaceOrderResponse placeOrderResponse = check ep->PlaceOrder(req);
    test:assertEquals(placeOrderResponse.'order.shipping_tracking_id, "AB15A51G1051A");
    test:assertEquals(placeOrderResponse.'order.shipping_cost, {currency_code: "USD", nanos: 99000000, units: 8});
    test:assertEquals(placeOrderResponse.'order.shipping_address, {
        country: "Sri lanka",
        city: "Colombo",
        state: "Western",
        street_address: "56,Palm Grove",
        zip_code: 10300
    });
    test:assertEquals(placeOrderResponse.'order.items, [
        {
            item: {product_id: "OLJCESPC7Z", quantity: 1},
            cost: {currency_code: "USD", units: 19, nanos: 990000000}
        }
    ]);
}
