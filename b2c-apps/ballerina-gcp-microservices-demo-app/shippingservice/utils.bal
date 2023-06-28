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

import ballerina/random;

isolated function generateRandomLetter() returns string {
    //Note - We use checkpanic only because we expect valid input here, and therefore if the input is invalid it is OK for the application to crash.
    int randomLetterCodePoint = checkpanic random:createIntInRange(65, 91);
    return checkpanic string:fromCodePointInt(randomLetterCodePoint);
}

isolated function generateRandomNumber(int digit) returns string {
    string randomNumber = "";
    foreach int item in 0 ... digit {
        //Note - We use checkpanic only because we expect valid input here, and therefore if the input is invalid it is OK for the application to crash.
        int randomInt = checkpanic random:createIntInRange(0, 10);
        randomNumber += randomInt.toString();
    }
    return randomNumber;
}

isolated function generateTrackingId(string baseAddress) returns string {
    return string `${generateRandomLetter()}${generateRandomLetter()}-${baseAddress
        .length().toString()}${generateRandomNumber(3)}-${(baseAddress.length() / 2)
        .toString()}${generateRandomNumber(7)}`;
}
