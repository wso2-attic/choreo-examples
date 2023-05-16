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
import "./booking.css";
import styled from 'styled-components';
import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Availability, DoctorInfo } from "../../types/doctor";
import { useAuthContext } from "@asgardeo/auth-react";
import { postDoctor } from "../../components/CreateDoctor/post-doc";
import { BookingInfo } from "./booking";
import { postBooking } from "../../components/CreateBooking/post-booking";

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

export interface AddBookingsProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    doctorId: string;
}

export default function AddBookings(props: AddBookingsProps) {
    const { isOpen, setIsOpen, doctorId} = props;
    const dateInputRef = useRef(null);
    const [appointmentNumber, setAppointmentNumber] = React.useState(0);
    const [date, setDate] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [petDoB, setPetDoB] = React.useState("");
    const [petId, setPetId] = React.useState("");
    const [petName, setPetName] = React.useState("");
    const [petOwnerName, setPetOwnerName] = React.useState("");
    const [petType, setPetType] = React.useState("");
    const [sessionStartTime, setSessionStartTime] = React.useState("");
    const [sessionEndTime, setSessionEndTime] = React.useState("");
    const { getAccessToken } = useAuthContext();


    const handleClose = () => {
        setIsOpen(false);
    }

    const handleAdd = () => {
        async function addBooking() {
            const accessToken = await getAccessToken();
            const payload: BookingInfo = {
                appointmentNumber: appointmentNumber,
                date: date,
                doctorId: doctorId,
                mobileNumber: mobileNumber,
                petDoB: petDoB,
                petId: petId,
                petName: petName,
                petOwnerName: petOwnerName,
                petType: petType,
                sessionEndTime: sessionEndTime,
                sessionStartTime: sessionStartTime,
                status: "Confirmed",
            };
            postBooking(accessToken, payload);
        }
        addBooking()
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
                                {"Add a Booking"}
                            </Dialog.Title>
                            <div className="add-doctor-form-div">
                                <form>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Appointment Number
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Appointment Number"
                                            type="number"
                                            placeholder="Appointment Number"
                                            onChange={(e) => setAppointmentNumber(parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Date
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Date"
                                            type="date"
                                            placeholder="Date"
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Mobile Number
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Mobile Number"
                                            type="text"
                                            placeholder="Mobile Number"
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Pet's Date Of Birth
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet's Date Of Birth"
                                            type="date"
                                            ref={dateInputRef}
                                            placeholder="Pet's Date Of Birth"
                                            onChange={(e) => setPetDoB(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Pet Id
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet Id"
                                            type="text"
                                            placeholder="Pet Id"
                                            onChange={(e) => setPetId(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Pet Name
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet Name"
                                            type="text"
                                            placeholder="Pet Name"
                                            onChange={(e) => setPetName(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Pet Owner Name
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet Owner Name"
                                            type="text"
                                            placeholder="Pet Owner Name"
                                            onChange={(e) => setPetOwnerName(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Pet Type
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet Type"
                                            type="text"
                                            placeholder="Pet Type"
                                            onChange={(e) => setPetType(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Session Start Time
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Pet Type"
                                            type="time"
                                            placeholder="Pet Type"
                                            onChange={(e) => setSessionStartTime(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Session End Time
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Session End Time"
                                            type="time"
                                            placeholder="Session End Time"
                                            onChange={(e) => setSessionEndTime(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="add-doc-save-btn-div">
                                <Button
                                    isDisabled={date == '' ||
                                        petId == '' ||
                                        mobileNumber == '' ||
                                        petDoB == '' ||
                                        petId == '' ||
                                        petName == '' ||
                                        petOwnerName == '' ||
                                        petType == '' ||
                                        sessionStartTime == '' ||
                                        sessionEndTime == '' ? true : false}
                                    onClick={handleAdd}>
                                    Add
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