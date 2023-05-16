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

import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Availability, Doctor } from "../../types/doctor";
import NavBarInDoctorView from "../NavBar/navBarInDocView";
import { getDocThumbnail } from "../../components/GetDocThumbnail/get-doc-thumbnail";
import male_doc_thumbnail from "../../images/male-doc-thumbnail.png";
import female_doc_thumbnail from "../../images/female-doc-thumbnail.png";
import { Grid, Typography } from "@mui/material";
import EditDoctorProfile from "./doctorProfileEditView";
import { getDoctor } from "../../components/getDoctors/get-doctor";
import { getProfile } from "../../components/GetProfileInfo/me";

export const DoctorProfilePage: FunctionComponent = (): ReactElement => {
    const location = useLocation();
    const { getAccessToken } = useAuthContext();
    const[doctor, setDoctor] = useState<Doctor | null>(null);
    const [url, setUrl] = useState("");
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [availabilityInfo, setAvailabilityInfo] = useState<Availability[] | null>([]);

    async function getProfileInfo() {
        const accessToken = await getAccessToken();
        getProfile(accessToken)
            .then(async (res) => {
                if (res.data) {
                    setDoctor(res.data);
                }
                const response = await getDocThumbnail(accessToken, doctor.id);
                if (response.data.size > 0) {
                    const imageUrl = URL.createObjectURL(response.data);
                    setUrl(imageUrl);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getProfileInfo();
    }, [location.pathname === "/doctor_profile", isEditProfileOpen]);

    const handleEdit = () => {
        setIsEditProfileOpen(true);
        setAvailabilityInfo(doctor.availability);
    }


    return (
        <>
            <NavBarInDoctorView isBlur={isEditProfileOpen} />
            <div className={isEditProfileOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Doctor Profile
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Profile information of the doctor
                    </label>
                </div>
                <div>
                    <button className="add-doctor-btn" onClick={() => handleEdit()}>
                        Edit Profile
                    </button>
                </div>
                {doctor && (
                    <>
                        <div className="doctor-profile-pic">
                            {url ? (<img
                                style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                src={url}
                                alt="doc-image"
                            />) : (
                                <img
                                    style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                    src={doctor.gender.toLowerCase() === 'male' ? male_doc_thumbnail : female_doc_thumbnail}
                                    alt="doc-image"
                                />
                            )}
                        </div>
                        <div className="doc-profile-info-div">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                <Typography className="typography-style">
                                        <p className="doc-profile-font">Name</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Registration Number</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Specialty</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Email Address</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Gender</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Date of Birth</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Address</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-profile-font">Created At</p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.name}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.registrationNumber}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.specialty}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.emailAddress}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.gender}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.dateOfBirth}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.address}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-profile-font">{doctor.createdAt}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                )}
            </div>
                <div>
                    <EditDoctorProfile
                        isOpen={isEditProfileOpen}
                        setIsOpen={setIsEditProfileOpen}
                        doctor={doctor}
                        availabilityInfo={availabilityInfo}
                        setAvailabilityInfo={setAvailabilityInfo}
                        url={url}
                        setUrl={setUrl}
                    />
                </div>
        </>
    );
};