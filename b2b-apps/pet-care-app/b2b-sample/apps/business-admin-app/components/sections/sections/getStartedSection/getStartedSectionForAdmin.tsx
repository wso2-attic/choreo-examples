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

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid } from "@mui/material";
import { getDoctors } from "apps/business-admin-app/APICalls/getDoctors/get-doctors";
import { Doctor } from "apps/business-admin-app/types/doctor";
import { registerables } from "chart.js";
import Chart from "chart.js/auto";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Stack, useToaster } from "rsuite";
import styles from "../../../../styles/Home.module.css";

interface GetStartedSectionComponentForAdminProps {
    session: Session
}

/**
 * 
 * @param prop - session
 * 
 * @returns The idp interface section.
 */
export default function GetStartedSectionComponentForAdmin(props: GetStartedSectionComponentForAdminProps) {

    const { session } = props;
    const [ doctorList, setDoctorList ] = useState<Doctor[] | null>(null);
    const [ isAddDoctorOpen, setIsAddDoctorOpen ] = useState(false);
    const [ isDoctorOverviewOpen, setIsDoctorOverviewOpen ] = useState(false);
    const [ doctor, setDoctor ] = useState<Doctor | null>(null);
    const [ isDoctorEditOpen, setIsDoctorEditOpen ] = useState(false);
    const typesToFilter: string[] = [ "cardiology", "neurology", "oncology", "nutrition" ];
    const [ filteredCount, setFilteredCount ] = useState<{ [key: string]: number }>({});
    const router = useRouter();
    const [ labels, setLabels ] = useState<string[]>([]); 
    const [ data, setdata ] = useState<number[]>([]);

    async function getDoctorList() {
        const accessToken = session.accessToken;

        getDoctors(accessToken)
            .then((res) => {
                if (res.data instanceof Array) {
                    setDoctorList(res.data);
                    setFilteredCount(filterAndCountDoctorsBySpecialty(res.data, typesToFilter));
                    const bookingCounts = getBookingCountsPerDay(res.data);

                    bookingCounts.forEach((count, date) => {
                        labels.push(date);
                        data.push(count);
                    });
                }
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.log(e);
            });
    }

    useEffect(() => {
        getDoctorList();
    }, [ session ]);

    const DonutChart: React.FC = () => {
        const chartRef = useRef<HTMLCanvasElement>(null);
      
        useEffect(() => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext("2d");
      
                if (ctx) {
                    new Chart(ctx, {
                        type: "doughnut",
                        data: {
                            labels: [ "Cardiology", "Neurology", "Oncology", "Nutrition", "Other" ],
                            datasets: [
                                {
                                    data: [ filteredCount["cardiology"], 
                                        filteredCount["neurology"], 
                                        filteredCount["oncology"], 
                                        filteredCount["nutrition"],
                                        doctorList?.length - (filteredCount["cardiology"]+ 
                                        filteredCount["neurology"] + 
                                        filteredCount["oncology"] + 
                                        filteredCount["nutrition"])

                                    ],
                                    backgroundColor: [ "#4e40ed", "#4e5ded", "#4e7eed", "#4e9bed", "#77b0ed" ]
                                }
                            ]
                        },
                        options: {
                            plugins: {
                                legend: {
                                    position: "right", // Adjust the legend position to 'right'
                                    align: "center" // Align the legend items to the end of the container
                                }
                            }
                        }
                    });
                }
            }
        }, []);
      
        return <canvas ref={ chartRef } />;
    };

    const BarChart: React.FC = () => {
        const chartRef = useRef<HTMLCanvasElement>(null);
      
        useEffect(() => {
            if (chartRef.current) {
                const ctx = chartRef.current.getContext("2d");
      
                if (ctx) {
                    new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: "Booking Count",
                                    data: data,
                                    backgroundColor: 
                                    [ "#4e7eed" ]
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0 
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }, []);
      
        return <canvas ref={ chartRef }></canvas>;
    };
      


    return (
        <div
            className={ styles.tableMainPanelDivDoc }
        >
            <div className={ styles.welcomeMainDiv }>
                <AccountCircleIcon style={ { width: "8vh", height: "8vh" } }/>
                <div className={ styles. welcomeDiv }>
                    { "Welcome, " + session.user?.name.givenName + " " + session.user?.name.familyName + "!" }
                </div>
                <div className={ styles.tagLine }>
                    { "Taking Veterinary Care to the Next Level of Excellence" }
                </div>

            </div>
            <Stack
                direction="row"
                justifyContent="space-between">
                <div className={ styles.chartDivForDoc }>
                    <div className={ styles.bookingSummaryHeader }>
                        Doctor Specialty Summary
                    </div>
                    <div className={ styles.chartForBookingSummary }>
                        <div id="chartContainer">
                            <DonutChart />
                        </div>
                    </div>
                    <div className={ styles.totalBookingCountHeader }>
                        { doctorList? doctorList.length:0 }
                    </div>
                    <div className={ styles.totalBookingHeader } >
                        Total Doctors
                    </div>
                </div>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between">
                <div className={ styles.dailyChartDivForDoc }>
                    <div className={ styles.dailyBookingSummaryHeader }>
                        Bookings Count Per Day
                    </div>
                    <div id="lineChartContainer" className={ styles.dailiBookingsChart }>
                        <BarChart />
                    </div>
                </div>
            </Stack>
        </div>
    );
}

function filterAndCountDoctorsBySpecialty(doctors: Doctor[], types: string[]): { [key: string]: number } {
    const filteredCounts: { [key: string]: number } = {};
  
    types.forEach((type) => {
        const filteredBookings = doctors.filter((doctor) => doctor.specialty.toLowerCase() === type);

        filteredCounts[type] = filteredBookings.length;
    });
  
    return filteredCounts;
}

const getBookingCountsPerDay = (doctors: Doctor[]): Map<string, number> => {
    const bookingCountsPerDay = new Map<string, number>();
  
    doctors.forEach((doctor) => {
        doctor.availability.forEach((availability) => {
            availability.timeSlots.forEach((timeSlot) => {
                const bookingCount = timeSlot.availableBookingCount;
                const date = availability.date;
  
                if (bookingCountsPerDay.has(date)) {
                    const currentCount = bookingCountsPerDay.get(date);

                    bookingCountsPerDay.set(date, currentCount + bookingCount);
                } else {
                    bookingCountsPerDay.set(date, bookingCount);
                }
            });
        });
    });
  
    return bookingCountsPerDay;
};
