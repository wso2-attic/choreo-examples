# Pet Care Web Application User Guide

---

# Step 1: Create and publish a Service

In this step, you are playing the role of the API developer. You will create and publish the Service that the web application needs to consume.

## Step 1.1: Create the Service

Let's create your first Service.
1. On the Home page, click on the project you created.
2. Click Create in the Service card.
3. Enter a unique name and a description for the Service. For example, you can enter 4. the name and the description given below:

| Field | Value |
| -------- | -------- |
| Name | Pet Management Service |
| Description | Manage your pets |

4. Click Next.
5. To allow Choreo to connect to your GitHub account, click Authorize with GitHub.
6. If you have not already connected your GitHub repository to Choreo, enter your GitHub credentials, and select the private repository you created by forking https://github.com/pubudu538/choreo-p1 to install the Choreo GitHub App.
7. In the Connect Repository dialog box, enter the following information:

| Field | Value |
| -------- | -------- |
| GitHub Account | Your account |
| GitHub Repository | choreo-p1 |
| Branch | main |
| Build Preset | Click Ballerina because you are creating the REST API from a Ballerina project and Choreo needs to run a Ballerina build to build it. |
| Path | pet-management-service |

8. Click Create to initialize a Service with the implementation from your GitHub repository.
The Service opens on a separate page where you can see its overview.

## Step 1.2: Deploy the Service

For the Service to be invokable, you need to deploy it. To deploy the Service, follow the steps given below:
1. Navigate to the Choreo Console. You will be viewing an overview of the Pet Management Service Service.
2. In the left pane, click Deploy, and then click Configure & Deploy.
3. In the Configure & Deploy pane, click Deploy without entering a sandbox endpoint.

## Step 1.3: Update runtime settings

1. Navigate to the Choreo Console and click the profile dropdown in the top right corner.
2. Choose DevOps.
3. Open your Service and navigate to the Deploy page.
4. Select the Runtime page from there.
5. Make the Min replicas and Max replicas count to 1.
6. Click the Redeploy release button.


## Step 1.4: Test the Service

Let's test the Pet Management Service via Choreo's Open API Console by following the steps given below:
1. Click Test in the left pane, and be sure that you are in the OpenAPI Console view. If not, click OpenAPI Console in the left pane.
2. Expand the POST method and click Try it out.
3. Update the request body so that the parameters have the values given below:

| Parameter | Value |
| -------- | -------- |
| name | Cooper |
| breed | Golden Retriever |
| DateOfBirth | 03/02/2020 |

4. Provide the vaccination details as follows:

| Parameter | Value |
| -------- | -------- |
| enable | true |
| name | vaccine_1 |
| lastVaccinationDate | 03/01/2023 |
| nextVaccinationDate | 07/17/2023 |

5. The request body should look as follows:
``` 
{
  "breed": "Golden Retriever",
  "dateOfBirth": "03/02/2020",
  "name": "Cooper",
  "vaccinations": [
    {
      "enableAlerts": true,
      "lastVaccinationDate": "03/01/2023",
      "name": "vaccine_1",
      "nextVaccinationDate": "07/17/2023"
    }
  ]
}
```

6. Click Execute.
7. Check the Server Response section. On successful invocation, you will receive the 200 HTTP code.
Similarly, you can expand and try out the GET and DELETE methods.

## Step 1.5: Publish the Service

Now that yourService is tested, let's publish it and make it available for applications to consume.

### Step 1.4.1: Update the CORS configuration and enable passing Security Context To Backend
1. In the left pane, click Manage.
2. Click Settings.
3. Under API Settings click Edit.
4. Toggle the CORS Configuration switch to enable the CORS configuration.
5. Select the Access Control Allow Credentials checkbox.
6. Toggle the Pass Security Context To Backend to pass the JWT token details to backend.
7. In the Apply to Development pane that opens on the right-hand side of the page, enter a meaningful message. Then click Apply.
8. Click Save.

### Step 1.4.2: Publish the Service

We are now ready to publish the Service. To do so, follow the steps given below:

1. In the Manage tab, click Lifecycle.
2. Click Publish to publish the Service to the Developer Portal. External applications can subscribe to the API via the Developer Portal.
3. To access the Developer Portal, click Go to DevPortal.
4. The Pet Management Service will open in the Developer Portal.

# Step 2: Consume the Service

## Step 2.1: Enable Asgardeo Key Manager

1. Go to the Choreo Console, click Settings, and then click API Management.
2. On the API Management page, click Enable Asgardeo Key Manager.
<h1 align="center">
  <img src="src/images/enable-km.png" alt="enable km" width="550" height="200"/>
</h1>

## Step 2.2: Create an application

An application in the Developer Portal is a logical representation of a physical application such as a mobile app, web app, device, etc.
Let's create the application to consume the Pet Management Service Service by following the steps given below:
1. Go to the Developer Portal.
2. In the top menu of the Developer Portal, click Applications.
3. Click Create.
4. Enter a name for the application (for example, petManagementApp) and click Create.
Your Application will open on a separate page.


