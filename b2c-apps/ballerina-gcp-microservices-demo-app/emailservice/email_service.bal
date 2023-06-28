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
import ballerina/log;
import ballerinax/googleapis.gmail as gmail;
import ballerinax/jaeger as _;
import lakshansivagnanasothy/client_stubs as stubs;

type GmailConfig record {|
    string refreshToken;
    string clientId;
    string clientSecret;
|};

const FONT_URL =
    "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap";
const FRACTION_SIZE = 1000000000;

configurable GmailConfig gmailConfig = ?;

# Used to send an order confirmation email to the user using the `gmail` connector.
@display {
    label: "Email",
    id: "email"
}
@grpc:Descriptor {value: stubs:DEMO_DESC}
service "EmailService" on new grpc:Listener(9097) {

    private final gmail:Client gmailClient;

    function init() returns error? {
        self.gmailClient = check new ({
            auth: {
                refreshUrl: gmail:REFRESH_URL,
                refreshToken: gmailConfig.refreshToken,
                clientId: gmailConfig.clientId,
                clientSecret: gmailConfig.clientSecret
            }
        });
        log:printInfo("Email service gRPC server started.");
    }

    # Sends the order confirmation email containing details about the order.
    #
    # + request - `SendOrderConfirmationRequest` which contains the details about the order
    # + return - `Empty` or else an error
    remote function SendOrderConfirmation(stubs:SendOrderConfirmationRequest request) returns stubs:Empty|error {
        log:printInfo(string `Received a request to send order confirmation email to ${request.email}.`);

        gmail:MessageRequest messageRequest = {
            recipient: request.email,
            subject: "Your Confirmation Email",
            messageBody: (check getConfirmationHtml(request.'order)).toString(),
            contentType: gmail:TEXT_HTML
        };
        gmail:Message|error sendMessageResponse = self.gmailClient->sendMessage(messageRequest);
        if sendMessageResponse is error {
            log:printError("An error occurred when sending the order confirmation email ", sendMessageResponse);
            return sendMessageResponse;
        }
        log:printInfo(string `Email sent with Message ID: ${sendMessageResponse.id} and Thread ID: ${sendMessageResponse.threadId}`);
        return {};
    }
}

function getConfirmationHtml(stubs:OrderResult result) returns xml|error {
    xml items = from stubs:OrderItem item in result.items
        select xml `<tr>
            <td>#${item.item.product_id}</td>
            <td>${item.item.quantity}</td> 
            <td>${item.cost.units}.${item.cost.nanos / FRACTION_SIZE} ${item.cost.currency_code}</td>
            </tr>`;
    items = xml `<tr>
          <th>Item No.</th>
          <th>Quantity</th> 
          <th>Price</th>
        </tr>` + items;

    xml body = xml `<body>
        <h2>Your Order Confirmation</h2>
        <p>Thanks for shopping with us!</p>
        <h3>Order ID</h3>
        <p>#${result.order_id}</p>
        <h3>Shipping</h3>
        <p>#${result.shipping_tracking_id}</p>
        <p>${result.shipping_cost.units}.${result.shipping_cost.nanos / FRACTION_SIZE}
                ${result.shipping_cost.currency_code}</p>
        <p>${result.shipping_address.street_address}, ${result.shipping_address.city},
                ${result.shipping_address.country} ${result.shipping_address.zip_code}</p>
        <h3>Items</h3>
        <table style="width:100%; text-align: left;">
            ${items}
        </table>
        </body>`;

    xml emailContent = xml `
        <html>
        <head>
            <title>Your Order Confirmation</title>
            <link href="${FONT_URL}" rel="stylesheet"></link>
        </head>
        <style>
            body{
                font-family: 'DM Sans', sans-serif;
            }
        </style>
            ${body}
        </html>`;
    return emailContent;
}
