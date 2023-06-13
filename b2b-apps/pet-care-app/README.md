# Pet Care Veterinary Practise Management Application User Guide

The Pet Care Veterinary Practise Management Application is a B2B (Business-to-Business) application designed to streamline and optimize the management and operations of veterinary practices. This comprehensive application caters specifically to the needs of veterinary clinics, hospitals, and other related healthcare facilities, providing a centralized platform to efficiently manage appointments, patient records, and other essential aspects of veterinary practice. 

## Overview

The Pet Care application involves three primary stakeholders: the System Admin, Doctor, and Pet Owner. Below are the tasks performed by each stakeholder:

1. System Admin

    - Enroll and oversee the management of Doctors within the system.
    - Configure users, groups, roles, and Identity providers in the system.

2. Doctor

    - Modify and update their own profile information.
    - Set available time slots for appointment bookings.
    - Manage daily appointment bookings.
    - Provide medical reports for pets.

3. Pet Owner

    - Register and add pets to the system.
    - Manage vaccination dates and set up alerts for upcoming vaccinations.
    - Schedule doctor appointments for the pets.

&nbsp;<br>
### Organizational Hierarchy of B2B Business
![Alt text](readme-resources/b2b-org-hierarchy.png?raw=true "Organizational Hierarchy of B2B Business")

&nbsp;<br>
### Business Onboarding

City Vet Hospital, a local veterinary hospital, currently offers medical consultations and various treatments for pets. The owner of City Vet Hospital aims to optimize their operations and reaches out to the Pet Care app through the available support channels. The Pet Care provider responds by adding the owner of City Vet Hospital as a System Admin within the Pet Care system. Consequently, the owner receives an email containing instructions on how to utilize the system. With this access, the owner can perform the tasks mentioned earlier and introduce the system to both their hospital staff and customers.

&nbsp;<br>
### B2B Access Management - Login Options

The System Admin of each of the Business can select a suitable login option for their user base. 

- Elite Vet is a local clinic where the doctor running the clinic also serves as the System Admin in the system. Due to their smaller user base, they have chosen to utilize a login method that involves username and password.

- Goodwill Vet Clinic, another local clinic similar to Elite Vet, places a higher emphasis on security. Consequently, they have opted for a login approach that includes both username and password along with Multi-Factor Authentication (MFA).

- City Vet Hospital, a well-established hospital in the area, already has an Enterprise Identity Provider (IDP) that manages their hospital user accounts. In their case, they prefer integrating their existing Enterprise IDP with the Pet Care application, allowing for a seamless login experience.

![Alt text](readme-resources/b2b-login-options.png?raw=true "Organizational Hierarchy of B2B Business")

&nbsp;<br>
## Solution

