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
function currencyExchangeTest() returns error? {
    stubs:CurrencyServiceClient ep = check new ("http://localhost:9093");
    stubs:Empty req = {};
    stubs:GetSupportedCurrenciesResponse getSupportedCurrenciesResponse = check ep->GetSupportedCurrencies(req);
    test:assertEquals(getSupportedCurrenciesResponse.currency_codes.length(), 33);

    stubs:CurrencyConversionRequest reqq = {
        'from: {
            currency_code: "USD",
            units: 18,
            nanos: 990000000
        },
        to_code: "EUR"
    };
    stubs:Money money = check ep->Convert(reqq);
    test:assertEquals(money.currency_code, "EUR");
    test:assertEquals(money.nanos, 797877045);
    test:assertEquals(money.units, 16);
}
