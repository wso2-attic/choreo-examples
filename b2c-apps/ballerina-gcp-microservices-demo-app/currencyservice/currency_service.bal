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
import ballerina/io;
import ballerina/log;
import ballerinax/jaeger as _;
import lakshansivagnanasothy/client_stubs as stubs;

const FRACTION_SIZE = 1000000000;

configurable string currencyJsonPath = "./data/currency_conversion.json";

# This service is used read the exchange rates from a JSON and convert one currency value to another.
@display {
    label: "Currency",
    id: "currency"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "CurrencyService" on new grpc:Listener(9093) {
    private final map<decimal> & readonly currencyMap;

    function init() returns error? {
        json currencyJson = check io:fileReadJson(currencyJsonPath);
        log:printInfo("Successfully read currency conversion json");
        self.currencyMap = check parseCurrencyJson(currencyJson);
        log:printInfo("Currency service gRPC server started.");
    }

    # Provides the set of supported currencies.
    #
    # + request - an empty request
    # + return - `GetSupportedCurrenciesResponse` containing supported currencies or else and error
    remote function GetSupportedCurrencies(stubs:Empty request) returns stubs:GetSupportedCurrenciesResponse {
        log:printInfo("Getting supported currencies.");
        return {currency_codes: self.currencyMap.keys()};

    }

    # Converts a specific `Money` value to a required currency.
    #
    # + request - `CurrencyConversionRequest` containing the `Money` value and the required currency
    # + return - returns the `Money` in the required currency or an error
    remote function Convert(stubs:CurrencyConversionRequest request) returns stubs:Money|error {
        stubs:Money moneyFrom = request.'from;
        //From Unit
        decimal pennies = <decimal>moneyFrom.nanos / FRACTION_SIZE;
        decimal totalUSD = <decimal>moneyFrom.units + pennies;

        //UNIT Euro
        decimal rate = self.currencyMap.get(moneyFrom.currency_code);
        decimal euroAmount = totalUSD / rate;

        //UNIT to Target
        decimal targetRate = self.currencyMap.get(request.to_code);
        decimal targetAmount = euroAmount * targetRate;

        int units = <int>targetAmount.floor();
        int nanos = <int>decimal:floor((targetAmount - <decimal>units) * FRACTION_SIZE);

        return {
            currency_code: request.to_code,
            nanos,
            units
        };
    }
}

isolated function parseCurrencyJson(json currencyJson) returns map<decimal> & readonly|error {
    map<string> currencyValues = check currencyJson.cloneWithType();
    return map from [string, string] [key, value] in currencyValues.entries()
        select [key, check decimal:fromString(value)];
}
