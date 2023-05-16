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
import React, { Fragment, useEffect, useRef, useState } from "react";
import "./doctor.css";
import styled from 'styled-components';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Availability, Doctor, DoctorInfo } from "../../types/doctor";
import { useAuthContext } from "@asgardeo/auth-react";
import { putDoctor } from "../../components/UpdateDoctor/put-doc";
import male_doc_thumbnail from "../../images/male-doc-thumbnail.png";
import female_doc_thumbnail from "../../images/female-doc-thumbnail.png";
import FileUploadSingle from "./imageUploader";

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

export interface EditDoctorProfileProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    doctor: Doctor;
    availabilityInfo: Availability[];
    setAvailabilityInfo: React.Dispatch<React.SetStateAction<Availability[]>>;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditDoctorProfile(props: EditDoctorProfileProps) {
    const { isOpen, setIsOpen, doctor, availabilityInfo, setAvailabilityInfo, url, setUrl} = props;
    const [name, setName] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [DoB, setDoB] = useState("");
    const dateInputRef = useRef(null);
    const [address, setAddress] = useState("");
    const [availableDate, setAvailableDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [bookingCount, setBookingCount] = React.useState(0);
    const { getAccessToken } = useAuthContext();

    const handleClose = () => {
        setIsOpen(false);
        setAvailabilityInfo([]);

    }

    const handleDialogClose = () => {
        setIsOpen(true);
    }

    const handleOnAdd = () => {
        if (availableDate && startTime && endTime && bookingCount) {
            const info: Availability = {
                date: availableDate,
                timeSlots: [
                    {
                        availableBookingCount: bookingCount,
                        startTime: startTime,
                        endTime: endTime,
                    },
                ],
            };

            setAvailabilityInfo(availabilityInfo => [...availabilityInfo, info]);
            setAvailableDate("");
            setStartTime("");
            setEndTime("");
            setBookingCount(0);
        }
    };

    const handleRemoveAvailabilityDetail = (availability: Availability) => {
        setAvailabilityInfo(oldValues => {
            return oldValues.filter(value => value !== availability)
        })
    }

    const handleSave = () => {
        async function updateDoctor() {
            const accessToken = await getAccessToken();
            const docName = (name) ? name : doctor.name;
            const docAddress = (address) ? address : doctor.address;
            const docDoB = (DoB) ? DoB : doctor.dateOfBirth;
            const docEmail = (email) ? email : doctor.emailAddress;
            const docGender = (gender) ? gender : doctor.gender;
            const docRegistrationNo = (registrationNo) ? registrationNo : doctor.registrationNumber;
            const docSpecialty = (specialty) ? specialty : doctor.specialty;

            const payload: DoctorInfo = {
                address: docAddress,
                availability: availabilityInfo,
                dateOfBirth: docDoB,
                emailAddress: docEmail,
                gender: docGender,
                name: docName,
                registrationNumber: docRegistrationNo,
                specialty: docSpecialty,
            };
            putDoctor(accessToken, doctor.id, payload);
        }
        updateDoctor();
        setAvailabilityInfo([]);
        setIsOpen(false);
    }


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
                                    {"Edit Profile"}
                                </Dialog.Title>
                                <div className="doc-edit-div">
                                    <div className="basic-info-div">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Name</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Registration Number</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Specialty</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Email Address</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Gender</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Date of Birth</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Address</p>
                                                </Typography>
                                                <Typography className="typography-style">
                                                    <p className="doc-edit-font">Created At</p>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="name"
                                                    type="text"
                                                    placeholder="Name"
                                                    defaultValue={doctor.name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="registration_number"
                                                    type="text"
                                                    placeholder="Registration Number"
                                                    defaultValue={doctor.registrationNumber}
                                                    onChange={(e) =>
                                                        setRegistrationNo(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="specialty"
                                                    type="text"
                                                    placeholder="Specialty"
                                                    defaultValue={doctor.specialty}
                                                    onChange={(e) =>
                                                        setSpecialty(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Email Address"
                                                    defaultValue={doctor.emailAddress}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="gender"
                                                    type="text"
                                                    placeholder="Gender"
                                                    defaultValue={doctor.gender}
                                                    onChange={(e) =>
                                                        setGender(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="DoB"
                                                    type="date"
                                                    ref={dateInputRef}
                                                    placeholder="DoB"
                                                    defaultValue={doctor.dateOfBirth}
                                                    onChange={(e) => setDoB(e.target.value)}
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    defaultValue={doctor.address}
                                                    onChange={(e) =>
                                                        setAddress(e.target.value)
                                                    }
                                                />
                                                <input
                                                    className="doc-edit-input-style"
                                                    id="createdAt"
                                                    type="text"
                                                    placeholder="Created At"
                                                    defaultValue={doctor.createdAt}
                                                    disabled={true}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <br />
                                    <div className="availability-header-in-overview">
                                        Availability Information
                                    </div>
                                    <br />
                                    <div className="availability-info-grid-in-edit-view">
                                        <div className="availability-info-grid-headers-in-edit">
                                            <label className="availability-info-grid-header-style-in-edit">Available Date</label>
                                            <label className="availability-info-grid-header-style-in-edit">Start Time</label>
                                            <label className="availability-info-grid-header-style-in-edit">End Time</label>
                                            <label className="availability-info-grid-header-style-in-edit">Booking Count</label>
                                        </div>
                                        <input
                                            className="availability-input-style"
                                            id="available_date"
                                            type="date"
                                            ref={dateInputRef}
                                            placeholder="Available Date"
                                            onChange={(e) => {
                                                setAvailableDate(e.target.value);
                                            }}
                                            value={availableDate}
                                        />
                                        <input
                                            className="availability-input-style"
                                            id="start_time"
                                            type="time"
                                            ref={dateInputRef}
                                            placeholder="Start Time"
                                            onChange={(e) => {
                                                setStartTime(e.target.value);
                                            }}
                                            value={startTime}
                                        />
                                        <input
                                            className="availability-input-style"
                                            id="end_time"
                                            type="time"
                                            ref={dateInputRef}
                                            placeholder="End Time"
                                            onChange={(e) => {
                                                setEndTime(e.target.value);
                                            }}
                                            value={endTime}
                                        />

                                        <input
                                            className="availability-input-style"
                                            id="booking_count"
                                            type="number"
                                            placeholder="Booking Count"
                                            onChange={(e) => {
                                                setBookingCount(e.target.valueAsNumber);
                                            }}
                                            value={bookingCount}
                                        />

                                        <button className="availability-plus-button-style" onClick={(e) => { e.preventDefault(); handleOnAdd(); }}>+</button>
                                    </div>
                                    <br />
                                    {availabilityInfo.length > 0 && (
                                        <div className="availability-info-result-table-in-edit">
                                            <div>
                                                <Table aria-label="simple table" style={{ width: "40vw" }}>
                                                    <TableHead >
                                                        <TableRow >
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Available Date</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Start Time</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>End Time</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Booking Count</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Delete Record</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {availabilityInfo && availabilityInfo.length > 0 && availabilityInfo.map((availability) => (
                                                            <TableRow key={availability.date}>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{availability.date}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{availability.timeSlots[0].startTime}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{availability.timeSlots[0].endTime}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{availability.timeSlots[0].availableBookingCount}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: 10, padding: 1 }}><button className="remove-btn" onClick={(e) => { e.preventDefault(); handleRemoveAvailabilityDetail(availability); }}>x</button></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    )}
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
                                <div className="update-doc-image-div">
                                    Update Doctor Image
                                </div>
                                <FileUploadSingle doctorId={doctor.id} imageUrl={url} setImageUrl={setUrl} />
                                <div className="edit-doc-overview-btn-div">
                                    <Button
                                        isDisabled={false}
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </div>
                                <div className="close-doc-overview-btn-div">
                                    <CancelButton
                                        onClick={handleClose}
                                    >
                                        Cancel
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