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

import ballerinax/redis;
import lakshansivagnanasothy/client_stubs as stubs;

# Provides the interface for the RedisStore and InMemoryStore.
public type DataStore distinct object {

    # Adds an item to the store.
    #
    # + userId - id of the user
    # + productId - id of the product 
    # + quantity - count of the selcted product
    # + return - an error if an error occured while adding, else ()
    isolated function addItem(string userId, string productId, int quantity) returns error?;

    # Clears the cart of the related user.
    #
    # + userId - id of the user
    # + return - an error if an error occured while emptying, else ()
    isolated function emptyCart(string userId) returns error?;

    # Provides the carts of specific users.
    #
    # + userId - id of the user
    # + return - `Cart` or an error if error occurs
    isolated function getCart(string userId) returns stubs:Cart|error;
};

# Provides in-memory functionalities by using a `map<Cart>`.
public isolated class InMemoryStore {
    *DataStore;
    private map<stubs:Cart> store = {};

    # Adds an item to the in-memory store.
    #
    # + userId - id of the user
    # + productId - id of the product 
    # + quantity - count of the selcted product
    isolated function addItem(string userId, string productId, int quantity) {
        lock {
            if !self.store.hasKey(userId) {
                self.store[userId] = {
                    user_id: userId,
                    items: [{product_id: productId, quantity: quantity}]
                };
                return;
            }

            stubs:CartItem[] existingItems = self.store.get(userId).items;
            foreach stubs:CartItem item in existingItems {
                if item.product_id == productId {
                    item.quantity = item.quantity + quantity;
                    return;
                }
            }

            stubs:CartItem newItem = {product_id: productId, quantity};
            existingItems.push(newItem);
        }
    }

    # Clears the cart of the related user.
    #
    # + userId - id of the user
    isolated function emptyCart(string userId) {
        lock {
            _ = self.store.remove(userId);
        }
    }

    # Provides the cart of the specific user.
    #
    # + userId - id of the user whose cart is required
    # + return - `Cart` with the cart items
    isolated function getCart(string userId) returns stubs:Cart {
        lock {
            if self.store.hasKey(userId) {
                return self.store.get(userId).cloneReadOnly();
            }
            stubs:Cart newCart = {
                user_id: userId,
                items: []
            };
            self.store[userId] = newCart;
            return newCart.cloneReadOnly();
        }
    }
}

# Uses a `redis:Client` to provide the cart functionalities.
public isolated class RedisStore {
    *DataStore;
    private final redis:Client redisClient;

    function init() returns error? {
        self.redisClient = check new ({
            host: redisHost,
            password: redisPassword
        });
    }

    # Adds an item to the redis store.
    #
    # + userId - id of the user
    # + productId - id of the product 
    # + quantity - count of the selcted product
    # + return - an error if an error occured while adding, else ()
    isolated function addItem(string userId, string productId, int quantity) returns error? {
        map<any> existingItems = check self.redisClient->hMGet(userId, [productId]);
        if existingItems.get(productId) is () {
            map<int> itemsMap = {[productId] : quantity};
            _ = check self.redisClient->hMSet(userId, itemsMap);
            return;
        } 

        int existingQuantity = check int:fromString(existingItems.get(productId).toString());
        existingItems[productId] = existingQuantity + quantity;
        _ = check self.redisClient->hMSet(userId, existingItems);
    }

    # Clears the cart of the related user.
    #
    # + userId - id of the user
    # + return - an error if an error occured while emptying, else ()
    isolated function emptyCart(string userId) returns error? {
        _ = check self.redisClient->del([userId]);
    }

    # Provides the cart of the specific user.
    #
    # + userId - id of the user whose cart is required
    # + return - `Cart` or an error if error occurs
    isolated function getCart(string userId) returns stubs:Cart|error {
        map<any> userItems = check self.redisClient->hGetAll(userId);
        stubs:CartItem[] items = from [string, any] [productId, quantity] in userItems.entries()
            select {product_id: productId, quantity: check int:fromString(quantity.toString())};
        return {user_id: userId, items};
    }
}
