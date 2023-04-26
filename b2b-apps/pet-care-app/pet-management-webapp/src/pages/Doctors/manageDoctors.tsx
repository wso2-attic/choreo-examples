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
import { default as authConfig } from "../config.json";
import NavBar from "../../components/navBar";
import MenuListComposition from "../../components/UserMenu";
import AddDoctors from "./addDoctors";

interface DerivedState {
    authenticateResponse: BasicUserInfo,
    idToken: string[],
    decodedIdTokenHeader: string,
    decodedIDTokenPayload: Record<string, string | number | boolean>;
}

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ManageDoctorsPage: FunctionComponent = (): ReactElement => {

    const {
        state,
        signIn,
        signOut,
        getBasicUserInfo,
        getIDToken,
        getDecodedIDToken,
        on
    } = useAuthContext();
    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);

  
    return (
        <>
            <NavBar />

            <div className="home-div">
                <div className="doctors-div">
                    <label className="home-wording">
                        Doctors
                    </label>
                    <button className="add-pet-btn" onClick={() => setIsAddDoctorOpen(true)}>
                        +
                    </button>
                </div>
            </div>
            <div>
                <AddDoctors isOpen={isAddDoctorOpen} setIsOpen={setIsAddDoctorOpen} />
            </div>
        </>
    );
};