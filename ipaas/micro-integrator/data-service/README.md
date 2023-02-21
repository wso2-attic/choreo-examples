# Data service integration

This samples show how to create a integration which integrate with RDBMS. This example expose Employee information
stored in Database as a REST API. First, for this sample repository to use it with choreo.

## Setting up database
- Start a MySQL instance and create Database(ex: misampledb).
- Import the script to create schema and populate employee data
- Identify the public accessible connection url and credentials

## Create a MI Integration
- Login to [Choreo console](https://console.choreo.dev/)
- Select iPaaS profile and create new component with name `Integration as an API`
- Give a name and description
- Authorize and select the GitHub details
- Select the `GitHub Account`
- Select the forked repository for `GitHub Repository`
- Select the `Branch` as `main`
- Select `WSO2 MI` as `Build Preset`
- Enter `ipaas/micro-integrator/data-service/` for the `Project Path`
- Enter `ipaas/micro-integrator/data-service/openapi.yaml` for the `OpenAPI File Path`
- Then click on create
- Once done, go to `Deploy` section and click on `Deploy Manually` button

### Setting up Environment variables
- Database details need to be passed as environment variables
- For that, go to the DevOps portal and select the component and `Configs & Secrets` to configure the env variables
- Click on `Create` button and select `Environment Variables` as the `Configuration Type`
- Give a name for the `Config Name`
- Add Key value pairs to register them as environment variables. ex:
  - `DB_DRIVER_CLASS` for `Key` and `com.mysql.jdbc.Driver` for `Value`
  - `DB_CONNECTION_URL` for `Key` and `jdbc:mysql://<public ip or hostname>:3306/misampledb` for `Value`
  - `DB_USER` for `Key` and db username for `Value`
  - `DB_PASS` for `Key` and db password for `Value`
  - Click on `Finish` to apply the changes

### Once done go to the Choreo Test console and use the Swagger console to try out the API
