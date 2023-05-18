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
import "./booking.css";
import styled from 'styled-components';
import { Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Availability, Doctor, DoctorInfo } from "../../types/doctor";
import { useAuthContext } from "@asgardeo/auth-react";
import { Pet } from "../../types/pet";
import PetCard from "../Pets/PetCard";
import PetCardInAddBooking from "../Pets/PetCard/pet-card-in-add-booking";
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
    doctor: Doctor;
    petList: Pet[];
}

export default function AddBookings(props: AddBookingsProps) {
    const { isOpen, setIsOpen, doctor, petList } = props;
    const { getDecodedIDToken, getAccessToken } = useAuthContext();
    const [availability, setAvailability] = useState<Availability[] | null>(null);
    const [availabilityInfo, setAvailabilityInfo] = useState<Availability | null>(null);
    const [pet, setPet] = useState<Pet | null>(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [petOwner, setPetOwner] = React.useState("");
    const steps = ['Time Selection', 'Pet Selection', 'Users Info'];
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };


    const handleClose = () => {
        setIsOpen(false);
        setActiveStep(0);
        setAvailabilityInfo(null);
        setPet(null);
    }

    useEffect(() => {
        setAvailability(doctor?.availability);
        (async (): Promise<void> => {
            const decodedIDToken = await getDecodedIDToken();
            setPetOwner(decodedIDToken.email);
        })();
    }, [isOpen]);

    const handleOnTimeSlotClick = (availabilityInfo: Availability) => {
        setAvailabilityInfo(availabilityInfo);
    }

    const handleNext = () => {
        if (activeStep === 0) {
            if (availabilityInfo != null) {
                const newActiveStep =
                    isLastStep() && !allStepsCompleted()
                        ? // It's the last step, but not all steps have been completed,
                        // find the first step that has been completed
                        steps.findIndex((step, i) => !(i in completed))
                        : activeStep + 1;
                setActiveStep(newActiveStep);

            }
        } else if (activeStep === 1) {
            if (pet != null) {
                const newActiveStep =
                    isLastStep() && !allStepsCompleted()
                        ? // It's the last step, but not all steps have been completed,
                        // find the first step that has been completed
                        steps.findIndex((step, i) => !(i in completed))
                        : activeStep + 1;
                setActiveStep(newActiveStep);
            }
        }
    }

    const handleFinish = async () => {
        async function addBooking() {
            const accessToken = await getAccessToken();
            const payload: BookingInfo = {
                appointmentNumber: 1,
                date: availabilityInfo.date,
                doctorId: doctor.id,
                mobileNumber: mobileNumber,
                petDoB: pet.dateOfBirth,
                petId: pet.id,
                petName: pet.name,
                petOwnerName: petOwner,
                petType: pet.breed,
                sessionEndTime: availabilityInfo.timeSlots[0].endTime,
                sessionStartTime: availabilityInfo.timeSlots[0].startTime,
                status: "Confirmed",
            };
            postBooking(accessToken, payload);
        }
        addBooking();
        await timeout(150);
        setIsOpen(false);
        setActiveStep(0);
        setAvailabilityInfo(null);
        setPet(null);
    }

    const handleDialogClose = () => {
        setIsOpen(true);
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-doctor-div"
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
                    <div className="dialog-panel-add-doc">
                        <Dialog.Panel>
                            <Dialog.Title
                                as="h3" className="add-pet-div">
                                {"Add a Booking"}
                            </Dialog.Title>
                            <div className="add-booking-form-div">
                                {activeStep === 0 && (
                                    <><div className="choose-time-header">
                                        Choose a time slot
                                    </div><div className="timeslot-div">
                                            {availability && availability.map((availabilityInfo) => (
                                                <>
                                                    <button className="time-slot-button" onClick={(e) => { e.preventDefault(); handleOnTimeSlotClick(availabilityInfo); }}>
                                                        {availabilityInfo.date + " , " + availabilityInfo.timeSlots[0].startTime + " - " + availabilityInfo.timeSlots[0].endTime}
                                                    </button>
                                                    <br /><br /></>
                                            ))}
                                            {availability?.length === 0 && (
                                                <div className="doc-unavailable-div">
                                                    Doctor is currently unavailable.
                                                </div>
                                            )}
                                        </div></>
                                )}
                                {activeStep === 1 && (
                                    <>
                                        <div className="choose-time-header">
                                            Choose your pet
                                        </div>
                                        <div className="pets-div">
                                            <Grid container spacing={2}>
                                                {petList && petList.map((pet) => (
                                                    <Grid item xs={6} sm={6} md={6}
                                                        onClick={(e) => { e.preventDefault(); setPet(pet); }}>
                                                        <PetCardInAddBooking
                                                            petId={pet.id}
                                                            petName={pet.name}
                                                            breed={pet.breed}
                                                            isUpdateViewOpen={false}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    </>
                                )}
                                {activeStep === 2 && (
                                    <div className="timeslot-div">
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
                                    </div>
                                )}
                            </div>
                            {activeStep === 0 && (
                                <><div className="next-btn-div">
                                    <Button
                                        isDisabled={availabilityInfo === null ? true : false}
                                        onClick={handleNext}>
                                        Next
                                    </Button>
                                </div><div className="cancel-btn-div">
                                        <CancelButton onClick={handleClose}>
                                            Cancel
                                        </CancelButton>
                                    </div></>
                            )}
                            {activeStep === 1 && (
                                <><div className="next-btn-div">
                                    <Button
                                        isDisabled={pet === null ? true : false}
                                        onClick={handleNext}>
                                        Next
                                    </Button>
                                </div><div className="cancel-btn-div">
                                        <CancelButton onClick={handleClose}>
                                            Cancel
                                        </CancelButton>
                                    </div></>
                            )}
                            {activeStep === 2 && (
                                <><div className="next-btn-div">
                                    <Button
                                        isDisabled={pet === null ? true : false}
                                        onClick={handleFinish}>
                                        Finish
                                    </Button>
                                </div><div className="cancel-btn-div">
                                        <CancelButton onClick={handleClose}>
                                            Cancel
                                        </CancelButton>
                                    </div></>
                            )}
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}