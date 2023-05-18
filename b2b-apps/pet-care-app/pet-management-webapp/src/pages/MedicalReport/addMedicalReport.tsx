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
import "./medicalReport.css";
import styled from 'styled-components';
import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Availability, DoctorInfo } from "../../types/doctor";
import { useAuthContext } from "@asgardeo/auth-react";
import { postDoctor } from "../../components/CreateDoctor/post-doc";
import { postBooking } from "../../components/CreateBooking/post-booking";
import { BookingInfo } from "../Bookings/booking";
import { MedicalReport, Medicine } from "../../types/pet";
import { postMedicalReport } from "../../components/CreateMedicalReport/post-medical-report";

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
    petId: string;
}

export default function AddMedicalReport(props: AddBookingsProps) {
    const { isOpen, setIsOpen, petId } = props;
    const dateInputRef = useRef(null);
    const [diagnosis, setDiagnosis] = React.useState("");
    const [medicineList, setMedicineList] = React.useState<Medicine[] | null>([]);
    const [treatment, setTreatment] = React.useState("");
    const [dosage, setDosage] = React.useState("");
    const [drugName, setDrugName] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const { getAccessToken } = useAuthContext();


    const handleClose = () => {
        setIsOpen(false);
    }

    const handleAdd = () => {
        async function addMedicalReport() {
            const accessToken = await getAccessToken();
            const payload: MedicalReport = {
                diagnosis: diagnosis,
                medications: medicineList,
                treatment: treatment
            };
            postMedicalReport(accessToken, petId,  payload);
        }
        addMedicalReport()
        setIsOpen(false);
    }

    const handleDialogClose = () => {
        setIsOpen(true);
    }

    const handleOnAdd = () => {
        if (drugName && dosage && duration) {
            const info: Medicine = {
                drugName: drugName,
                dosage: dosage,
                duration: duration,
            };

            setMedicineList(medicineList => [...medicineList, info]);
            setDrugName("");
            setDosage("");
            setDuration("");
        }
    };

    const handleRemoveMedicineDetail = (medicine: Medicine) => {
        setMedicineList(oldValues => {
            return oldValues.filter(value => value !== medicine)
        })
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
                                {"Add a Medical Report"}
                            </Dialog.Title>
                            <div className="add-doctor-form-div">
                                <form>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Diagnosis
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Diagnosis"
                                            type="text"
                                            placeholder="Diagnosis"
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "2.5vh", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "normal" }}>
                                                Treatment
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Treatment"
                                            type="text"
                                            placeholder="Treatment"
                                            onChange={(e) => setTreatment(e.target.value)}
                                        />
                                    </div>
                                    <div className="availability-header">
                                        Medications
                                    </div>
                                    <div className="availability-info-grid">
                                        <input
                                            className="availability-input-style"
                                            id="drug_name"
                                            type="text"
                                            placeholder="Drug Name"
                                            onChange={(e) => {
                                                setDrugName(e.target.value);
                                            }}
                                            value={drugName}
                                        />
                                        <input
                                            className="availability-input-style"
                                            id="dosage"
                                            type="text"
                                            placeholder="Dosage"
                                            onChange={(e) => {
                                                setDosage(e.target.value);
                                            }}
                                            value={dosage}
                                        />
                                        <input
                                            className="availability-input-style"
                                            id="duration"
                                            type="text"
                                            placeholder="Duration"
                                            onChange={(e) => {
                                                setDuration(e.target.value);
                                            }}
                                            value={duration}
                                        />
                                        <button className="availability-plus-button-style" onClick={(e) => { e.preventDefault(); handleOnAdd(); }}>+</button>
                                    </div>
                                    {medicineList.length > 0 && (
                                        <div className="medicine-info-result-table">
                                            <div>
                                                <Table aria-label="simple table" style={{ width: "43vw" }}>
                                                    <TableHead >
                                                        <TableRow >
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Drug Name</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Dosage</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Duration</TableCell>
                                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold", padding: "1vh", height: "1vh" }}>Delete Record</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {medicineList && medicineList.length > 0 && medicineList.map((medicine) => (
                                                            <TableRow key={medicine.drugName}>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{medicine.drugName}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{medicine.dosage}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: "1vh" }}>{medicine.duration}</TableCell>
                                                                <TableCell align="center" style={{ fontSize: 10, padding: 1 }}><button className="remove-btn" onClick={(e) => { e.preventDefault(); handleRemoveMedicineDetail(medicine); }}>x</button></TableCell>
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
                                    isDisabled={false}
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