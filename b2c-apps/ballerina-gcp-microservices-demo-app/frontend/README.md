## Frontend Service

The HTTP service uses cookies to identify the user details. Since this sample does not have a register capability, if the cookie is not found in the request it will always regenerate a new cookie with return the cookie with the response. Please note that this is not a secure way to do this but for demo purposes only. Anyhow, to implement the feature, since we need to intercept each request, without repeating the code we have implemented an AuthInterceptor and registered into the service.


```bal
service class AuthInterceptor {
    *http:RequestInterceptor;
    resource function 'default [string... path](http:RequestContext ctx, http:Request request)
                returns http:NextService|error? {
        http:Cookie[] cookies = request.getCookies();
        http:Cookie[] sessionIDCookies = cookies.filter(cookie => cookie.name == SESSION_ID_COOKIE);

        string sessionId;
        if sessionIDCookies.length() == 0 {
            ...
            http:Cookie sessionIdCookie = new (SESSION_ID_COOKIE, sessionId, path = "/");
            cookies.push(sessionIdCookie);
        } else {
            sessionId = sessionIDCookies[0].value;
        }

        request.addCookies(cookies);
        return ctx.next();
    }
}

AuthInterceptor authInterceptor = new;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: true
    },
    interceptors: [new AuthInterceptor()]
}
service / on new http:Listener (9098) {

}
```

In ballerina, an HTTP resource is represented by a resource function. The function definition has all the information about the resource. The following resource function has the resource path of /cart and gets invoked for POST requests. The resource expects a payload with the `AddToCartRequest` record format and the cookie header. It could return responses with different HTTP error codes depending on various reasons. You can find more information about writing a REST service from the [learn page.](https://ballerina.io/learn/write-a-restful-api-with-ballerina/).

```bal
resource function post cart(@http:Payload AddToCartRequest request,
        @http:Header {name: "Cookie"} string cookieHeader) 
        returns http:Created|http:Unauthorized|http:BadRequest|error {
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
```
