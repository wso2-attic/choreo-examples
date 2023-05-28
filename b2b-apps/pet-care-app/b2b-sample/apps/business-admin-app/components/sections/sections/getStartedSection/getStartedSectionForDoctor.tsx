/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import { Grid } from "@mui/material";
import { getDoctors } from "apps/business-admin-app/APICalls/getDoctors/get-doctors";
import { Doctor } from "apps/business-admin-app/types/doctor";
import Chart from "chart.js/auto";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Stack, useToaster } from "rsuite";
import styles from "../../../../styles/Home.module.css";

interface GetStartedSectionComponentForDoctorProps {
    session: Session
}

/**
 * 
 * @param prop - session
 * 
 * @returns The idp interface section.
 */
export default function GetStartedSectionComponentForDoctor(props: GetStartedSectionComponentForDoctorProps) {

    const { session } = props;
    const [ doctorList, setDoctorList ] = useState<Doctor[] | null>(null);
    const [ isAddDoctorOpen, setIsAddDoctorOpen ] = useState(false);
    const [ isDoctorOverviewOpen, setIsDoctorOverviewOpen ] = useState(false);
    const [ doctor, setDoctor ] = useState<Doctor | null>(null);
    const [ isDoctorEditOpen, setIsDoctorEditOpen ] = useState(false);
    const router = useRouter();

    const DonutChart: React.FC = () => {
        const chartRef = useRef<HTMLCanvasElement>(null);
      
        useEffect(() => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext("2d");
      
                if (ctx) {
                    new Chart(ctx, {
                        type: "doughnut",
                        data: {
                            labels: [ "Confirmed", "Completed" ],
                            datasets: [
                                {
                                    data: [ 40, 30 ],
                                    backgroundColor: [ "blue", "green" ]
                                }
                            ]
                        }
                    });
                }
            }
        }, []);
      
        return <canvas ref={ chartRef } />;
    };

    const LineChart: React.FC = () => {
        const chartRef = useRef<HTMLCanvasElement>(null);
      
        useEffect(() => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext("2d");
      
                if (ctx) {
                    new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: [ "Day 1", "Day 2", "Day 3", "Day 4", "Day 5" ], // Replace with your actual labels
                            datasets: [
                                {
                                    label: "Confirmed",
                                    data: [ 10, 8, 12, 15, 11 ], // Replace with your actual confirmed bookings data
                                    borderColor: "blue",
                                    fill: false
                                },
                                {
                                    label: "Completed",
                                    data: [ 8, 6, 10, 13, 9 ], // Replace with your actual completed bookings data
                                    borderColor: "green",
                                    fill: false
                                }
                            ]
                        },
                        options: {
                            responsive: true
                        }
                    });
                }
            }
        }, []);
      
        return <canvas ref={ chartRef } />;
    };
      


    return (
        <div
            className={ styles.tableMainPanelDivDoc }
        >
            <Stack
                direction="row"
                justifyContent="space-between">
                <Stack direction="column" alignItems="flex-start">
                    <h2>{ "Dashbord" }</h2>
                    <p>{ "Dashbord for doctor" }</p>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between">
                <div className={ styles.chartDivForDoc }>
                    <div className={ styles.bookingSummaryHeader }>
                        Booking Summary
                    </div>
                    <div className={ styles.chartForBookingSummary }>
                        <div id="chartContainer">
                            <DonutChart />
                        </div>
                    </div>
                    <div className={ styles.totalBookingsHeader }>
                        70 Total Bookings
                    </div>
                </div>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between">
                <div className={ styles.dailyChartDivForDoc }>
                    <div className={ styles.dailyBookingSummaryHeader }>
                        Daily Bookings
                    </div>
                    <div id="lineChartContainer" className={ styles.dailiBookingsChart }>
                        <LineChart />
                    </div>
                </div>
            </Stack>
        </div>
    );
}
