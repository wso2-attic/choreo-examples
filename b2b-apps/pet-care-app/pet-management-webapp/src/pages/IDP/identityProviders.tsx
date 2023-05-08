/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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

import { BasicUserInfo, Hooks, useAuthContext } from "@asgardeo/auth-react";
import { Grid } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import EmptyIDP from "./emptyIDP";

export const IdentityProvidersPage: FunctionComponent = (): ReactElement => {
    const[isSelectIdpOpen, setIsSelectIdpOpen] = useState(false);
    const[isAddEnterpriseIdpOpen, setIsAddEnterpriseIdpOpen]= useState(false);
    const [isAddGoogleIdpOpen, setIsAddGoogleIdpOpen] = useState(false);

    return (
        <>
            <NavBar isBlur={isSelectIdpOpen || isAddEnterpriseIdpOpen || isAddGoogleIdpOpen} />
            <div className={isSelectIdpOpen || isAddEnterpriseIdpOpen || isAddGoogleIdpOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Identity Providers
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Manage identity providers in the organization
                    </label>
                </div>
                <EmptyIDP 
                isSelectIdpOpen={isSelectIdpOpen} 
                setIsSelectIdpOpen={setIsSelectIdpOpen} 
                isAddEnterpriseIdpOpen={isAddEnterpriseIdpOpen}
                setIsAddEnterpriseIdpOpen={setIsAddEnterpriseIdpOpen}
                isAddGoogleIdpOpen={isAddGoogleIdpOpen}
                setIsAddGoogleIdpOpen={setIsAddGoogleIdpOpen}
                />
            </div>
        </>
    );
};