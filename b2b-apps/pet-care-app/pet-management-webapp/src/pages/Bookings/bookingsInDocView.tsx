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
import BookingOverviewInDocView from "./bookingOverviewInUserView";
import { Link } from 'react-router-dom';
import { getProfile } from "../../components/GetProfileInfo/me";
import { getDoctorBookings } from "../../components/GetDoctorBookings/get-doc-bookings";
import { Doctor } from "../../types/doctor";

export const BookingsInDoctorView: FunctionComponent = (): ReactElement => {
    const [isBookingOverviewOpen, setIsBookingOverviewOpen] = useState(false);
    const [bookingList, setBookingList] = useState<Booking[] | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    const[doctor, setDoctor] = useState<Doctor | null>(null);
    const { getAccessToken } = useAuthContext();

    async function getBookings() {
        const accessToken = await getAccessToken();
        getProfile(accessToken)
            .then(async (res) => {
                if (res.data) {
                    setDoctor(res.data);
                }
                const response = await getDoctorBookings(accessToken, res.data.id);
                if (response.data instanceof Array) {
                    setBookingList(response.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getBookings();
    }, [location.pathname === "/doctor_bookings"]);

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
                        {bookingList && bookingList.map((booking) => (
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