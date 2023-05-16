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
import NavBarInDoctorView from "../NavBar/navBarInDocView";
import BookingCard from "./bookingCard";
import { Booking } from "./booking";
import BookingOverviewInDocView from "./bookingOverviewInDocView";
import { Link } from 'react-router-dom';

export const BookingsInDoctorView: FunctionComponent = (): ReactElement => {
    const [isBookingOverviewOpen, setIsBookingOverviewOpen] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);


    const bookingsList: Booking[] = [
        {
            appointmentNumber: 1,
            date: "2023-02-02",
            doctorId: "2",
            mobileNumber: "1234",
            petDoB: "2023-03-04",
            petId: "01edf3ad-d236-1026-a719-ad8456450a0c",
            petName: "Cooper",
            petOwnerName: "Chris",
            petType: "Dog",
            sessionEndTime: "04",
            sessionStartTime: "02",
            status: "pending",
            createdAt: "string",
            emailAddress: "string",
            id: "string",
            org: "string"
        },
        {
            appointmentNumber: 2,
            date: "2023-02-02",
            doctorId: "2",
            mobileNumber: "1234",
            petDoB: "2023-03-04",
            petId: "01edf3ad-d236-1026-a719-ad8456450a0c",
            petName: "Cooper",
            petOwnerName: "Chris",
            petType: "Dog",
            sessionEndTime: "04",
            sessionStartTime: "02",
            status: "pending",
            createdAt: "string",
            emailAddress: "string",
            id: "string",
            org: "string"
        },
        {
            appointmentNumber: 3,
            date: "2023-02-02",
            doctorId: "2",
            mobileNumber: "1234",
            petDoB: "2023-03-04",
            petId: "01edf3ad-d236-1026-a719-ad8456450a0c",
            petName: "Cooper",
            petOwnerName: "Chris",
            petType: "Dog",
            sessionEndTime: "04",
            sessionStartTime: "02",
            status: "pending",
            createdAt: "string",
            emailAddress: "string",
            id: "string",
            org: "string"
        }
    ]


    return (
        <>
            <NavBarInDoctorView isBlur={isBookingOverviewOpen} />
            <div className={isBookingOverviewOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Bookings
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Available bookings for the doctor
                    </label>
                </div>
                <div className="doctor-grid-div">
                    <Grid container spacing={2}>
                        {bookingsList && bookingsList.map((booking) => (
                            <Grid item xs={4} sm={4} md={4}
                                onClick={() => { setIsBookingOverviewOpen(true); setBooking(booking); }}>
                                <Link to="/booking_details" state={booking} style={{ textDecoration: 'none' }}>
                                    <BookingCard booking={booking} isBookingCardOpen={isBookingOverviewOpen} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div>
                <BookingOverviewInDocView
                    isOpen={isBookingOverviewOpen}
                    setIsOpen={setIsBookingOverviewOpen}
                    booking={booking}
                />
            </div>
        </>
    );
};