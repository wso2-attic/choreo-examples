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
import React, { Fragment, useRef } from "react";
import "./doctor.css";
import styled from 'styled-components';
import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Availability, DoctorInfo } from "../../types/doctor";
import { useAuthContext } from "@asgardeo/auth-react";
import { postDoctor } from "../../components/CreateDoctor/post-doc";

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

export interface AddDoctorsProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddDoctors(props: AddDoctorsProps) {
    const { isOpen, setIsOpen} = props;
    const dateInputRef = useRef(null);
    const [doctorName, setDoctorName] = React.useState("");
    const [registrationNo, setRegistrationNo] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [specialty, setSpecialty] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [availableDate, setAvailableDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [bookingCount, setBookingCount] = React.useState(0);
    const [availabilityInfo, setAvailabilityInfo] = React.useState<Availability[] | null>([]);
    const { getAccessToken } = useAuthContext();

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

    const handleClose = () => {
        // setIsDisable(false);
        setAvailabilityInfo([]);
        setIsOpen(false);
        setDoctorName("");
    }

    const handleSave = () => {
        async function addDoctor() {
            const accessToken = await getAccessToken();
            const payload: DoctorInfo = {
                address: address,
                availability: availabilityInfo,
                dateOfBirth: dateOfBirth,
                emailAddress: emailAddress,
                gender: gender,
                name: doctorName,
                registrationNumber: registrationNo,
                specialty: specialty,
            };
            postDoctor(accessToken, payload);
        }
        addDoctor();
        setAvailabilityInfo([]);
        setIsOpen(false);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-doctor-div"
                    onClose={handleClose}
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
                    <div className="dialog-panel-add-doc">
                        <Dialog.Panel>
                            <Dialog.Title
                                as="h3" className="add-pet-div">
                                {"Add Doctor"}
                            </Dialog.Title>
                            <div className="add-doctor-form-div">
                                <form>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Name
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            onChange={(e) => setDoctorName(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Registration Number
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="registration number"
                                            type="text"
                                            placeholder="Registration number"
                                            onChange={(e) => setRegistrationNo(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Email Adress
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Email Adress"
                                            type="email"
                                            placeholder="Email Adress"
                                            onChange={(e) => setEmailAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Date Of Birth
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Date Of Birth"
                                            type="date"
                                            ref={dateInputRef}
                                            placeholder="Date Of Birth"
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Gender
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Gender"
                                            type="text"
                                            placeholder="Gender"
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Specialty
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Specialty"
                                            type="text"
                                            placeholder="Specialty"
                                            onChange={(e) => setSpecialty(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Address
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Address"
                                            type="text"
                                            placeholder="Address"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <br /><br />
                                    <Divider />
                                    <div className="availability-header">
                                        Availability
                                    </div>
                                    <div className="availability-info-grid">
                                        <div className="availability-info-grid-headers">
                                            <label className="availability-info-grid-header-style">Available Date</label>
                                            <label className="availability-info-grid-header-style">Start Time</label>
                                            <label className="availability-info-grid-header-style">End Time</label>
                                            <label className="availability-info-grid-header-style">Booking Count</label>
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
                                    {availabilityInfo.length > 0 && (
                                        <div className="availability-info-result-table">
                                            <div>
                                                <Table aria-label="simple table" style={{ width: "43vw" }}>
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
                                </form>
                            </div>
                            <div className="add-doc-save-btn-div">
                                <Button
                                    isDisabled={doctorName == '' || registrationNo == '' || address == '' ? true : false}
                                    onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                            <div className="add-doc-cancel-btn-div">
                                <CancelButton onClick={handleClose}>
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