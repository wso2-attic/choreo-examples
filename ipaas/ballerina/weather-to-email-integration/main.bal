import ballerina/http;
import wso2/choreo.sendemail as email;

const string ENDPOINT_URL = "https://api.openweathermap.org/data/2.5";
const int StepCount = 7; // number of steps to be fetch from the API
configurable string API_KEY = ?;
configurable float latitude = ?;
configurable float longitude = ?;
configurable string emailAddress = ?;
const emailSubject = "Next 24H Weather Forecast";

// Create http client
http:Client httpclient = check new (ENDPOINT_URL);

public function main() returns error? {

    // Get the weather forecast for the next 24H
    http:Response response = check httpclient->/forecast(lat = latitude, lon = longitude, cnt = StepCount, appid = API_KEY);

    // Get the json payload from the response
    json jsonResponse = check response.getJsonPayload();

    // Convert the json payload to a WeatherRecordList
    WeatherRecordList jsonList = check jsonResponse.cloneWithType();

    // Create a new email client
    email:Client emailClient = check new ();

    // Send the email
    string _ = check emailClient->sendEmail(emailAddress, emailSubject, generateWeatherTable(jsonList));
}
