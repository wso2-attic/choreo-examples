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
import ballerina/os;
import ballerina/time;
import ballerina/uuid;
import ballerinax/jaeger as _;
import lakshansivagnanasothy/client_stubs as stubs;
import lakshansivagnanasothy/money;

const SESSION_ID_COOKIE = "sessionIdCookie";
const CURRENCY_COOKIE = "currencyCookie";
const SESSION_ID_KEY = "sessionId";
const ENABLE_SINGLE_SHARED_SESSION = "ENABLE_SINGLE_SHARED_SESSION";
final boolean isCymbalBrand = os:getEnv("CYMBAL_BRANDING") == "true";

service class AuthInterceptor {
    *http:RequestInterceptor;
    resource function 'default [string... path](http:RequestContext ctx, http:Request request)
                returns http:NextService|error? {
        http:Cookie[] cookies = request.getCookies();
        http:Cookie[] sessionIDCookies = cookies.filter(cookie => cookie.name == SESSION_ID_COOKIE);
        http:Cookie[] currencyCookies = cookies.filter(cookie => cookie.name == CURRENCY_COOKIE);
        string sessionId;
        if sessionIDCookies.length() == 0 {
            if os:getEnv(ENABLE_SINGLE_SHARED_SESSION) == "true" {
                // Hard coded user id, shared across sessions
                sessionId = "12345678-1234-1234-1234-123456789123";
            } else {
                sessionId = uuid:createType1AsString();
            }
            http:Cookie sessionIdCookie = new (SESSION_ID_COOKIE, sessionId, path = "/");
            cookies.push(sessionIdCookie);
        } else {
            sessionId = sessionIDCookies[0].value;
        }
        if currencyCookies.length() == 0 {
            http:Cookie currencyCookie = new (CURRENCY_COOKIE, "USD", path = "/");
            cookies.push(currencyCookie);
        }
        request.addCookies(cookies);
        ctx.set(SESSION_ID_KEY, sessionId);
        return ctx.next();
    }
}

