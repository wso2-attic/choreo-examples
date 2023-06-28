## Introduction

This gcp-microservices-demo-app written in Ballerina has 10 services(9 gGRPC services and 1 HTTP sevice). `client_stubs` and `money` modules are published to [Ballerina Central](https://central.ballerina.io/) and they will be pulled from there during the build automatically. 
Following are the services we will be deploying in Choreo.

| Service     | Port   | Type | Component type in Choreo
|-------------|--------|----- | --------------------------
|ad|9099| gRPC  | Service
|cart|9092| gRPC  | Service
|checkout|9094| gRPC  | Service
|currency|9093| gRPC  | Service
|email|9097| gRPC  | Service
|payment|9096| gRPC  | Service
|productcatalog|9091| gRPC  | Service
|recommendation|9090| gRPC  | Service
|shipping|9095| gRPC  | Service
|frontend|9098| HTTP  | REST API

## Deploying Services in Choreo
- Login to [Choreo](https://console.choreo.dev/)
- Create a `Project`
- Switch to `Cloud Native Development` Profile
- Create Component for each services
  - For all the gRPC services, we'll be creating a `Service` type Component. (Only the frontend service, we'll be creating a `REST API` Component)
  ![image](https://user-images.githubusercontent.com/32201965/217992483-7e590a8b-1e49-451e-8d0e-5e69b9eee362.png)
  - After creating a component, go to `Deploy` page and deploy to Development environment. (ad, currency, payment, productcatalog and shipping services can be deployed without any configurables)
  - When deploying some of the components, we'll have to add configurables.
    - emailservice: clientId, clientSecret and refreshToken of your Gmail account has to be added.
    - recommendation: catalogHost has to be configured. (Example: If the productcatalog endpoint url is `http://prodcat-2479457892:9091/`, `prodcat-2479457892` will be the catalogHost)
    - checkoutservice: cartHost, catalogHost, currencyHost, shippingHost, paymentHost and emailHost have to be configured.
    - frontendservice: currencyHost, catalogHost, cartHost, shippingHost, recommendHost, adHost and checkoutHost have to be configured.
    - cartservice: (Optional) redis store configs can be configured. If not configured, in-memory store will be used.
  - Click `Promote` to promote it to the Production environment.
  - Create an endpoint (This has to be done for both Development and Production environments)
  ![image](https://user-images.githubusercontent.com/32201965/218615142-55508f2d-358b-4e18-9220-60eb166c6643.png)
- Testing the frontend service
  - Go to `Test` page in the frontend service Component and you will be able to test it.
  - You can find the `API Endpoint` and `Security Header` here
![image](https://user-images.githubusercontent.com/32201965/217999968-84f59f5a-8f57-423f-bbaf-111c26c1737a.png)

## Testing the UI (React App) 
- Get the `API Endpoint` and `Security Header` of the frontend service deployed in Choreo
- Configure the following in `gcp-microservices-demo/ui/src/lib/api.js` with the `API Endpoint` and `Security Header`
  - `FRONTEND_SVC_URL`
  - `FRONTEND_API_KEY`
- Start the React application by executing following commands from the `ui/` directory.
```
npm install
npm start
```
