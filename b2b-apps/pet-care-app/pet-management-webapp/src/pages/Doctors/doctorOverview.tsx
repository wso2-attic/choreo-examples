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
import "./doctor.css";
import styled from 'styled-components';
import { Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Availability, Doctor, DoctorInfo } from "../../types/doctor";
import EditDoctor from "./editDoctor";
import male_doc_thumbnail from "../../images/male-doc-thumbnail.png";
import female_doc_thumbnail from "../../images/female-doc-thumbnail.png";
import { getDocThumbnail } from "../../components/GetDocThumbnail/get-doc-thumbnail";
import { useAuthContext } from "@asgardeo/auth-react";

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

export interface DoctorOverviewProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    doctor: Doctor;
    isDoctorEditOpen: boolean;
    setIsDoctorEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DoctorOverview(props: DoctorOverviewProps) {
    const { isOpen, setIsOpen, doctor, isDoctorEditOpen, setIsDoctorEditOpen } = props;
    const [availabilityInfo, setAvailabilityInfo] = React.useState<Availability[] | null>([]);
    const [url, setUrl] = React.useState("");
    const [stringDate, setStringDate] = React.useState("");
    const { getAccessToken } = useAuthContext();

    const handleClose = () => {
        setIsOpen(false);
    }
    
    const handleDialogClose = () => {
        setIsOpen(true);
    }

    const handleEdit = () => {
        setIsOpen(false);
        setIsDoctorEditOpen(true);
        if (doctor.availability.length > 0) {
            setAvailabilityInfo(doctor.availability);
        }
    }

    async function getThumbnails() {
        const accessToken = await getAccessToken();
        const response = await getDocThumbnail(accessToken, doctor.id);
        if (response.data.size > 0) {
            const imageUrl = URL.createObjectURL(response.data);
            setUrl(imageUrl);
        }
    }

    useEffect(() => {
        setUrl(null);
        getThumbnails();
        if(doctor && doctor.createdAt != "") {
            const isoString = doctor.createdAt;
            const date = new Date(isoString);
            const stringDate = date.toLocaleString();
            setStringDate(stringDate);
        }
    }, [isOpen]);


    if (doctor) {
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
                                    as="h3" className="doctor-overview-title">
                                    {doctor.name}
                                </Dialog.Title>
                                <div className="doc-overview-div">
                                    <div className="basic-info-div">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Registration Number</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Specialty</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Email Address</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Gender</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Date of Birth</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Address</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-overview-font">Created At</p>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.registrationNumber}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.specialty}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.emailAddress}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.gender}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.dateOfBirth}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{doctor.address}</p>
                                                </Typography>
                                                <Typography className="typography-style-doc-overview">
                                                    <p className="doc-overview-font">{stringDate}</p>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <br />
                                    <div className="availability-header-in-overview">
                                        Availability Information
                                    </div>
                                    <br />
                                    <div className="availability-info-div-in-overview">
                                        {doctor.availability.length > 0 ? (
                                            <div>
                                                <Table aria-label="simple table" style={{ width: "40vw" }}>
                                                    <TableHead >
                                                        <TableRow >
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", color: "rgb(105, 105, 105)" }}>Date</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", color: "rgb(105, 105, 105)" }}>Start Time</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", color: "rgb(105, 105, 105)" }}>End Time</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", color: "rgb(105, 105, 105)" }}>Booking Count</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {doctor.availability.map((availability) => (
                                                            <TableRow key={availability.date}>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{availability.date}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{availability.timeSlots[0].startTime}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{availability.timeSlots[0].endTime}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{availability.timeSlots[0].availableBookingCount}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <div className="no-availability-info-div">
                                                Your availability information is not provided.
                                            </div>
                                        )}
                                    </div>
                                    <br />
                                </div>
                                <div className="doc-image-style">
                                    {url ? (<img
                                        style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                        src={url}
                                        alt="pet-image"
                                    />) : (
                                        <img
                                            style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                            src={doctor.gender.toLowerCase() === 'male' ? male_doc_thumbnail : female_doc_thumbnail}
                                            alt="pet-image"
                                        />
                                    )}
                                </div>
                                <div className="edit-doc-overview-btn-div">
                                    <Button
                                        isDisabled={false}
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <div className="close-doc-overview-btn-div">
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
                <div>
                    <EditDoctor
                        isOpen={isDoctorEditOpen}
                        setIsOpen={setIsDoctorEditOpen}
                        doctor={doctor}
                        availabilityInfo={availabilityInfo}
                        setAvailabilityInfo={setAvailabilityInfo}
                        url={url}
                        setUrl={setUrl}
                    />
                </div>
            </>
        );
    }
}