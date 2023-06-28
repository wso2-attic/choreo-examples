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
import lakshansivagnanasothy/client_stubs as stubs;

string productJsonPath = "./resources/products.json";

# Reads a list of products from a JSON file and provides the ability to search products and get them individually.
@display {
    label: "Catalog",
    id: "catalog"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "ProductCatalogService" on new grpc:Listener(9091) {
    private final stubs:Product[] & readonly products;

    function init() returns error? {
        json|error productsJson = io:fileReadJson(productJsonPath);
        if productsJson is error {
            log:printError("Failed to open product catalog json file: ", productsJson);
            return productsJson;
        }
        log:printInfo("Successfully read product catalog json");
        self.products = check parseProductJson(productsJson);
        log:printInfo("Catalog service gRPC server started.");
    }

    # Provides a set of products.
    #
    # + request - an empty request
    # + return - `ListProductsResponse` containing a `Product[]`
    remote function ListProducts(stubs:Empty request) returns stubs:ListProductsResponse {
        return {products: self.products};
    }

    # Provides a specific product based on the product id.
    #
    # + request - `GetProductRequest` containing the product id
    # + return - `Product` related to the required id or an error
    remote function GetProduct(stubs:GetProductRequest request) returns stubs:Product|grpc:NotFoundError|error {
        foreach stubs:Product product in self.products {
            if product.id == request.id {
                return product;
            }
        }
        return error grpc:NotFoundError(string `no product with ID ${request.id}`);
    }

    # Provides a list of products related to a search query.
    #
    # + request - `SearchProductsRequest` containing the search query
    # + return - `SearchProductsResponse` containing the matching products
    remote function SearchProducts(stubs:SearchProductsRequest request) returns stubs:SearchProductsResponse {
        return {
            results: from stubs:Product product in self.products
                where isProductRelated(product, request.query)
                select product
        };
    }
}
