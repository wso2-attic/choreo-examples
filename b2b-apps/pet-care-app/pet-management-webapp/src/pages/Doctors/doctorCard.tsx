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

import { Card, CardContent } from "@mui/material";
import React, { useEffect } from "react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Doctor } from "../../types/doctor";
import { getDocThumbnail } from "../../components/GetDocThumbnail/get-doc-thumbnail";
import { useAuthContext } from "@asgardeo/auth-react";
import male_doc_thumbnail from "../../images/male-doc-thumbnail.png";
import female_doc_thumbnail from "../../images/female-doc-thumbnail.png";

interface DoctorCardProps {
    doctor: Doctor;
    isDoctorEditOpen: boolean;
}

function DoctorCard(props: DoctorCardProps) {
    const { doctor, isDoctorEditOpen } = props;
    const [url, setUrl] = React.useState("");
    const { getAccessToken } = useAuthContext();

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
    }, [location.pathname === "/manage_doctors", isDoctorEditOpen]);

    return (
        <>
            <Card className="doctor-card">
                <CardContent>
                    <div className="doctor-icon">
                        {url ? (<img
                            style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                            src={url}
                            alt="doc-image"
                        />) : (
                            <img
                                style={{ width: "100%", height: "100%", borderRadius: "10%" }}
                                src={doctor.gender.toLowerCase() === 'male' ? male_doc_thumbnail : female_doc_thumbnail}
                                alt="doc-image"
                            />
                        )}
                    </div>
                    <div className="doctor-summary">
                        <label className="doc-title-in-card">{doctor.name}</label>
                        <br />
                        <label className="doc-summary-in-card">{doctor.specialty}</label>
                        <br />
                        {doctor.availability.length > 0 && (
                            <label className="doc-summary-in-card">{doctor.availability[0].date}</label>
                        )}
                    </div>

                </CardContent>
            </Card>
        </>
    );

}

export default React.memo(DoctorCard);