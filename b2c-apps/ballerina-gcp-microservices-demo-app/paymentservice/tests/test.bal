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
function paymentTest() returns error? {
    stubs:PaymentServiceClient ep = check new ("http://localhost:9096");
    stubs:ChargeRequest req = {
        amount: {
            currency_code: "USD",
            units: 5,
            nanos: 990000000
        },
        credit_card: {
            credit_card_number: "4432-8015-6152-0454",
            credit_card_cvv: 123,
            credit_card_expiration_year: 2023,
            credit_card_expiration_month: 10
        }
    };
    stubs:ChargeResponse chargeResponse = check ep->Charge(req);
    test:assertTrue(chargeResponse.transaction_id.length() > 1);
}
