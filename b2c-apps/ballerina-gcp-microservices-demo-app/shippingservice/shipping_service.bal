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
import ballerinax/jaeger as _;
import lakshansivagnanasothy/client_stubs as stubs;

const FRACTION_SIZE = 1000000000;

# Gives the shipping cost estimates based on the shopping cart.
@display {
    label: "Shipping",
    id: "shipping"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "ShippingService" on new grpc:Listener(9095) {

    function init() {
        log:printInfo("Shipping service gRPC server started.");
    }

    # Provides a quote with shipping cost.
    #
    # + request - `GetQuoteRequest` contaning the user selected items
    # + return - `GetQuoteResponse` containing the shipping cost 
    remote function GetQuote(stubs:GetQuoteRequest request) returns stubs:GetQuoteResponse {
        log:printInfo(string `Received a quotation request with ${request.toString()}`);

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

    # Ships the order and provides a tracking id.
    #
    # + request - `ShipOrderRequest` containing the address and the user ordered items
    # + return - `ShipOrderResponse` containing the tracking id or an error
    remote function ShipOrder(stubs:ShipOrderRequest request) returns stubs:ShipOrderResponse {
        log:printInfo(string `Received shipping order request with ${request.toString()}`);
        stubs:Address address = request.address;
        return {
            tracking_id: generateTrackingId(string `${address.street_address}, ${address.city}, ${address.state}`)
        };
    }
}