# This service serves the data required by the UI by communicating with internal gRPC services.
@http:ServiceConfig {
    // cors: {
    //     allowOrigins: ["http://localhost:3000"],
    //     allowCredentials: true
    // },
    interceptors: [new AuthInterceptor()]
}
@display {
    label: "Frontend",
    id: "frontend"
}
service / on new http:Listener(9098) {

    function init() {
        log:printInfo("Frontend server started.");
    }

    resource function get products () returns stubs:Product[]|error{
        log:printInfo("get Products");
        stubs:Product[] products = check getProducts();
        log:printInfo(products.toString());
        return products;
    }

    resource function get testCart () returns stubs:Cart|error{
        log:printInfo("get test1");
        stubs:Cart cart = {
        };
        stubs:Cart|error cart2 = getCart("testuser123");
        if cart2 is stubs:Cart {
            log:printInfo(cart2.toString());
        } else {
            log:printInfo("Error:" + cart2.toString());
        }
        return cart;
    }

    # GET method to get the metadata like currency and cart size.
    #
    # + cookieHeader - header containing the cookie
    # + return - `MetadataResponse` if successful or `http:Unauthorized` or `error` if an error occurs
    resource function get metadata(@http:Header {name: "Cookie"} string cookieHeader)
                returns MetadataResponse|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }

        http:Cookie|http:Unauthorized currencyCookie = getFromCookieHeader(CURRENCY_COOKIE, cookieHeader);
        if currencyCookie is http:Unauthorized {
            return currencyCookie;
        }

        // stubs:Cart cart = check getCart("testuser123");
        stubs:Cart cart = {
            user_id: "testuser123",
            items: [
                {
                    product_id: "OLJCESPC7Z",
                    quantity: 1
                }
            ]
        };
        MetadataResponse metadataResponse = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: {
                userCurrency: [currencyCookie.value, money:CURRENCY_SYMBOLS.get(currencyCookie.value)],
                currencies: check getSupportedCurrencies(),
                cartSize: getCartSize(cart),
                isCymbalBrand: isCymbalBrand
            }
        };
        return metadataResponse;
    }

    # GET method which provides products and ads.
    #
    # + cookieHeader - header containing the cookie
    # + return - `HomeResponse` if successful or `http:Unauthorized` or `error` if an error occurs
    resource function get .(@http:Header {name: "Cookie"} string cookieHeader)
                returns HomeResponse|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        http:Cookie|http:Unauthorized currencyCookie = getFromCookieHeader(CURRENCY_COOKIE, cookieHeader);
        if currencyCookie is http:Unauthorized {
            return currencyCookie;
        }
        stubs:Product[] products = check getProducts();

        ProductLocalized[] productsLocalized = [];
        foreach stubs:Product product in products {
            stubs:Money convertedMoney = check convertCurrency(product.price_usd, currencyCookie.value);
            productsLocalized.push(toProductLocalized(product, money:renderMoney(convertedMoney)));
        }

        HomeResponse homeResponse = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: {
                products: productsLocalized,
                ad: check chooseAd()
            }
        };
        return homeResponse;
    }

    # GET method providing a specific product.
    #
    # + id - product id
    # + cookieHeader - header containing the cookie
    # + return - `ProductResponse` if successful or an `http:Unauthorized` or `error` if an error occurs
    resource function get product/[string id](@http:Header {name: "Cookie"} string cookieHeader)
                returns ProductResponse|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        http:Cookie|http:Unauthorized currencycookie = getFromCookieHeader(CURRENCY_COOKIE, cookieHeader);
        if currencycookie is http:Unauthorized {
            return currencycookie;
        }

        string userId = sessionIdCookie.value;
        stubs:Product product = check getProduct(id);
        stubs:Money convertedMoney = check convertCurrency(product.price_usd, currencycookie.value);
        ProductLocalized productLocal = toProductLocalized(product, money:renderMoney(convertedMoney));
        stubs:Product[] recommendations = check getRecommendations(userId, [id]);

        ProductResponse productResponse = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: {
                product: productLocal,
                recommendations: recommendations,
                ad: check chooseAd(product.categories)
            }
        };
        return productResponse;
    }

    # POST method to change the currency.
    #
    # + request - currency type to change
    # + cookieHeader - header containing the cookie
    # + return - `http:Response` if successful or an `http:Unauthorized` or `error` if an error occurs
    resource function post setCurrency(@http:Payload record {|string currency;|} request, @http:Header {name: "Cookie"} string cookieHeader)
                returns http:Response|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        string[] supportedCurrencies = check getSupportedCurrencies();
        //stubs:Cart cart = check getCart(sessionIdCookie.value);
        stubs:Cart cart = {
            user_id: "testuser123",
            items: [
                {
                    product_id: "OLJCESPC7Z",
                    quantity: 1
                }
            ]
        };
        http:Response response = new;
        http:Cookie currencyCookie = new (CURRENCY_COOKIE, request.currency, path = "/");
        response.addCookie(currencyCookie);
        response.setJsonPayload({
            userCurrency: [request.currency, money:CURRENCY_SYMBOLS.get(request.currency)],
            currencies: supportedCurrencies,
            cartSize: getCartSize(cart),
            isCymbalBrand
        });
        return response;
    }

    # GET method providing the cart.
    #
    # + cookieHeader - header containing the cookie
    # + return - `CartResponse` if successful or an `http:Unauthorized` or `error` if an error occurs
    resource function get cart(@http:Header {name: "Cookie"} string cookieHeader)
                returns CartResponse|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        http:Cookie|http:Unauthorized currencyCookie = getFromCookieHeader(CURRENCY_COOKIE, cookieHeader);
        if currencyCookie is http:Unauthorized {
            return currencyCookie;
        }
        string userId = sessionIdCookie.value;
        //stubs:Cart cart = check getCart(userId);
        stubs:Cart cart = {
            user_id: "testuser123",
            items: [
                {
                    product_id: "OLJCESPC7Z",
                    quantity: 1
                }
            ]
        };
        stubs:Product[] recommendations = check getRecommendations(userId, self.getProductIdFromCart(cart));
        stubs:Money shippingCost = check getShippingQuote(cart.items, currencyCookie.value);
        stubs:Money totalPrice = {
            currency_code: currencyCookie.value,
            nanos: 0,
            units: 0
        };
        CartItemView[] cartItems = [];
        foreach stubs:CartItem {product_id, quantity} in cart.items {
            stubs:Product product = check getProduct(product_id);
            stubs:Money convertedPrice = check convertCurrency(product.price_usd, currencyCookie.value);
            stubs:Money price = money:multiplySlow(convertedPrice, quantity);
            string renderedPrice = money:renderMoney(price);
            cartItems.push({
                product,
                price: renderedPrice,
                quantity: quantity
            });
            totalPrice = money:sum(totalPrice, price);
        }
        totalPrice = money:sum(totalPrice, shippingCost);
        int year = time:utcToCivil(time:utcNow()).year;
        int[] years = [year, year + 1, year + 2, year + 3, year + 4];

        CartResponse cartResponse = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: {
                recommendations,
                shippingCost: money:renderMoney(shippingCost),
                totalCost: money:renderMoney(totalPrice),
                items: cartItems,
                expirationYears: years
            }
        };
        return cartResponse;
    }

    # POST method to update the cart with a product.
    #
    # + request - `AddToCartRequest` containing the product id of the product to be added
    # + cookieHeader - header containing the cookie
    # + return - `http:Created` if successful or `http:Unauthorized` or `http:BadRequest` or `error` if an error occurs
    resource function post cart(@http:Payload AddToCartRequest request,
            @http:Header {name: "Cookie"} string cookieHeader) returns http:Created|http:Unauthorized|http:BadRequest|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        string userId = sessionIdCookie.value;
        stubs:Product|error product = getProduct(request.productId);
        if product is error {
            http:BadRequest badRequest = {
                body: string `invalid request ${product.message()}`
            };
            return badRequest;
        }

        check insertItemToCart(userId, request.productId, request.quantity);

        http:Created response = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: "item added to the cart"
        };
        return response;
    }

    # POST method to empty the cart.
    #
    # + cookieHeader - header containing the cookie
    # + return - `http:Created` if successful or an `http:Unauthorized` or `error` if an error occurs
    resource function post cart/empty(@http:Header {name: "Cookie"} string cookieHeader)
                returns http:Created|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        string userId = sessionIdCookie.value;
        check emptyCart(userId);
        http:Created response = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: "cart emptied"
        };
        return response;
    }

    # Post method to checkout the user's cart.
    #
    # + request - `CheckoutRequest` containing user details
    # + cookieHeader - header containing the cookie
    # + return - `CheckoutResponse` if successful or an `http:Unauthorized` or `error` if an error occurs
    resource function post cart/checkout(@http:Payload CheckoutRequest request,
            @http:Header {name: "Cookie"} string cookieHeader) returns CheckoutResponse|http:Unauthorized|error {
        http:Cookie|http:Unauthorized sessionIdCookie = getFromCookieHeader(SESSION_ID_COOKIE, cookieHeader);
        if sessionIdCookie is http:Unauthorized {
            return sessionIdCookie;
        }
        http:Cookie|http:Unauthorized currencyCookie = getFromCookieHeader(CURRENCY_COOKIE, cookieHeader);
        if currencyCookie is http:Unauthorized {
            return currencyCookie;
        }
        string userId = sessionIdCookie.value;

        stubs:OrderResult orderResult = check checkoutCart({
            email: request.email,
            address: {
                city: request.city,
                country: request.country,
                state: request.state,
                street_address: request.streetAddress,
                zip_code: request.zipCode
            },
            user_id: userId,
            user_currency: currencyCookie.value,
            credit_card: {
                credit_card_cvv: request.creditCardCvv,
                credit_card_expiration_month: request.creditCardExpirationMonth,
                credit_card_expiration_year: request.creditCardExpirationYear,
                credit_card_number: request.creditCardNumber
            }
        });

        stubs:Product[] recommendations = check getRecommendations(userId);
        stubs:Money totalCost = orderResult.shipping_cost;
        foreach stubs:OrderItem {item, cost} in orderResult.items {
            stubs:Money multiplyRes = money:multiplySlow(cost, item.quantity);
            totalCost = money:sum(totalCost, multiplyRes);
        }

        CheckoutResponse checkoutResponse = {
            headers: {
                "Set-Cookie": sessionIdCookie.toStringValue()
            },
            body: {
                'order: orderResult,
                totalPaid: money:renderMoney(totalCost),
                recommendations: recommendations
            }
        };

        return checkoutResponse;
    }

    function getProductIdFromCart(stubs:Cart cart) returns string[] {
        return from stubs:CartItem {product_id} in cart.items
            select product_id;
    }
}
