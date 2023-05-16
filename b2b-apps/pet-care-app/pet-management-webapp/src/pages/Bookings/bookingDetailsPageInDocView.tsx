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
import { Checkbox, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import { Booking } from "./booking";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Pet } from "../../types/pet";
import { getPet } from "../../components/GetPet/get-pet";
import { getThumbnail } from "../../components/GetThumbnail/get-thumbnail";
import PET_IMAGE from "../../images/thumbnail.png";

export const BookingDetailsInDoctorView: FunctionComponent = (): ReactElement => {
    const [isBookingOverviewOpen, setIsBookingOverviewOpen] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [pet, setPet] = useState<Pet | null>(null);
    const location = useLocation();
    const bookingInfo = location.state;
    const { getAccessToken } = useAuthContext();
    const [url, setUrl] = useState("");

    async function getPetInfo() {
        const accessToken = await getAccessToken();
        getPet(accessToken, bookingInfo.petId)
            .then(async (res) => {
                if (res.data) {
                    setPet(res.data);
                    const response = await getThumbnail(accessToken, res.data.id);
                    if (response.data.size > 0) {
                        const imageUrl = URL.createObjectURL(response.data);
                        setUrl(imageUrl);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getPetInfo();
    }, [location.pathname === "/booking_details"]);



    return (
        <>
            <div className={isBookingOverviewOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Booking Details
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Detailed information of your booking
                    </label>
                </div>
                <div className="booking-info-div">
                    <div className="booking-info-div-header">
                        Booking Details
                    </div>
                    <div className="boking-detail-grid-item-info">
                        {bookingInfo && (
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Appointment No</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Date</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Mobile Number</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Email Address</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Session Start Time</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Session End Time</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Status</p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">{bookingInfo.appointmentNumber}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.date}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.mobileNumber}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.emailAddress}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.sessionStartTime}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.sessionEndTime}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.status}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </div>
                </div>
                <div className="pet-info-div">
                    <div className="pet-info-header">
                        Pet Details
                    </div>
                    <div className="pet-image-in-booking-details">
                        {url ? (<img
                            style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                            src={url}
                            alt="pet-image"
                        />) : (
                            <img
                                style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                src={PET_IMAGE}
                                alt="pet-image"
                            />
                        )}
                    </div>
                    <div className="pet-info-basic-details">
                        {pet && (
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Name</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Breed</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Date of Birth</p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">{pet.name}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{pet.breed}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{pet.dateOfBirth}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}

                    </div>
                </div>
                <div className="vacc-info-div-header">
                    Vaccination Details
                </div>
                <div className="vacc-info-div">
                    {pet && pet.vaccinations && pet.vaccinations.length > 0 ? (
                        <div className="vaccine-info-box-in-booking-detail">
                            <div >
                                <Table aria-label="simple table" style={{ width: "43vw" }}>
                                    <TableHead >
                                        <TableRow >
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Vaccine Name</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Last vaccination Date</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Next Vaccination Date</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Enable Alerts</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pet.vaccinations.map((vaccine) => (
                                            <TableRow key={vaccine.name}>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.name}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.lastVaccinationDate}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.nextVaccinationDate}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}><Checkbox color="primary" disabled={true} checked={vaccine.enableAlerts} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className="no-vacc-details">
                            <label className="no-detail-label">No vaccination details available</label>
                        </div>
                    )}
                </div>
                <div className="medical-report-div-header">
                    Medical Reports
                </div>
            </div>
            <Link to="/doctor_bookings" style={{ textDecoration: 'none' }}>
                <button className="back-btn">
                    {"< Back"}
                </button>
            </Link>
        </>
    );
};