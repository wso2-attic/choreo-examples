# Employee Details Service

## Introduction
This is a simple integration scenario developed using Ballerina. This service allows you to retrieve details for a list of employees. It internally calls the employee details endpoint, aggregates the results, and sends back a response.


## Run and Test Locally

To run the program locally, you need to follow these steps:

1. Make sure you are in the project directory that contains this Ballerina program.
2. Open your terminal or command prompt in that project directory.
3. Execute the following command:

```bash
bal run -- -ChrEndpoint=https://samples.choreoapps.dev/company/hr
```


> NOTE: In this case, we are providing a value to the configurable variable `hrEndpoint`. The endpoint URL for the HR service is specified as `https://samples.choreoapps.dev/company/hr`.

Once the program is running, you can test it by sending a POST request to the endpoint http://localhost:9090/employees. To test, you can use the following cURL command in a separate terminal window:

```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"employeeIds": [1, 2, 3]}' \
     http://localhost:9090/employees
```

## Try it in Choreo

[Choreo](https://wso2.com/choreo/) simplifies the process of building, deploying, and managing integration components, making it easier to integrate APIs, microservices, applications, and data across different languages and formats. 
If you want to experience the power of Choreo while working with this Ballerina code, Get started now with our tutorial: [Build Your First Integration](https://wso2.com/choreo/docs/tutorials/build-your-first-integration/). Happy integrating!




