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

import ballerina/regex;
import ballerina/time;

type CardValidationError distinct error;

enum CardType {
    VISA = "VISA",
    MASTER_CARD = "MASTERCARD"
}

type CardTypeInfo record {|
    CardType cardType;
    string pattern;
|};

final CardTypeInfo[] & readonly cardDetails = [
    {
        cardType: VISA,
        pattern: "^4[0-9]{12}(?:[0-9]{3})?$"
    },
    {
        cardType: MASTER_CARD,
        pattern: "^5[1-5][0-9]{14}$"
    }
];

isolated function getCardType(string cardNumber) returns CardType|error {
    string formattedCardNumber = regex:replaceAll(cardNumber, "[^0-9]+", "");
    int cardNumberLength = formattedCardNumber.length();
    if cardNumberLength < 13 || cardNumberLength > 19 {
        return error CardValidationError("Credit card info is invalid: failed length check");
    }

    if !check isLuhnValid(formattedCardNumber) {
        return error CardValidationError("Credit card info is invalid: failed luhn check");
    }

    CardType[] cardTypes = from var cardTypeInfo in cardDetails
        where regex:matches(formattedCardNumber, cardTypeInfo.pattern)
        limit 1
        select cardTypeInfo.cardType;

    if cardTypes.length() == 0 {
        return error CardValidationError("Sorry, we cannot process the credit card. " +
                "Only VISA or MasterCard is accepted.");
    }
    return cardTypes[0];
}

isolated function isLuhnValid(string cardNumber) returns boolean|error {
    int digits = cardNumber.length();
    int oddOrEven = digits & 1;
    int sum = 0;

    foreach int count in 0 ..< digits {
        int digit = 0;
        digit = check int:fromString(cardNumber[count]);

        if ((count & 1) ^ oddOrEven) == 0 {
            digit *= 2;
            if digit > 9 {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return sum != 0 && (sum % 10 == 0);
}

isolated function validateCardExpiration(string cardNumber, int year, int month) returns error? {
    if isExpired(year, month) {
        return error CardValidationError(
                string `Your credit card (ending ${cardNumber.substring(cardNumber.length() - 4)})
                    expired on ${month}/${year}`);
    }
}

isolated function isExpired(int expireYear, int expireMonth) returns boolean {
    time:Civil currentTime = time:utcToCivil(time:utcNow());
    int year = currentTime.year;

    if year > expireYear {
        return true;
    }
    return year == expireYear && currentTime.month > expireMonth;
}
