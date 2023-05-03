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
    const { isOpen, setIsOpen } = props;
    const dateInputRef = useRef(null);
    const [doctorName, setDoctorName] = React.useState("");
    const [registrationNo, setRegistrationNo] = React.useState("");
    const [availableDate, setAvailableDate] = React.useState("");

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-doctor-div"
                    onClose={() => setIsOpen(false)}
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
                    <div className="align-title">
                        <Dialog.Panel>
                            <Dialog.Title
                                as="h3" className="add-pet-div">
                                {"Add Doctor"}
                            </Dialog.Title>
                            <div className="child-div">
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
                                                Available Date
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Available Date"
                                            type="date"
                                            ref={dateInputRef}
                                            placeholder="Available Date"
                                            onChange={(e) => setAvailableDate(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="add-doc-save-btn-div">
                                <Button isDisabled={doctorName == '' || registrationNo == '' || availableDate == '' ? true : false}>
                                    Save
                                </Button>
                            </div>
                            <div className="add-doc-cancel-btn-div">
                                <CancelButton onClick={() => setIsOpen(false)}>
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