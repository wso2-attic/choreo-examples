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

import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Booking } from "./booking";
import "./booking.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface BookingCardProps {
    booking: Booking;
    isBookingCardOpen: boolean;
}

function BookingCard(props: BookingCardProps) {
    const { booking, isBookingCardOpen } = props;
    const [url, setUrl] = React.useState("");
    const { getAccessToken } = useAuthContext();


    return (
        <>
            <Card className="booking-card">
                <CardContent>
                    <div className="booking-icon">
                        <CalendarMonthIcon style={{ width: "100%", height: "100%", color: "#4e40ed" }} />
                    </div>
                    <div className="booking-summary">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography className="typography-style">
                                    <p className="doc-overview-font">Appointment No</p>
                                </Typography>
                                <Typography className="typography-style">
                                    <p className="doc-overview-font">Date</p>
                                </Typography>
                                <Typography className="typography-style">
                                    <p className="doc-overview-font">sessionStartTime</p>
                                </Typography>
                                <Typography className="typography-style">
                                    <p className="doc-overview-font">petType</p>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className="typography-style-doc-overview">
                                    <p className="doc-overview-font">{booking.appointmentNumber}</p>
                                </Typography>
                                <Typography className="typography-style-doc-overview">
                                    <p className="doc-overview-font">{booking.date}</p>
                                </Typography>
                                <Typography className="typography-style-doc-overview">
                                    <p className="doc-overview-font">{booking.sessionStartTime}</p>
                                </Typography>
                                <Typography className="typography-style-doc-overview">
                                    <p className="doc-overview-font">{booking.petType}</p>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        </>
    );

}

export default React.memo(BookingCard);