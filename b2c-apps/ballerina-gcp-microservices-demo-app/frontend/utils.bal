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

import ballerina/http;
import ballerina/log;
import ballerina/regex;
import lakshansivagnanasothy/client_stubs as stubs;

const COOKIE_PATH = "/";
const COOKIE_SPLIT_TOKEN = "=";
const COOKIE_DELIMITER = "; ";

isolated function getFromCookieHeader(string cookieName, string cookieStr) returns http:Cookie|http:Unauthorized {
    http:Cookie[] cookies = parseCookieHeader(cookieStr);
    http:Cookie[] filteredCookies = cookies.filter(cookie => cookie.name == cookieName);
    if filteredCookies.length() == 1 {
        return filteredCookies[0];
    }
    return {
        body: string `${cookieName} cookie is not available.`
    };
}

isolated function parseCookieHeader(string cookieStringValue) returns http:Cookie[] {
    http:Cookie[] cookiesInRequest = [];
    string[] nameValuePairs = regex:split(cookieStringValue, COOKIE_DELIMITER);
    foreach string pair in nameValuePairs {
        if regex:matches(pair, "^([^=]+)=.*$") {
            string[] nameValue = regex:split(pair, COOKIE_SPLIT_TOKEN);
            http:Cookie cookie = new (nameValue[0], nameValue.length() > 1 ? nameValue[1] : "", path = COOKIE_PATH);
            cookiesInRequest.push(cookie);
        } else {
            log:printError(string `Invalid cookie: ${pair}, which must be in the format as [{name}=].`);
        }
    }
    return cookiesInRequest;
}

isolated function getCartSize(stubs:Cart cart) returns int {
    int cartSize = 0;
    foreach stubs:CartItem {quantity} in cart.items {
        cartSize += quantity;
    }
    return cartSize;
}

isolated function toProductLocalized(stubs:Product product, string price) returns ProductLocalized {
    return {
        ...product,
        price
    };
}
