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
import lakshansivagnanasothy/client_stubs as stubs;

//Request Records

# Record containing the details of the item.
#
# + productId - product id
# + quantity - product quantity
public type AddToCartRequest record {|
    string productId;
    int quantity;
|};

# Record containing details of the user and the card.
#
# + email - user's email
# + streetAddress - user's street address
# + zipCode - user's zip code
# + city - user's city
# + state - user's state
# + country - user's country
# + creditCardNumber - credit card number
# + creditCardExpirationMonth - expiration month of the card
# + creditCardExpirationYear - expiration year of the card
# + creditCardCvv - cvv of the card
public type CheckoutRequest record {|
    string email;
    string streetAddress;
    int zipCode;
    string city;
    string state;
    string country;
    string creditCardNumber;
    int creditCardExpirationMonth;
    int creditCardExpirationYear;
    int creditCardCvv;
|};

//Response Records

type CartItemView record {
    stubs:Product product;
    int quantity;
    string price;
};

type MetadataResponse record {|
    *http:Ok;
    MetadataBody body;
|};

type MetadataBody record {|
    [string, string] userCurrency;
    string[] currencies;
    int cartSize;
    boolean isCymbalBrand;
|};

type ProductLocalized record {|
    *stubs:Product;
    string price;
|};

type HomeResponse record {|
    *http:Ok;
    HomeBody body;
|};

type HomeBody record {|
    ProductLocalized[] products;
    stubs:Ad ad;
|};

type ProductResponse record {|
    *http:Ok;
    ProductBody body;
|};

type ProductBody record {|
    ProductLocalized product;
    stubs:Product[] recommendations;
    stubs:Ad ad;
|};

type CartResponse record {|
    *http:Ok;
    CartBody body;
|};

type CartBody record {|
    stubs:Product[] recommendations;
    string shippingCost;
    string totalCost;
    CartItemView[] items;
    int[] expirationYears;
|};

type CheckoutResponse record {|
    *http:Created;
    CheckoutBody body;
|};

type CheckoutBody record {|
    stubs:OrderResult 'order;
    string totalPaid;
    stubs:Product[] recommendations;
|};
