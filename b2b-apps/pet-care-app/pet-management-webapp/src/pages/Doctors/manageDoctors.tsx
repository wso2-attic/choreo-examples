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
import { useLocation } from 'react-router-dom';
import { getDoctors } from "../../components/getDoctors/get-doctors";
import { Doctor } from "../../types/doctor";
import DoctorOverview from "./doctorOverview";
import { getDocThumbnail } from "../../components/GetDocThumbnail/get-doc-thumbnail";

export const ManageDoctorsPage: FunctionComponent = (): ReactElement => {
    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
    const [isDoctorOverviewOpen, setIsDoctorOverviewOpen] = useState(false);
    const [isDoctorEditOpen, setIsDoctorEditOpen] = useState(false);
    const doctors = ["doc1", "doc2", "doc3", "doc4", "doc5", "doc6", "doc7", "doc8", "doc9", "doc10"];
    const location = useLocation();
    const { getAccessToken } = useAuthContext();
    const [doctorList, setDoctorList] = useState<Doctor[] | null>(null);
    const [doctor, setDoctor] = useState<Doctor | null>(null);

    async function getDoctorList() {
        const accessToken = await getAccessToken();
        getDoctors(accessToken)
            .then((res) => {
                if (res.data instanceof Array) {
                    setDoctorList(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getDoctorList();
    }, [location.pathname === "/manage_doctors", isAddDoctorOpen, isDoctorEditOpen]);

    useEffect(() => {
        getDoctorList();
    }, [isDoctorEditOpen]);


    return (
        <>
            <NavBar isBlur={isAddDoctorOpen || isDoctorOverviewOpen || isDoctorEditOpen} />
            <div className={isAddDoctorOpen || isDoctorOverviewOpen || isDoctorEditOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
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
                        {doctorList && doctorList.map((doctor) => (
                            <Grid item xs={3} sm={4} md={3}
                                onClick={() => { setIsDoctorOverviewOpen(true); setDoctor(doctor);}}>
                                <DoctorCard doctor={doctor} isDoctorEditOpen={isDoctorEditOpen} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div>
                <AddDoctors
                    isOpen={isAddDoctorOpen}
                    setIsOpen={setIsAddDoctorOpen} />
            </div>
            <div>
                <DoctorOverview 
                isOpen={isDoctorOverviewOpen} 
                setIsOpen={setIsDoctorOverviewOpen}
                doctor={doctor}
                isDoctorEditOpen={isDoctorEditOpen}
                setIsDoctorEditOpen={setIsDoctorEditOpen}/>
            </div>
        </>
    );
};