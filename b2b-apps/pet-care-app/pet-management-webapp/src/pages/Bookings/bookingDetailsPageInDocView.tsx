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

import { BasicUserInfo, Hooks, useAuthContext } from "@asgardeo/auth-react";
import { Checkbox, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import { Booking, BookingInfo } from "./booking";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MedicalReport, Pet } from "../../types/pet";
import { getPet } from "../../components/GetPet/get-pet";
import { getThumbnail } from "../../components/GetThumbnail/get-thumbnail";
import PET_IMAGE from "../../images/thumbnail.png";
import { getMedicalReport } from "../../components/GetMedicalReports/get-medical-reports";
import AddMedicalReport from "../MedicalReport/addMedicalReport";
import { updateBooking } from "../../components/UpdateBooking/put-booking";

export const BookingDetailsInDoctorView: FunctionComponent = (): ReactElement => {
    const [isBookingOverviewOpen, setIsBookingOverviewOpen] = useState(false);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [pet, setPet] = useState<Pet | null>(null);
    const location = useLocation();
    const bookingInfo = location.state;
    const { getAccessToken } = useAuthContext();
    const [url, setUrl] = useState("");
    const [medicalReportList, setMedicalReportList] = useState<MedicalReport[] | null>(null);
    const [isAddMedicalReportOpen, setIsAddMedicalReportOpen] = useState(false);

    async function getPetInfo() {
        const accessToken = await getAccessToken();
        getPet(accessToken, bookingInfo.petId)
            .then(async (res) => {
                if (res.data) {
                    setPet(res.data);
                    const response = await getThumbnail(accessToken, res.data.id);
                    if (response.data.size > 0) {
                        const imageUrl = URL.createObjectURL(response.data);
                        setUrl(imageUrl);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async function getMedicalReportInfo() {
        const accessToken = await getAccessToken();
        getMedicalReport(accessToken, bookingInfo.petId)
            .then(async (res) => {
                if (res.data instanceof Array) {
                    setMedicalReportList(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    useEffect(() => {
        getPetInfo();
        getMedicalReportInfo();
    }, [location.pathname === "/booking_details", isAddMedicalReportOpen]);

    const handleComplete = async () => {
        async function updateBookingInfo() {
            const accessToken = await getAccessToken();
            const payload: BookingInfo = {
                appointmentNumber: bookingInfo.appointmentNumber,
                date: bookingInfo.date,
                doctorId: bookingInfo.doctorId,
                mobileNumber: bookingInfo.mobileNumber,
                petDoB: bookingInfo.petDoB,
                petId: bookingInfo.petId,
                petName: bookingInfo.petName,
                petOwnerName: bookingInfo.petOwnerName,
                petType: bookingInfo.petType,
                sessionEndTime: bookingInfo.sessionEndTime,
                sessionStartTime: bookingInfo.sessionStartTime,
                status: "Completed",
            };
            const response = await updateBooking(accessToken, bookingInfo.id, payload);
        }
        updateBookingInfo();
        await timeout(1000);
    }

    return (
        <>
            <div className={isAddMedicalReportOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Booking Details
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Detailed information of your booking
                    </label>
                </div>
                <div className="booking-info-div">
                    <div className="booking-info-div-header">
                        Booking Details
                    </div>
                    <div className="boking-detail-grid-item-info">
                        {bookingInfo && (
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Appointment No</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Date</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Mobile Number</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Email Address</p>
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
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">{bookingInfo.appointmentNumber}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.date}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.mobileNumber}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.emailAddress}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.sessionStartTime}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{bookingInfo.sessionEndTime}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p
                                            className={bookingInfo?.status === "Completed" ? "doc-overview-font-sec" : "doc-overview-font"}>
                                            {bookingInfo.status}
                                        </p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </div>
                </div>
                <div className="pet-info-div">
                    <div className="pet-info-header">
                        Pet Details
                    </div>
                    <div className="pet-image-in-booking-details">
                        {url ? (<img
                            style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                            src={url}
                            alt="pet-image"
                        />) : (
                            <img
                                style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                src={PET_IMAGE}
                                alt="pet-image"
                            />
                        )}
                    </div>
                    <div className="pet-info-basic-details">
                        {pet && (
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6} md={6} key={"item.headers"}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Name</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Breed</p>
                                    </Typography>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">Date of Birth</p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} key={"item.info"}>
                                    <Typography className="typography-style">
                                        <p className="doc-overview-font">{pet.name}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{pet.breed}</p>
                                    </Typography>
                                    <Typography className="typography-style-doc-overview">
                                        <p className="doc-overview-font">{pet.dateOfBirth}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}

                    </div>
                </div>
                <div className="vacc-info-div-header">
                    Vaccination Details
                </div>
                <div className="vacc-info-div">
                    {pet && pet.vaccinations && pet.vaccinations.length > 0 ? (
                        <div className="vaccine-info-box-in-booking-detail">
                            <div >
                                <Table aria-label="simple table" style={{ width: "43vw" }}>
                                    <TableHead >
                                        <TableRow >
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Vaccine Name</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Last vaccination Date</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Next Vaccination Date</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Enable Alerts</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pet.vaccinations.map((vaccine) => (
                                            <TableRow key={vaccine.name}>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.name}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.lastVaccinationDate}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{vaccine.nextVaccinationDate}</TableCell>
                                                <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}><Checkbox color="primary" disabled={true} checked={vaccine.enableAlerts} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className="no-vacc-details-label">
                            <label className="no-detail-label">The vaccination details are currently unavailable.</label>
                        </div>
                    )}
                </div>
                <div className="medical-report-div-header">
                    Medical Reports
                </div>
                <div className="medical-report-div">
                    {medicalReportList && medicalReportList.length > 0 ? (
                        <div className="vaccine-info-box-in-booking-detail">
                            <div >
                                <Table aria-label="simple table" style={{ width: "43vw" }}>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Diagnosis</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Treatment</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Drug Name</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Dosage</TableCell>
                                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Duration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {medicalReportList.map((report) => (
                                            <TableRow key={report.diagnosis}>
                                                {report.medications.map((medicine) => (
                                                    <>
                                                        <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{report.diagnosis}</TableCell>
                                                        <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{report.treatment}</TableCell>
                                                        <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{medicine.drugName}</TableCell>
                                                        <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{medicine.dosage}</TableCell>
                                                        <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1 }}>{medicine.duration}</TableCell>
                                                    </>

                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    ) : (
                        <div className="no-medical-reports-label">
                            The medical reports are currently unavailable.
                        </div>
                    )}
                </div>
                <div className="complete-booking-div">
                    <Link to="/doctor_bookings" style={{ textDecoration: 'none' }}>
                        <button className="complete-booking-btn"
                            onClick={handleComplete}>
                            Complete this booking
                        </button>
                    </Link>
                </div>
                <div className="medical-report-bottom-block"></div>
                <div className="add-medical-report-btn-div">
                    <button className="add-report-btn" onClick={() => { setIsAddMedicalReportOpen(true) }}>
                        {"+ Add"}
                    </button>
                </div>
            </div>
            <Link to="/doctor_bookings" style={{ textDecoration: 'none' }}>
                <button className="back-btn">
                    {"< Back"}
                </button>
            </Link>
            <div>
                <AddMedicalReport
                    isOpen={isAddMedicalReportOpen}
                    setIsOpen={setIsAddMedicalReportOpen}
                    petId={pet?.id}
                />
            </div>
        </>
    );
};