## Step 2.3: Subscribe to the Service

To consume the Service, the petManagementApp application needs to subscribe to it. To subscribe your application to the Service, follow the steps given below:
1. In the left navigation menu, click Subscriptions.
2. Click Add APIs.
3. Find your Service and click Add.
Now your application has subscribed to the `Pet Management Service` Service.


## Step 2.4: Deploy a Web application and invoke the Service

### Step 2.4.1: Configure the front-end application

1. Clone `app` branch in your fork of https://github.com/ShalkiWenushika/pet-management-app.
2. Open the cloned repository using an IDE (for example Visual Studio Code), and make the following changes.
3. Go to the config.json file in the root directory.
4. Provide values for the configurations as follows:
    - clientID
        - Open the application you created previously via Developer Portal.
        - Click Production Keys in the left navigation menu.
        - Copy and paste the value of the consumer key.
      
    - stsTokenEndpoint  
        - Open the application you created previously via Developer Portal.
        - Click Production Keys in the left navigation menu.
        - Go to the Endpoints section.
        - Copy and paste the Token Endpoint Value.
    - baseUrl
        - Copy the value of the stsTokenEndpoint you provided previously in config.json file,  and remove “/oauth2/token” part from the url

    - Scope
        - Provide “openid”, “profile” and ‘’email” as scopes
    - stsConfig
        - Provide ["openid", "profile", “email”] for the scope.
        - For the orgHandle, copy the value provided for baseUrl  in config.json file, and remove `https://api.asgardeo.io/t/` part.
    - resourceServerURLs
        - View the service you created from the choreo console.
        - Go to the Test section.
        - Click the Console tab and copy and paste the value of the invoke URL.
        
     - You will receive values for signInRedirectURL and signOutRedirectURL in the next sections. For now keep the default values for those configurations.

5. Commit the changes to your fork.

### Step 2.4.2: Configure Asgardeo to integrate with your web application

1. Access Asgardeo at https://console.asgardeo.io/ and log in with the same credentials with which you logged in to Choreo.
2. Click the Develop tab in the top and then select Applications.
3. You can see the application you created before from the devportal.
4. Click the petManagementApp 
5. Click the Protocol tab.
6. Scroll down to the Allowed grant types and tick Refresh Token and Code.
7. Scroll down to the Access Token section and tick JWT.
8. Keep the rest of the default configurations and click Update.
9. Go to the User Attributes tab.
10.Expand the Profile section.
11. Add a tick on the Requested Column for the Full Name and click Update.
12. Then go to the Sign-In Method tab.
13. Configure Google login as described in https://wso2.com/asgardeo/docs/guides/authentication/social-login/add-google-login/

### Step 2.4.3: Create a user in Asgardeo
1. Navigate to the Asgardeo Console.
2. Click the Manage tab on the top.
3. Click Users in the left navigation menu.
4. Click Add User.
5. In the Add User dialog, enter your email, first name, and last name, and click Finish. Asgardeo will send you an email to set your password. It will also open your user profile on a separate page.
6. In your user profile, toggle the Lock User switch to unlock your profile.
7. In the email you received from Asgardeo (with the subject Here is your new account in the organization ), click Set Password.
8. Enter a password that matches the given criteria in the Enter new password and Confirm password fields, and click Proceed.
9. View the User profile and enter a full name for the User and click Update.

### Step 2.4.4: Configure user Attributes in Asgardeo

1. Navigate to the Asgardeo Console.
2. Click the Manage tab on the top.
3. Click Attributes in the left navigation menu.
4. Go to Manage Attributes section.
5. Click the Edit button in the Attributes section.
6. Click edit button in Full Name Attribute.
7. Add a tick on “Display this attribute on the user’s profile”
8. Click the Update button.

### Step 2.4.5: Enable features in Asgardeo

