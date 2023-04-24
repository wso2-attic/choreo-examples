// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.

// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/uuid;
import ballerina/http;

enum Status {
    reading = "reading",
    read = "read",
    to_read = "to_read"
}

type BookItem record {|
    string title;
    string author;
    string status;
|};

type Book record {|
    *BookItem;
    string id;
|};

map<Book> books = {};

service /readinglist on new http:Listener(9090) {

    resource function get books() returns Book[]|error? {
        return books.toArray();
    }

    resource function post books(@http:Payload BookItem newBook) returns record {|*http:Ok;|}|error? {
        string bookId = uuid:createType1AsString();
        books[bookId] = {...newBook, id: bookId};
        return {};
    }

    resource function delete books(string id) returns record {|*http:Ok;|}|error? {
        _ = books.remove(id);
        return {};
    }
}
