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
function cartTest() returns error? {
    stubs:CartServiceClient ep = check new ("http://localhost:9092");
    //Add Cart
    stubs:AddItemRequest item1 = {user_id: "1", item: {product_id: "11", quantity: 1}};
    _ = check ep->AddItem(item1);

    stubs:GetCartRequest user1 = {user_id: "1"};
    stubs:Cart cart = check ep->GetCart(user1);
    test:assertEquals(cart.items.length(), 1);

    //Add quantity
    stubs:AddItemRequest item2 = {user_id: "1", item: {product_id: "11", quantity: 2}};
    _ = check ep->AddItem(item2);
    stubs:Cart cart1 = check ep->GetCart(user1);
    test:assertEquals(cart1.items[0].quantity, 3);

    //Add item
    stubs:AddItemRequest item3 = {user_id: "1", item: {product_id: "12", quantity: 2}};
    _ = check ep->AddItem(item3);
    stubs:Cart cart2 = check ep->GetCart(user1);
    test:assertEquals(cart2.items.length(), 2);
}