1. [Branding and theming](https://wso2.com/asgardeo/docs/guides/branding/configure-ui-branding/#prerequisites)
    - On the Asgardeo Console, go to Develop > Branding
    - Enable the branding toggle on top.
    - Go to General tab and enter the site title as “Pet Management App”
    - Go to the Design tab and choose layout as centered.
    - Choose the Light theme.
    - Go to Theme preferences> Images and enter logo url: https://user-images.githubusercontent.com/35829027/230543197-36055436-3dd2-4a8f-9fc8-ab06f041c1ff.png
    - Enter logo Alt text as “Pet Management App Logo”
    - Enter favicon url: https://user-images.githubusercontent.com/35829027/230543203-b1016341-e4cf-4b73-9495-cc0fe2ba192f.png
    - Go to Color Pallet and choose primary color as #1ad6d3
    - Keep other options as default
    - Click save.
    
2. [Configure password recovery](https://wso2.com/asgardeo/docs/guides/user-accounts/password-recovery/)
    - On the Asgardeo Console, click Manage > Account Recovery.
    - Go to Password Recovery.
    - Click Configure to open the Password Recovery page.
    - Turn on Enabled to enable this configuration.
    
3. [Self registration](https://wso2.com/asgardeo/docs/guides/user-accounts/configure-self-registration/#enable-disable-self-registration)
    - On the Asgardeo console, click Manage > Self Registration. 
    - Click Configure
    - Enable self registration toggle.
    - Tick Account verification and then click the Update button.
    
4. [Configure login-attempts security](https://wso2.com/asgardeo/docs/guides/user-accounts/account-security/login-attempts-security/#enable-login-attempts-security)    
    - On the Asgardeo console, click Manage > Account Security.
    - Click Configure to open the Login Attempts Security page.
    - Turn on Enabled to enable this configuration.
    
    

### Step 2.4.6: Deploy a Web Application in Choreo
1. Navigate to Choreo Console.
2. Click on the User Profile in the top right corner.
3. Click on the Feature Preview in the user menu.
4. Toggle the Web Application Creation Switch.

<h1 align="center">
  <img src="src/images/feature-preview.png" alt="feature preview" width="450" height="250"/>
</h1>

5. Create a fork from this GitHub repository: https://github.com/ShalkiWenushika/pet-management-app/tree/app
6. Navigate to the Components section from the left navigation menu.
7. Click on the Create button.
8. Click on the Create button in the Web Application Card.
9. Enter a unique name and a description for the Web Application. For example you can provide the following sample values.

| Field | Value |
| -------- | -------- |
| Name | Pet Management Web App |
| Description | Web application for managing your pets. |

10. Click on the Next button.
11. To allow Choreo to connect to your GitHub account, click Authorize with GitHub.
12. In the Connect Repository dialog box, enter the following information:


| Field | Value |
| -------- | -------- |
| GitHub Account | Your account |
| GitHub Repository | pet-management-app |
| Branch | app |
| Dockerfile Path | Dockerfile |
| Docker Context Path |-|
| Port |8080|

13. Click on the Create button.
14. The Web Application opens on a separate page where you can see its overview.
15. Navigate to the Deploy page from the left navigation menu.
16. Go to the Build and Deploy section and click on the Deploy manually button.
17. After the deployment is successful you will get a Web App URL in the Development Card.
18. Copy this URL.
19. In your fork of https://github.com/ShalkiWenushika/pet-management-app/tree/app go to the config.json file in the root directory and 20. update the values for  signInRedirectURL and signOutRedirectURL with the previously copied value and commit the changes.
20. Again deploy the changes for the Web Application.
21. Update the Asgardeo Application
    - Navigate to Asgardeo console.
    - Click on the Develop tab on the top.
    - Go to Applications from the left navigation menu.
    - Click on the petManagementApp
    - Click on the Protocol tab.
    - Scroll down to the Authorized redirect URLs
    - Give the Copied Web App URL and click on the + button.
    - Scroll down to the Allowed origins section.
    - Give the Copied Web App URL and click on the + button.
    - Scroll to the bottom and click on the Update button.
    
    
### Step 2.4.7: Invoke the Service.

1. After deploying the web app, you will get a web app url. Access the web application via that url. This is the landing page of the web app:

<h1 align="center">
  <img src="src/images/landing-page.png" alt="landing-page" width="500" height="250"/>
</h1>

2. Click on the Get Started button.
3. You will get a Sign In prompt.
4. You can either login with user credentials or with a google account. After login successfully you will redirect to the home page:

<h1 align="center">
  <img src="src/images/home-page.png" alt="home-page" width="500" height="250"/>
</h1>

5. To add a new pet, Click on the + button next to “My Pets” in the home page.
6. Provide a name, breed and date of birth.
7. Then Click on the Save button.
8. You will see a card added to the home page for the newly created pet.
9. Click on this card and you can see an overview of the pet.
10. Click on the edit button to update details of the pet. You will get an Update view for the pet.
11. In there you can edit the name, breed and date of birth of the pet.
12. Furthermore, you can add vaccination details for your pet.
    - Go to the Vaccination Details section.
    - Give the vaccination name.
    - Give the last vaccination date.
    - Give the next vaccination date.
    - Click on the + button.
    - You can check the enable alerts checkbox if you wish to receive alerts for the next vaccination date.
    - Click on the Save button.
13. You can Update the image of your pet in the Update Details prompt.
    - Click on the Choose a file button.
    - Select a photo from your local device.
    - Click on the Update button.
    
14. Also you can enable alerts from the settings.
    - Click on the user menu on the top right corner in the home page.
    - Click on Settings.
    - Toggle the Switch to enable alerts.
    - Provide an email address.
    - Click on the Save button.
    
    




    










