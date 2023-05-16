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

import { useAuthContext } from "@asgardeo/auth-react";
import { Grid } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import NavBarInUserView from "../NavBar/navBarInUserView";
import { getDoctors } from "../../components/getDoctors/get-doctors";
import { Doctor } from "../../types/doctor";
import DoctorCard from "../Doctors/doctorCard";
import AddBookings from "./addBooking";
import { getBookings } from "../../components/GetUserBookings/get-bookings";
import { Booking } from "./booking";
import BookingCard from "./bookingCard";
import BookingOverviewInDocView from "./bookingOverviewInDocView";

export const BookingsInPetOwnerView: FunctionComponent = (): ReactElement => {
    const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
    const { getAccessToken } = useAuthContext();
    const [bookingList, setBookingList] = useState<Booking[] | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [isBookingCardOpen, setIsBookingCardOpen] = useState(false);
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

    async function getBookingsList() {
        const accessToken = await getAccessToken();
        getBookings(accessToken)
            .then((res) => {
                if (res.data instanceof Array) {
                    setBookingList(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getDoctorList();
        getBookingsList();
    }, [location.pathname === "/user_bookings"]);


    return (
        <>
            <NavBarInUserView isBlur={isAddBookingOpen} />
            <div className={isAddBookingOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Channelling
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Channel a doctor for your pet
                    </label>
                </div>
                <div className="choose-doc-header">
                    Choose a doctor
                </div>
                <div className="doctor-grid-div-in-channelling">
                    <Grid container spacing={2}>
                        {doctorList && doctorList.map((doctor) => (
                            <Grid item xs={4} sm={4} md={4}
                                onClick={() => { setDoctor(doctor); setIsAddBookingOpen(true); }}>
                                <DoctorCard doctor={doctor} isDoctorEditOpen={false} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="available-bookings-header">
                    Available Bookings
                </div>
                <div className="booking-grid-div-in-channelling">
                    <Grid container spacing={2}>
                        {bookingList && bookingList.map((booking) => (
                            <Grid item xs={4} sm={4} md={4}
                                onClick={() => { setBooking(booking); setIsBookingCardOpen(true); }}>
                                <BookingCard booking={booking} isBookingCardOpen={false} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="block"></div>
            </div>
            <div>
                <AddBookings isOpen={isAddBookingOpen} setIsOpen={setIsAddBookingOpen} doctorId={doctor?.id} />
            </div>
            <div>
                <BookingOverviewInDocView
                    isOpen={isBookingCardOpen}
                    setIsOpen={setIsBookingCardOpen}
                    booking={booking}
                />
            </div>
        </>
    );
};