# Currency Service

The Currency service is responsible for converting a given currency object to another currency. The service contains a JSON file with the conversion rates. When the service is initialized it will read this JSON and store it in a read-only map as it's not getting modified afterward. When the `Convert` remote function is invoked, it will read the rate from the map, convert the value and return the converted currency value to the caller.

```bal
configurable string currencyJsonPath = "./data/currency_conversion.json";

service "CurrencyService" on new grpc:Listener(9093) {
    final map<decimal> & readonly currencyMap;

    function init() returns error? {
        json currencyJson = check io:fileReadJson(currencyJsonPath);
        self.currencyMap = check parseCurrencyJson(currencyJson).cloneReadOnly();
    }

    remote function GetSupportedCurrencies(stubs:Empty request) returns stubs:GetSupportedCurrenciesResponse {
        return {currency_codes: self.currencyMap.keys()};
    }
    remote function Convert(stubs:CurrencyConversionRequest request) returns stubs:Money|error {
        ...
    }
    
    ...
}
```

Additionally, since we are reading the Currency rates from the JSON file, therefore we need to copy the JSON into the container. This can be done using having the following codeblock in the `Cloud.toml`.
```toml
[[container.copy.files]]
sourceFile="./data/currency_conversion.json"
target="/home/ballerina/data/currency_conversion.json"
```
