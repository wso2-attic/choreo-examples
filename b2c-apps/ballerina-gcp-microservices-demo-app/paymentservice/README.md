# Payment Service

Payment Service is responsible for validating the card details and sending a mock payment id. The validation is done by checking length, performing Luhn algorithm validation, validating the card company, and checking the expiry date. This microservice shows some usage of low-level operations to implement the validation algorithm.


```bal
isolated function isLuhnValid(string cardNumber) returns boolean|error {
    int digits = cardNumber.length();
    int oddOrEven = digits & 1;
    int sum = 0;

    foreach int count in 0 ..< digits {
        int digit = 0;
        digit = check int:fromString(cardNumber[count]);

        if ((count & 1) ^ oddOrEven) == 0 {
            digit *= 2;
            if digit > 9 {
                digit -= 9;
            }
        }
        sum += digit;
    }
    return sum != 0 && (sum % 10 == 0);
}
```
