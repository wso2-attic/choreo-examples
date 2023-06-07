/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import config from "../../../../../../config.json";

interface ConfigObject {
    CommonConfig: {
      AuthorizationConfig: {
        BaseOrganizationUrl?: string;
      };
      ApplicationConfig: {
        SampleOrganization: {
          id: string | undefined;
          name: string | undefined;
        }[];
      };
    };
    BusinessAdminAppConfig: {
      AuthorizationConfig: {
        ClientId?: string;
        ClientSecret?: string;
      };
      ManagementAuthorizationConfig: {
        ClientId?: string;
        ClientSecret?: string;
      };
      ApplicationConfig: {
        HostedUrl?: string;
        APIScopes?: string[];
        Branding: {
          name?: string;
          tag?: string;
        };
      };
      resourceServerURLs: {
        channellingService?: string;
        petManagementService?: string;
      };
    };
  }

/**
 * 
 * get config
 */
export function getConfig() : ConfigObject {

    const configObj = {
        CommonConfig: {
            AuthorizationConfig: {
                BaseOrganizationUrl: process.env["NEXT_PUBLIC_BASE_ORG_URL"]
            },
            // eslint-disable-next-line sort-keys
            ApplicationConfig: {
                SampleOrganization: [
                    {
                        id: process.env["NEXT_PUBLIC_SUB ORGANIZATION_ID"],
                        name: process.env["NEXT_PUBLIC_SUB ORGANIZATION NAME"]
                    }
                ]
            }
        },
        // eslint-disable-next-line sort-keys
        BusinessAdminAppConfig: {
            AuthorizationConfig: {
                ClientId: process.env["NEXT_PUBLIC_CLIENT_ID"],
                ClientSecret: process.env["NEXT_PUBLIC_CLIENT_SECRET"]
            },
            ManagementAuthorizationConfig: {
                ClientId: process.env["NEXT_PUBLIC_MANAGEMENT_APP_CLIENT_ID"],
                ClientSecret: process.env["NEXT_PUBLIC_MANAGEMENT_APPCLIENT_SECRET"]
            },
            // eslint-disable-next-line sort-keys
            ApplicationConfig: {
                HostedUrl: config.BusinessAdminAppConfig.ApplicationConfig.HostedUrl,
                // eslint-disable-next-line sort-keys
                APIScopes: config.BusinessAdminAppConfig.ApplicationConfig.APIScopes,
                Branding: {
                    name: config.BusinessAdminAppConfig.ApplicationConfig.Branding.name,
                    tag: config.BusinessAdminAppConfig.ApplicationConfig.Branding.tag
                }
            },
            resourceServerURLs: {
                channellingService: process.env["NEXT_PUBLIC_CHANNELLING_SERVICE_URL"],
                petManagementService: process.env["NEXT_PUBLIC_PET_MANAGEMENT_SERVICE_URL"]
            }
        }
    };

    return configObj;
}

export default { getConfig };
