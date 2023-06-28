# Email Service

The service is responsible for sending an email with the order confirmation after checkout completion. The HTML generation required for the Email formatting is done using ballerina's built-in XML feature. The email-sending part is handled by the Gmail connector.

```bal
service "EmailService" on new grpc:Listener(9097) {
    remote function SendOrderConfirmation(stubs:SendOrderConfirmationRequest request) returns stubs:Empty|error {

        gmail:MessageRequest messageRequest = {
            recipient: request.email,
            subject: "Your Confirmation Email",
            messageBody: (check getConfirmationHtml(request.'order)).toString(),
            contentType: gmail:TEXT_HTML
        };
        gmail:Message|error sendMessageResponse = self.gmailClient->sendMessage(messageRequest);
        ...
        return {};
    }
    
    function getConfirmationHtml(OrderResult res) returns xml {
        ...
        xml items = from stubs:OrderItem item in result.items
            select xml `<tr>
                <td>#${item.item.product_id}</td>
                <td>${item.item.quantity}</td> 
                ...
                </tr>`;
                
        items = xml `<tr>
              <th>Item No.</th>
              <th>Quantity</th> 
              <th>Price</th>
            </tr>` + items;   
        
        ...
        
        xml emailContent = ...

        return emailContent;
    }
}
```

This service requires sensitive Gmail credentials, to use in the Gmail connector. This also is done with the help of Ballerina's configurable feature. The sample code and the `Config.toml` file can be found below.

```bal
type GmailConfig record {|
    string refreshToken;
    string clientId;
    string clientSecret;
|};

configurable GmailConfig gmail = ?;
```

```toml
[gmail]
refreshToken = ""
clientId = ""
clientSecret =  ""
```

However, as this `Config.toml` contains sensitive information we need to load this as a secret to the kubernetes cluster. You can do that by adding the following entry to the `Cloud.toml`.
```toml
[[cloud.secret.files]]
file="./Config.toml"
```