The solution is based on [Ballerina](https://ballerina.io/), [Choreo](https://wso2.com/choreo/) and [Asgardeo](https://wso2.com/asgardeo/). 

- [Ballerina](https://ballerina.io/) is an open-source language for cloud-native app development. It simplifies building microservices-based applications with modern syntax, built-in network support, service discovery, distributed transactions, and security features.

- [Choreo](https://wso2.com/choreo/), a SaaS application development suite, streamlines integration creation and management in cloud-native environments. It empowers developers with tools to connect, orchestrate, and secure applications and services, expediting digital experience development.

- [Asgardeo](https://wso2.com/asgardeo/), a Customer IAM (CIAM) solution by WSO2, offers extensive features for managing user identities, access privileges, and security in digital ecosystems. It caters to both B2C and B2B applications.

In this solution, there are three services written in Ballerina: the email service, channel service, and pet management service. The pet management service and channel service connect with the email service to send emails to users. These services are deployed in Choreo and exposed as APIs for consumption by applications. The email service functions internally. The Pet management web application, written in React JS, is hosted in Choreo using its hosting capabilities. Asgardeo authenticates users and utilizes its CIAM capabilities to enhance the customer experience. Asgardeo's B2B features are employed to develop this B2B application.

![Alt text](readme-resources/solution-architecture.jpg?raw=true "Organizational Hierarchy of B2B Business")

This guide provides step-by-step instructions for:

1. Developing, deploying, and testing service components.
2. Publishing the service endpoints as a REST API for consumption by your web application.
3. Exposing the REST APIs through Choreo API management.
4. Securely accessing the published REST APIs from your web application.
5. Deploying your web application in Choreo.
6. Configuring Asgardeo's CIAM features and utilizing its B2B capabilities.
7. Consuming the web application.

&nbsp;<br>
---

# Step 1: Create and publish Services

In this step, you will play the role of the API developer. You will create and publish the Services that the web application needs to consume. Before you proceed, sign in to [**Choreo Console**](https://console.choreo.dev/).

## Step 1.1: Create the Email Service

Let's create your first Service.
1. On the **Home** page, click on the project you created.
2. To add a new component, select **Components** from the left-side menu and click **Create**.
3. Click **Create** in the **Service** card.
4. Enter a unique name and a description for the Service. For example, you can enter the name and the description given below:

    | Field | Value |
    | -------- | -------- |
    | Name | Email Service |
    | Description | Send Emails |

5. Click **Next**.
6. To allow Choreo to connect to your GitHub account, click **Authorize with GitHub**.
7. If you have not already connected your GitHub repository to Choreo, enter your GitHub credentials, and select the repository you created by forking https://github.com/wso2/choreo-examples to install the Choreo GitHub App.
8. In the Connect Repository dialog box, enter the following information:

    | Field | Value |
    | -------- | -------- |
    | GitHub Account | Your account |
    | GitHub Repository | choreo-examples |
    | Branch | main |
    | Build Preset | Click **Ballerina** because you are creating the REST API from a Ballerina project and Choreo needs to run a Ballerina build to build it. |
    | Project Path | /b2b-apps/pet-care-app/email-service |

9. Click **Create** to initialize a Service with the implementation from your GitHub repository.

The Service opens on a separate page where you can see its overview.

## Step 1.2: Deploy the Email Service

For the Service to be invokable, you need to deploy it. To deploy the Service, follow the steps given below:
1. Navigate to the **Choreo Console**. You will be viewing an overview of the Email Service.
2. In the left pane, click **Deploy**, and then click **Configure & Deploy**.
3. In the **Configure & Deploy** pane, you will be asking to enter values for the **Defaultable Configurables**.
    - You can configure SMTP configurations. This is **optional**, and if you specify SMTP configurations here, it will use to send emails to the users. 

      <details><summary>If you are setting up <b>email</b> click here</summary>
      <p>
            
      - In order to send emails to the users, you need to create a client for the SMTP server. Here is a guide for setting up a SMTP client for the **GMail**.
        - You can generate a password for the email username using [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
        - Configure the following **Defaultable Configurables** for the email configuration.   

          | Field      |  Value |
          | ---------- | -------- |
          | emailHost     | SMTP Host. eg: smtp.gmail.com  |
          | emailUsername | Email address |
          | emailPassword | Email password (The app password generated in the above.) |
      
      </p>
      </details>

    &nbsp;<br>
4. Click **Next** on the **Defaultable Configurables** to deploy the service.
5. Click **Deploy**.
6. When the deployment is complete, go to the **Overview** section.
7. Under the **Endpoints** section, copy the **Development Project URL** for the future use. 

## Step 1.3: Create the Channel Service

1. To add a new component, select **Components** from the left-side menu and click **Create**.
2. Click **Create** in the **Service** card.
3. Enter a unique name and a description for the Service. For example, you can enter the name and the description given below:

    | Field | Value |
    | -------- | -------- |
    | Name | Channel Service |
    | Description | Manage Channel Services |

4. Click **Next**.
5. To allow Choreo to connect to your GitHub account, click **Authorize with GitHub**.
6. If you have not already connected your GitHub repository to Choreo, enter your GitHub credentials, and select the repository you created by forking https://github.com/wso2/choreo-examples to install the Choreo GitHub App.
7. In the Connect Repository dialog box, enter the following information:

    | Field | Value |
    | -------- | -------- |
    | GitHub Account | Your account |
    | GitHub Repository | choreo-examples |
    | Branch | main |
    | Build Preset | Click **Ballerina** because you are creating the REST API from a Ballerina project and Choreo needs to run a Ballerina build to build it. |
    | Project Path | /b2b-apps/pet-care-app/channel-service |

8. Click **Create** to initialize a Service with the implementation from your GitHub repository.

The Service opens on a separate page where you can see its overview.

## Step 1.4: Deploy the Channel Service

1. Navigate to the **Choreo Console**. You will be viewing an overview of the Channel Service.
2. In the left pane, click **Deploy**, and then click **Configure & Deploy**.
3. In the **Configure & Deploy** pane, you will be asking to enter values for the **Defaultable Configurables**.
    - You can setup a **Mysql database** to store the service's data. This is **optional**, and if you do not specify database values, the service will save the data in memory. 

      <details><summary>If you are setting up <b>Mysql Database</b> click here</summary>
      <p>
      
      - Create a Mysql Database using the following database schema.
      
          ```sql
          CREATE DATABASE IF NOT EXISTS CHANNEL_DB;

          CREATE TABLE CHANNEL_DB.Doctor (
                id VARCHAR(255) PRIMARY KEY,
                org VARCHAR(255),
                createdAt VARCHAR(255),
                name VARCHAR(255),
                gender VARCHAR(255),
                registrationNumber VARCHAR(255),
                specialty VARCHAR(255),
                emailAddress VARCHAR(255),
                dateOfBirth VARCHAR(255),
                address VARCHAR(255)
            );

            CREATE TABLE CHANNEL_DB.Availability (
                doctorId VARCHAR(255),
                date VARCHAR(255),
                startTime VARCHAR(255),
                endTime VARCHAR(255),
                availableBookingCount INT,
                PRIMARY KEY (doctorId, date, startTime),
                FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE
            );

            CREATE TABLE CHANNEL_DB.Thumbnail (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fileName VARCHAR(255) NOT NULL,
                content MEDIUMBLOB NOT NULL,
                doctorId VARCHAR(255) NOT NULL,
                FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE
            );

            CREATE TABLE CHANNEL_DB.Booking (
                id VARCHAR(255) PRIMARY KEY,
                org VARCHAR(255),
                referenceNumber VARCHAR(255),
                emailAddress VARCHAR(255),
                createdAt VARCHAR(255),
                petOwnerName VARCHAR(255),
                mobileNumber VARCHAR(255),
                doctorId VARCHAR(255),
                petId VARCHAR(255),
                petName VARCHAR(255),
                petType VARCHAR(255),
                petDoB VARCHAR(255),
                status VARCHAR(255),
                date VARCHAR(255),
                sessionStartTime VARCHAR(255),
                sessionEndTime VARCHAR(255),
                appointmentNumber INT,
                FOREIGN KEY (doctorId) REFERENCES Doctor(id)
            );

            CREATE TABLE CHANNEL_DB.OrgInfo (
                orgName VARCHAR(255),
                name VARCHAR(255),
                address VARCHAR(255),
                telephoneNumber VARCHAR(255),
                registrationNumber VARCHAR(255),
                PRIMARY KEY (orgName)
            );
          ```
      - Make sure your database is publicly accessible and that your database service allows Choreo IP addresses. Please refer the guide [Connect with Protected Third Party Applications](https://wso2.com/choreo/docs/reference/connect-with-protected-third-party-applications/#connect-with-protected-third-party-applications) for more information.

      - Configure the following **Defaultable Configurables** after setting up the database.   

        | Field      |  Value |
        | ---------- | -------- |
        | dbHost     | Database Host. eg: mysql–instance1.123456789012.us-east-1.rds.amazonaws.com  |
        | dbUsername | Database username |
        | dbPassword | Database password |
        | dbDatabase | Database name. eg: CHANNEL_DB  |
        | dbPort     | Database port. eg: 3306|

      </p>
      </details>

    &nbsp;<br>
    - To send emails to users, the channel service connects with the email service. You can specify the email service's URL.
   
      - Provide the value copied in **step 1.2's** final step. 

        | Field      |  Value |
        | ---------- | -------- |
        | emailService     | Email Service URL. eg: http://email-service-yxp-3612627279:9090/  |

    &nbsp;<br>

4. Click **Next** on the **Defaultable Configurables** to deploy the service.
5. Click **Deploy**.

## Step 1.5: Create the Pet Management Service

1. To add a new component, select **Components** from the left-side menu and click **Create**.
2. Click **Create** in the **Service** card.
3. Enter a unique name and a description for the Service. For example, you can enter the name and the description given below:

    | Field | Value |
    | -------- | -------- |
    | Name | Pet Management Service |
    | Description | Manage Pets |

4. Click **Next**.
5. To allow Choreo to connect to your GitHub account, click **Authorize with GitHub**.
6. If you have not already connected your GitHub repository to Choreo, enter your GitHub credentials, and select the repository you created by forking https://github.com/wso2/choreo-examples to install the Choreo GitHub App.
7. In the Connect Repository dialog box, enter the following information:

    | Field | Value |
    | -------- | -------- |
    | GitHub Account | Your account |
    | GitHub Repository | choreo-examples |
    | Branch | main |
    | Build Preset | Click **Ballerina** because you are creating the REST API from a Ballerina project and Choreo needs to run a Ballerina build to build it. |
    | Project Path | /b2b-apps/pet-care-app/pet-management-service |

8. Click **Create** to initialize a Service with the implementation from your GitHub repository.

The Service opens on a separate page where you can see its overview.

## Step 1.6: Deploy the Pet Management Service

1. Navigate to the **Choreo Console**. You will be viewing an overview of the Pet Management Service.
2. In the left pane, click **Deploy**, and then click **Configure & Deploy**.
3. In the **Configure & Deploy** pane, you will be asking to enter values for the **Defaultable Configurables**.
    - You can setup a **Mysql database** to store the service's data. This is **optional**, and if you do not specify database values, the service will save the data in memory. 

      <details><summary>If you are setting up <b>Mysql Database</b> click here</summary>
      <p>
      
      - Create a Mysql Database using the following database schema.
      
          ```sql
            CREATE DATABASE IF NOT EXISTS PET_DB;

            CREATE TABLE PET_DB.Pet (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                breed VARCHAR(255) NOT NULL,
                dateOfBirth VARCHAR(255) NOT NULL,
                owner VARCHAR(255) NOT NULL,
                org VARCHAR(255) NOT NULL
            );

            CREATE TABLE PET_DB.Vaccination (
                id INT AUTO_INCREMENT PRIMARY KEY,
                petId VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                lastVaccinationDate VARCHAR(255) NOT NULL,
                nextVaccinationDate VARCHAR(255),
                enableAlerts BOOLEAN NOT NULL DEFAULT 0,
                FOREIGN KEY (petId) REFERENCES Pet(id) ON DELETE CASCADE
            );

            CREATE TABLE PET_DB.Thumbnail (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fileName VARCHAR(255) NOT NULL,
                content MEDIUMBLOB NOT NULL,
                petId VARCHAR(255) NOT NULL,
                FOREIGN KEY (petId) REFERENCES Pet(id) ON DELETE CASCADE
            );

            CREATE TABLE PET_DB.Settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                owner VARCHAR(255) NOT NULL,
                org VARCHAR(255) NOT NULL,
                notifications_enabled BOOLEAN NOT NULL,
                notifications_emailAddress VARCHAR(255),
                UNIQUE (org, owner)
            );
          ```
      - Make sure your database is publicly accessible and that your database service allows Choreo IP addresses. Please refer the guide [Connect with Protected Third Party Applications](https://wso2.com/choreo/docs/reference/connect-with-protected-third-party-applications/#connect-with-protected-third-party-applications) for more information.

      - Configure the following **Defaultable Configurables** after setting up the database.   

        | Field      |  Value |
        | ---------- | -------- |
        | dbHost     | Database Host. eg: mysql–instance1.123456789012.us-east-1.rds.amazonaws.com  |
        | dbUsername | Database username |
        | dbPassword | Database password |
        | dbDatabase | Database name. eg: PET_DB  |
        | dbPort     | Database port. eg: 3306|

      </p>
      </details>

    &nbsp;<br>
    - To send emails to users, the pet management service connects with the email service. You can specify the email service's URL.
   
      - Provide the value copied in **step 1.2's** final step. 

        | Field      |  Value |
        | ---------- | -------- |
        | emailService     | Email Service URL. eg: http://email-service-yxp-3612627279:9090/  |

    &nbsp;<br>

4. Click **Next** on the **Defaultable Configurables** to deploy the service.
5. Click **Deploy**.


## Step 1.7: Update runtime settings

If you are not connecting the service to a MySQL database and storing the service's data in memory, then you must follow the steps below to ensure that only one container is running for the **channel service** and **pet management service**.

1. Navigate to the **Deploy** section in the component.
2. In the left pane, click **Runtime**.
3. Make the Min replicas and Max replicas count to **1** and click **Update**.
4. Click **Redeploy Release** button.
5. Make sure to apply the same change to the **channel service** and **pet management service**.

## Step 1.8: Update API settings

Both **channel service** and **pet management service** are exposed as APIs. Hence follow the below steps for those services.

1. Navigate to the **Manage** section in the component.
2. Click **Settings**.
3. Under API Settings click **Edit**.
4. Toggle the **Pass Security Context To Backend** to pass the security context details to backend and click **Save**.
5. In the **Apply to Development** pane that opens on the right-hand side of the page, enter a meaningful message. Then click **Apply**.

## Step 1.9: Test the Services

Let's test the Pet Management Service via Choreo's Open API Console by following the steps given below:
1. Click **Test** in the left pane, and be sure that you are in the OpenAPI Console view. If not, click OpenAPI Console in the left pane.
2. Expand the **POST** method of the `/pets` resource and click **Try it out**.
3. Update the request body as below:
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

4. Click **Execute**.
5. Check the Server Response section. On successful invocation, you will receive the **201** HTTP code.

Similarly, you can test the channel service.

## Step 1.10: Publish the Services

Now that your services are tested, let's publish **channel service** and **pet management service** in order to make it available for applications to consume. You don't need to publish the email service as it is used within the project. 

1. Navigate to the **Manage** section of the channel service and click **Lifecycle**.
2. Click **Publish** to publish the Service to the **Developer Portal**. External applications can subscribe to the API via the Developer Portal.
3. Repeat the same steps for the pet management service.
4. To access the Developer Portal, click **Go to DevPortal** in the top right corner.
5. The API will open in the Developer Portal.

&nbsp;<br>
# Step 2: Consume the Service from Developer Portal

## Step 2.1: Enable Asgardeo Key Manager

You can skip this step if you are new to Choreo. If not, follow the below steps to **Enable Asgardeo Key Manager**.

1. Go to the **Choreo Console**, click **Settings**, and then click **API Management**.
2. On the API Management page, click **Enable Asgardeo Key Manager**.

![Alt text](readme-resources/enable-km.png?raw=true "Enable Asgardeo Key Manager")

## Step 2.2: Create an application

An application in the Developer Portal is a logical representation of a physical application such as a mobile app, web app, device, etc.
Let's create the application to consume the Pet Management Service and Channel Service by following the steps given below:
1. Go to the **Developer Portal**.
2. In the top menu of the Developer Portal, click **Applications**.
3. Click **Create**.
4. Enter a name for the application (for example, **Pet Care App**) and click **Create**.

Your Application will open on a separate page.

## Step 2.3: Subscribe to the Services

To consume the Services, the `Pet Care App` application needs to subscribe to the services. To subscribe your application to the Services, follow the steps given below:
1. In the left navigation menu, click **Subscriptions**.
2. Click **Add APIs**.
3. Find your Services and click **Add**.

Now your application has subscribed to the `Pet Management Service` and `Channel Service`.

## Step 2.4: Generate Credentials for the Application

To consume the Service, you need to use the application keys. The below steps specify how you can generate keys for the application.
1. In the left navigation menu, click **Production** on **Credentials**.
2. Click **Generate Credentials**.

Now you have generated keys for the application.

&nbsp;<br>
# Step 3: Deploy the Pet Care Web application

## Step 3.1: Enable Web Application Creation feature

You can skip this step if you are new to Choreo. If not, follow the below steps to **Enable Web Application Creation feature**.

1. Navigate to **Choreo Console**.
2. Click on the **User Profile**in the top right corner.
3. Click on the **Feature Preview** in the user menu.
4. Toggle the **Web Application Creation** Switch.

![Alt text](readme-resources/feature-preview.png?raw=true "Feature Preview")

## Step 3.2: Configure the front-end application

In this step, you are going to deploy the pet care front-end application in Choreo.

1. Navigate to **Choreo Console**.
2. Navigate to the **Components** section from the left navigation menu.
3. Click on the **Create** button.
4. Click on the **Create** button in the **Web Application** Card.
5. Enter a unique name and a description for the Web Application. For example you can provide the following sample values.

    | Field | Value |
    | -------- | -------- |
    | Name | Pet Care Web App |
    | Description | Web application for managing your pets. |

6. Click on the **Next** button.
7. To allow Choreo to connect to your **GitHub** account, click **Authorize with GitHub**.
8. In the Connect Repository dialog box, enter the following information:

    | Field | Value |
    | -------- | -------- |
    | GitHub Account | Your account |
    | GitHub Repository | choreo-examples |
    | Branch | main |
    | Dockerfile Path | /b2b-apps/pet-care-app/pet-management-webapp/Dockerfile |
    | Docker Context Path | /b2b-apps/pet-care-app/pet-management-webapp|
    | Port |3001|

9. Click on the **Create** button.
10. The Web Application opens on a separate page where you can see its overview.

## Step 3.3: Deploy the front-end application

Let's deploy the front-end application first. Later we can update the configurations.

1. Navigate to **Build and Deploy** section on the left navigation menu.
2. Click **Deploy Manually** on the **Build Area**.
3. When the application is deployed successfully you will get an url in the section **Web App URL**. Make a note of this URL for future use.

&nbsp;<br>
# Step 4: Configure Asgardeo

## Step 4.1: Create a suborganization

1. Access **Asgardeo** at https://console.asgardeo.io/ and log in with the same credentials with which you logged in to Choreo. 
2. Verify that you are logged into the **organization** you used for Choreo. Otherwise, select the appropriate **organization** by clicking on the organization menu at the top.
3. Click the **Manage** tab in the top and then select **Organizations**.
4. Click **Add organization** and provide `City Vet Hospital` as the **Organization Name**.
5. You can provide a description and register the organization. 

## Step 4.2: Configure application in Asgardeo

1. Navigate to the **Develop** tab in the top and then select **Applications**.
2. You can see the application you created before from the devportal(`Pet Care App`).
3. Click the `Pet Care App`.
4. Click the **Shared Access** tab.
5. Select **select with only selected sub-organizations** from the options and tick `City Vet Hospital`. Then click **Update**.
6. Click the **Protocol** tab.
7. Scroll down to the **Allowed grant types** and tick **Refresh Token**, **Code** and **Organization Switch**.
8. Tick **Public client** on the next section.
9. Use **Web App URL** in the step 3.3 as an **Authorized redirect URLs** and **Allowed origins**.
10. Additionally, as an **Authorized redirect URLs**, enter the following URL after updating the **Web App URL** with the right value.

     `{Web_APP_URL}/api/auth/callback/wso2isAdmin`

11. Keep the rest of the default configurations and click **Update**.
12. Go to the **User Attributes** tab.
13. Tick on the **Email** and **Groups** sections.
14. Expand the **Profile** section.
15. Add a tick on the Requested Column for the **First Name** and **Last Name**. Then click **Update**.
16. Then go to the **Sign-In Method** tab and ensure that the Organization Login authenticator is added as below.

![Alt text](readme-resources/organization-login-signin-method.png?raw=true "Sign In Methods")

## Step 4.3: Configure management application in Asgardeo 

A management application must be created in order to use the Asagrdeo management APIs. Please follow the instructions outlined below.

1. Navigate to the **Develop** tab in the top and then select **Applications**.
2. Click **New Application** and select **Standard-Based Application**.
3. Use `Pet Care Admin App` as the name and **OAuth2.0 OpenID Connect** as the protocol.
4. Tick **management application** tick box and register the application.
5. Click the **Shared Access** tab.
6. Select **select with only selected sub-organizations** from the options and tick `City Vet Hospital`. Then click **Update**.
7. Click the **Protocol** tab.
8. Scroll down to the **Allowed grant types** and tick **Organization Switch**.
9. Keep the rest of the default configurations and click **Update**.

## Step 4.4: Enable features in Asgardeo

1. [Branding and theming](https://wso2.com/asgardeo/docs/guides/branding/configure-ui-branding/)
    - On the **Asgardeo Console**, go to **Develop > Branding**
    - Enable the **Branding** toggle on top.
    - Go to **General** tab and enter the **site title** as `Pet Care App`.
    - You can provide values to **Copyright Text** and **Contact Email**.
    - Go to the **Design** tab and choose layout as **Centered**.
    - Choose the **Light** theme.
    - Go to **Theme preferences > Images** and enter logo url: https://user-images.githubusercontent.com/35829027/241967420-9358bd5c-636e-48a1-a2d8-27b2aa310ebf.png
    - Enter **Logo Alt Text** as `Pet Care App Logo`.
    - Enter **Favicon url**: https://user-images.githubusercontent.com/1329596/242288450-b511d3dd-5e02-434f-9924-3399990fa011.png
    - Go to **Color Pallet** and choose primary color as **#4f40ee**
    - Keep other options as default
    - Click **Save**.
    
2. [Configure password recovery](https://wso2.com/asgardeo/docs/guides/user-accounts/password-recovery/)
    - On the **Asgardeo Console**, click **Manage > Account Recovery**.
    - Go to **Password Recovery**.
    - Click **Configure** to open the Password Recovery page.
    - Turn on **Enabled** to enable this configuration.
    
3. [Configure login-attempts security](https://wso2.com/asgardeo/docs/guides/user-accounts/account-security/login-attempts-security/#enable-login-attempts-security)    
    - On the **Asgardeo Console**, click **Manage > Account Security**.
    - Click **Configure** to open the **Login Attempts** page.
    - Turn on **Enabled** to enable this configuration.
    
&nbsp;<br>

# Step 5: Consume the Pet Care Application

## Step 5.1: Update configurations of the front-end application

1. Open the web application you created on **Choreo Console** and click **Deploy** section. Then click on the **Configs & Secrets** section on the left navigation menu.
2. Click **Create**.
3. Select config type as **Secret** and mount type as **Environment Variables**. Then click **Next**.
4. Provide the **Config Name** as `web-app-envs`.
5. Figure out the values for the following environment variables. 

    - SHARED_APP_NAME
        - Use the name of the **application**(`Pet Care App`) you created previously via **Developer Portal**.

    - BASE_ORG_URL
        - Open the **application**(`Pet Care App`) you created previously via **Developer Portal**.
        - Click **Production** Keys in the left navigation menu.
        - Go to the **Endpoints** section.
        - Copy and paste the **Token Endpoint** value and remove `/oauth2/token` part from the url. eg: https://api.asgardeo.io/t/{organization_name}

    - CLIENT_ID
        - Open the **application**(`Pet Care App`) you created previously via **Developer Portal**.
        - Click **Production** Keys in the left navigation menu.
        - Copy and paste the value of the **Consumer Key**.
    
    - CLIENT_SECRET
        - Open the **application**(`Pet Care App`) you created previously via **Developer Portal**.
        - Click **Production** Keys in the left navigation menu.
        - Copy and paste the value of the **Consumer Secret**.
      
    - PET_MANAGEMENT_SERVICE_URL
        - Open the **Pet Management Service** you created previously via **Developer Portal**.
        - In the **Overview** section of the API, you can find the **Endpoint(s)**.
        - Copy and paste the value of On the **Endpoint(s)** section.

    - CHANNELLING_SERVICE_URL
        - Open the **Channel Service** you created previously via **Developer Portal**.
        - In the **Overview** section of the API, you can find the **Endpoint(s)**.
        - Copy and paste the value of On the **Endpoint(s)** section.

    - HOSTED_URL
        - Use **Web App URL** in the step 3.3.

    - NEXTAUTH_URL
        - Use **Web App URL** in the step 3.3.

    - MANAGEMENT_APP_CLIENT_ID
        - Navigate to the **Asgardeo Console**, go to **Develop > Applications**
        - Click on the management app (`Pet Care Admin App`) created.
        - Click the **Protocol** tab.
        - Copy and paste the value of the **Client ID**.

    - MANAGEMENT_APP_CLIENT_SECRET
        - Navigate to the **Asgardeo Console**, go to **Develop > Applications**
        - Click on the management app (`Pet Care Admin App`) created.
        - Click the **Protocol** tab.
        - Copy and paste the value of the **Client secret**.

6. After adding the environment variables above, click **create**.

## Step 5.2: Consume the Pet Management Application
    
1. Use **Web App URL** in **step 3.3** to access the Pet Care web application. 

![Alt text](readme-resources/landing-page.png?raw=true "Landing Page")

2. Click on the **Get Started** button.
3. You will get a **Sign In** prompt.
4. You can create an **account** by giving an email address or use a **Google** account to login into the Pet Management application. After login successfully you will redirect to the home page:

![Alt text](readme-resources/home-page.png?raw=true "Home Page")

5. To add a new pet, Click on the **+** button next to `My Pets` in the home page.
6. Provide a name, breed and date of birth.
7. Then click on the **Save** button.
8. Click on the created card and you can see an **overview** of the pet.
9. Click on the **edit** button to update details of the pet. You will get an Update view for the pet.
10. In there you can edit the name, breed and date of birth of the pet.
11. Furthermore, you can add **vaccination details** for your pet.
    - Go to the Vaccination Details section.
    - Give the vaccination name, last vaccination date and next vaccination date.
    - Click on the + button.
    - You can check the enable alerts checkbox if you wish to receive alerts for the next vaccination date.
    - Click on the **Save** button.

    &nbsp;<br>
    > **Note:**
      If you have given **email configuration** when deploying the **Pet Management Service**, then you can test the email sending feature. You need to provide the **next vaccination date** of your pet as next day and **enable alerts**. Then you should receive an email similar to this. 

      ![Alt text](readme-resources/email.png?raw=true "Email")

12. You can update the **image** of your pet in the update details prompt.
    - Click on the Choose a file button.
    - Select a photo from your local device.
    - Click on the **Update** button.
13. Also you can **enable/disable** alerts from the **settings**.
    - Click on the user menu on the top right corner in the home page.
    - Click **Settings**.
    - Toggle the switch to **enable alerts**.
    - Provide an email address.
    - Click **Save**.



