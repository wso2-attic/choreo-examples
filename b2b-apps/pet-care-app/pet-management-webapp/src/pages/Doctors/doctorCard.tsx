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
import React from "react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function DoctorCard() {
    return (
        <>
            <Card className="doctor-card">
                <CardContent>
                    <div className="doctor-icon">
                        <LocalHospitalIcon style={{ width: "6vh", height: "6vh", padding: "0.5vh", color: "#4e40ed"  }} />
                    </div>
                    <div className="doctor-summary">
                        <label className="doc-title-in-card">Dr.Tom</label>
                        <br/>
                        <label className="doc-summary-in-card">2 bookings</label>
                        <br/>
                        <label className="doc-summary-in-card">2 dogs/10 spaces</label>
                    </div>

                </CardContent>
            </Card>
        </>
    );

}

export default React.memo(DoctorCard);