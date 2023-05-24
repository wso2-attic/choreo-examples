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

import { Grid } from "@mui/material";
import { Booking } from "apps/business-admin-app/types/booking";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Stack } from "rsuite";
import styles from "../../../../styles/doctor.module.css";
import BookingCard from "../sectionsRelatedToBookings/bookingCard";

interface DoctorBookingsSectionProps {
    session: Session
}

/**
 * 
 * @param prop - session
 * 
 * @returns The doctor bookings section.
 */
export default function DoctorBookingsSection(props: DoctorBookingsSectionProps) {

    const { session } = props;
    const [ isBookingOverviewOpen, setIsBookingOverviewOpen ] = useState(false);
    const [ bookingList, setBookingList ] = useState<Booking[] | null>(null);
    const [ booking, setBooking ] = useState<Booking | null>(null);
    const router = useRouter();

    const docBooking:Booking = {
        id: "01edf483-f795-13fe-bf68-355a15c1f810",
        org: "1db36e94-3106-436d-b28e-065f5668d01e",
        emailAddress: "david@gmail.com",
        createdAt: "2023-05-17T07:25:15.594312Z",
        petOwnerName: "shalki",
        mobileNumber: "0713030303",
        doctorId: "01edf3f4-295e-1c5e-8c0d-39f82a220cf6",
        petId: "01edf3f3-f3b9-1dce-b36b-7f96d533c626",
        petName: "Shadow",
        petType: "Dog",
        petDoB: "2023-05-12",
        status: "Confirmed",
        date: "2023-05-05",
        sessionStartTime: "14:55",
        sessionEndTime: "14:55",
        appointmentNumber: 2
    };

    const handleClick = () => {
        router.push("/test");
    };

    return (
        <div
            className={ styles.tableMainPanelDivDoc }
        >
            <Stack
                direction="row"
                justifyContent="space-between">
                <Stack direction="column" alignItems="flex-start">
                    <h2>{ "Bookings" }</h2>
                    <p>{ "Available Bookings for the doctor" }</p>
                </Stack>
            </Stack>
            <div>
                <Grid container spacing={ 2 }>
                    { /* { bookingList && bookingList.map((booking) => ( */ }
                    <Grid
                        item
                        xs={ 4 }
                        sm={ 4 }
                        md={ 4 }
                        // key={ booking.id }
                        onClick={ () => { setIsBookingOverviewOpen(true); setBooking(booking); handleClick();} }>
                        <BookingCard booking={ docBooking } isBookingCardOpen={ isBookingOverviewOpen } />
                    </Grid>
                    { /* )) } */ }
                </Grid>
            </div>

        </div>
    );
}
