// Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.

// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export const performRequestWithRetry = async (url: string, options: AxiosRequestConfig<any> | undefined) => {

    try {
      const response = await axios(url, options);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // We got a 401 Unauthorized response from the API. Our access token may have expired.
  
        // Try to refresh the token
        try {
          const refreshResponse = await axios.post('/auth/refresh');
          if (refreshResponse.status === 401) {
            // Session has expired (i.e., Refresh token has also expired).
            // Redirect to the login page
            window.location.href = '/auth/login';
          } else if (refreshResponse.status !== 204) {
            // We can't refresh the token due to a server error.
            console.log('Failed to refresh token. Status: ' + refreshResponse.status);
  
            // Hence just throw the 401 error from the API.
            throw error;
          }
          // Token refresh successful. Retry the API call.
          const retryResponse = await axios(url, options);
          return retryResponse;
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        throw error;
      }
    }
  };