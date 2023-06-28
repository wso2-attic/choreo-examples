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
function listProductsTest() returns error? {
    stubs:AdServiceClient adClient = check new ("http://localhost:9099");
    stubs:AdRequest request = {
        context_keys: ["accessories"]
    };

    stubs:AdResponse response = check adClient->GetAds(request);
    stubs:Ad[] expectedAds = [{
        redirect_url: "/product/1YMWWN1N4O",
        text: "Watch for sale. Buy one, get second kit for free"
    }];
    stubs:Ad[] receivedAds = [];
    response.ads.forEach(function (stubs:Ad ad) {
        receivedAds.push(ad);
    });
    test:assertEquals(receivedAds, expectedAds);
}
