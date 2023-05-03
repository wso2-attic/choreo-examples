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
import DoctorCard from "./doctorCard";

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
    const doctors = ["doc1", "doc2", "doc3", "doc4", "doc5", "doc6", "doc7", "doc8", "doc9", "doc10"];


    return (
        <>
            <NavBar isBlur={isAddDoctorOpen} />

            <div className={isAddDoctorOpen ? "home-div-blur" : "home-div"}>
                {/* <div className="doctors-div">
                    <label className="home-wording">
                        Manage Doctors
                    </label>
                    <button className="add-pet-btn" onClick={() => setIsAddDoctorOpen(true)}>
                        +
                    </button>
                </div> */}
                <div className="manage-users-div">
                    <label className="home-wording">
                        Manage Doctors
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Manage doctors in the organization
                    </label>
                </div>
                <div>
                    <button className="add-doctor-btn" onClick={() => setIsAddDoctorOpen(true)}>
                        Add doctor
                    </button>
                </div>
                <div className="doctor-grid-div">
                <Grid container spacing={2}>
                    {doctors.map((doctor) => (
                        <Grid item xs={3} sm={4} md={3}>
                            <DoctorCard/>
                        </Grid>
                    ))}
                </Grid>
                </div>
            </div>
            <div>
                <AddDoctors isOpen={isAddDoctorOpen} setIsOpen={setIsAddDoctorOpen} />
            </div>
        </>
    );
};