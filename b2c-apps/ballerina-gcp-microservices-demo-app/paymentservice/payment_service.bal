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

# This service validates the card details (using the Luhn algorithm) against the supported card providers and charges the card.
@display {
    label: "Payment",
    id: "payment"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "PaymentService" on new grpc:Listener(9096) {

    function init() {
        log:printInfo("Payment service gRPC server started.");
    }

    # Validate and charge the amount from the given card.
    #
    # + request - `ChargeRequest` containing the card details and the amount to charged
    # + return - `ChargeResponse` with the transaction id or an error
    remote function Charge(stubs:ChargeRequest request) returns stubs:ChargeResponse|error {
        log:printInfo(string `Received card payment request with ${request.toString()}`);

        var {credit_card_number: cardNumber, credit_card_expiration_year: year,
                credit_card_expiration_month: month} = request.credit_card;
        CardType cardType = check getCardType(cardNumber);
        check validateCardExpiration(cardNumber, year, month);

        string lastFourDigits = cardNumber.substring(cardNumber.length() - 4);
        string amount = let var {currency_code, units, nanos} = request.amount in
                    string `${currency_code}${units}.${nanos}`;
        log:printInfo(string `Payment transaction processed: ${cardType} ending ${lastFourDigits}, Amount: ${amount}`);

        return {transaction_id: uuid:createType1AsString()};
    }
}

