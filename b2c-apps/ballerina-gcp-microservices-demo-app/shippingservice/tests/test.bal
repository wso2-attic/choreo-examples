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

import ballerina/test;
import lakshansivagnanasothy/client_stubs as stubs;

@test:Config {}
function shippingTest() returns error? {
    stubs:ShippingServiceClient ep = check new ("http://localhost:9095");
    stubs:GetQuoteRequest req1 = {
        address: {
            street_address: "Muffin Man",
            city: "London",
            state: "",
            country: "England"
        },
        items: [
            {
                product_id: "23",
                quantity: 1
            },
            {
                product_id: "46",
                quantity: 3
            }
        ]
    };
    stubs:GetQuoteResponse getQuoteResponse = check ep->GetQuote(req1);
    int units = getQuoteResponse.cost_usd.units;
    int nanos = getQuoteResponse.cost_usd.nanos;
    test:assertEquals(units, 8);
    test:assertEquals(nanos, 990000000);

    stubs:ShipOrderRequest req = {};
    stubs:ShipOrderResponse getSupportedCurrenciesResponse = check ep->ShipOrder(req);
    test:assertEquals(getSupportedCurrenciesResponse.tracking_id.length(), 18);
}
