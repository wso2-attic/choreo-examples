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

import lakshansivagnanasothy/client_stubs as stubs;

const FRACTION_SIZE = 1000000000;

public const map<string> CURRENCY_SYMBOLS = {
    "USD": "$",
    "CAD": "$",
    "JPY": "¥",
    "EUR": "€",
    "TRY": "₺",
    "GBP": "£"
};

# Checks if specified value has a valid units/nanos signs and ranges.
#
# + money - object to be validated
# + return - Validity
public isolated function isValid(stubs:Money money) returns boolean => signMatches(money) && validNanos(money.nanos);

# Checks if the sign matches.
#
# + money - object to be validated
# + return - validity status
public isolated function signMatches(stubs:Money money) returns boolean =>
        money.nanos == 0 || money.units == 0 || (money.nanos < 0) == (money.units < 0);

# Checks if nanos are valid.
#
# + nanos - nano input
# + return - validity status
public isolated function validNanos(int nanos) returns boolean => -999999999 <= nanos && nanos <= +999999999;

# Checks if the money is zero.
#
# + money - object to be validated
# + return - zero status
public isolated function isZero(stubs:Money money) returns boolean => money.units == 0 && money.nanos == 0;

# Returns true if the specified money value is valid and is positive.
#
# + money - object to the validated
# + return - positive status
public isolated function isPositive(stubs:Money money) returns boolean =>
        isValid(money) && money.units > 0 || (money.units == 0 && money.nanos > 0);

# Returns true if the specified money value is valid and is negative.
#
# + money - object to the validated
# + return - negative status
public isolated function isNegative(stubs:Money money) returns boolean =>
        isValid(money) && money.units < 0 || (money.units == 0 && money.nanos < 0);

# Returns true if values firstValue and r have a currency code and they are the same values.
#
# + firstValue - first money object
# + secondValue - second money object
# + return - currency type equal status
public isolated function areSameCurrency(stubs:Money firstValue, stubs:Money secondValue) returns boolean =>
        firstValue.currency_code != "" && firstValue.currency_code == secondValue.currency_code;

# Returns true if values firstValue and secondValue are the equal, including the currency.
#
# + firstValue - first money object
# + secondValue - second money object
# + return - currency equal status
public isolated function areEqual(stubs:Money firstValue, stubs:Money secondValue) returns boolean {
    return firstValue.currency_code == secondValue.currency_code &&
                firstValue.units == secondValue.units && firstValue.nanos == secondValue.nanos;
}

# Negate returns the same amount with the sign negated.
#
# + money - object to be negated
# + return - negated money object
public isolated function negate(stubs:Money money) returns stubs:Money => {
    units: -money.units,
    nanos: -money.nanos,
    currency_code: money.currency_code
};

# Adds two `Money` values.
#
# + firstValue - first money object
# + secondValue - second money object
# + return - sum money object
public isolated function sum(stubs:Money firstValue, stubs:Money secondValue) returns stubs:Money {
    int nanosMod = 1000000000;
    int units = firstValue.units + secondValue.units;
    int nanos = firstValue.nanos + secondValue.nanos;

    if (units == 0 && nanos == 0) || (units > 0 && nanos >= 0) || (units < 0 && nanos <= 0) {
        // same sign <units, nanos>
        units += nanos / nanosMod;
        nanos = nanos % nanosMod;
    } else {
        // different sign. nanos guaranteed to not to go over the limit
        if units > 0 {
            units = units - 1;
            nanos += nanosMod;
        } else {
            units = units + 1;
            nanos -= nanosMod;
        }
    }
    return {
        units,
        nanos,
        currency_code: firstValue.currency_code
    };
}

# Slow multiplication operation done through adding the value to itself n-1 times.
#
# + money - money object to be multiplied
# + n - multiply factor
# + return - multiplied money object
public isolated function multiplySlow(stubs:Money money, int n) returns stubs:Money {
    int t = n;
    stubs:Money out = money;
    while t > 1 {
        out = sum(out, money);
        t -= 1;
    }
    return out;
}

# Used to render `Money` in a readable format.
#
# + money - `Money` value to be rendered
# + return - rendered value as a string
public isolated function renderMoney(stubs:Money money) returns string =>
        string `${CURRENCY_SYMBOLS.get(money.currency_code)}${money.units.toString()}.${(money.nanos / FRACTION_SIZE).toString()}`;
