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

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef } from "react";
import "./booking.css";
import styled from 'styled-components';
import { Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Availability, Doctor, DoctorInfo } from "../../types/doctor";
import male_doc_thumbnail from "../../images/male-doc-thumbnail.png";
import female_doc_thumbnail from "../../images/female-doc-thumbnail.png";
import { getDocThumbnail } from "../../components/GetDocThumbnail/get-doc-thumbnail";
import { useAuthContext } from "@asgardeo/auth-react";
import { Booking } from "./booking";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface buttonProps {
    isDisabled: boolean;
}

const Button = styled.button<buttonProps>`
background-color: #4e40ed;
color: #ffffff;
border: none;
width: 7vw;
height: 5vh;
border-radius: 5px;
font-size: 2vh;
color: ${props => props.isDisabled ? '#727372' : '#ffffff'};
background-color: ${props => props.isDisabled ? '#cacccb' : '#4e40ed'};
`;

const CancelButton = styled.button`
background-color: #cacccb;
color: #727372;
border: none;
width: 7vw;
height: 5vh;
border-radius: 5px;
font-size: 2vh;
`;

export interface BookingOverviewProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    booking: Booking;
}

export default function BookingOverviewInDocView(props: BookingOverviewProps) {
    const { isOpen, setIsOpen, booking} = props;
    const [availabilityInfo, setAvailabilityInfo] = React.useState<Availability[] | null>([]);
    const [url, setUrl] = React.useState("");
    const { getAccessToken } = useAuthContext();

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleDialogClose = () => {
        setIsOpen(true);
    }

    if (booking) {
        return (
            <>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="doctor-overview-div-main"
                        onClose={handleDialogClose}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div />
                        </Transition.Child>
                        <div className="dialog-panel-overview-doc">
                            <Dialog.Panel>
                                <Dialog.Title
                                    as="h3" className="booking-overview-title">
                                    {"Booking Overview"}
                                </Dialog.Title>
                                <div className="doc-booking-div">
                                    <div className="booking-basic-info-div">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Appointment Number</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Date</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Doctor ID</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Mobile Number</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Pet's Date of Birth</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Pet ID</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Pet Name</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Pet Owner Name</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Pet Type</p>
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
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Created At</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Email Address</p>
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
                                                    <p className="doc-overview-font">{booking.doctorId}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.mobileNumber}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.petDoB}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.petId}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.petName}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.petOwnerName}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.petType}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.sessionStartTime}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.sessionEndTime}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.status}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.createdAt}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{booking.emailAddress}</p>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div className="doc-image-style">
                                        <CalendarMonthIcon style={{ width: "100%", height: "100%", color: "#4e40ed" }}/>
                                </div>
                                <div className="close-booking-overview-btn-div">
                                    <CancelButton
                                        onClick={handleClose}
                                    >
                                        Close
                                    </CancelButton>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Transition>
            </>
        );
    }
}