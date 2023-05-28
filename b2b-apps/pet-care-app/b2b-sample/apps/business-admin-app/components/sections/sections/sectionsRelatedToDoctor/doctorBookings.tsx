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
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getDoctorBookings } from "apps/business-admin-app/APICalls/GetDoctorBookings/get-doc-bookings";
import { getProfile } from "apps/business-admin-app/APICalls/GetProfileInfo/me";
import { Booking } from "apps/business-admin-app/types/booking";
import { Doctor } from "apps/business-admin-app/types/doctor";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack } from "rsuite";
import styles from "../../../../styles/doctor.module.css";
import BookingCard from "../sectionsRelatedToBookings/bookingCard";

interface DoctorBookingsSectionProps {
    session: Session
}

/**
 * 
 * @param prop - session
 * 
 * @returns The doctor bookings section.
 */
export default function DoctorBookingsSection(props: DoctorBookingsSectionProps) {

    const { session } = props;
    const [ isBookingOverviewOpen, setIsBookingOverviewOpen ] = useState(false);
    const [ bookingList, setBookingList ] = useState<Booking[] | null>(null);
    const [ filteredBookingList, setFilteredBookingList ] = useState<Booking[] | null>(null);
    const [ booking, setBooking ] = useState<Booking | null>(null);
    const[ doctor, setDoctor ] = useState<Doctor | null>(null);
    const router = useRouter();
    const [ bookingDate, setBookingDate ] = useState("Today");
    
    async function getBookings() {
        const accessToken = session?.accessToken;

        getProfile(accessToken)
            .then(async (res) => {
                if (res.data) {
                    setDoctor(res.data);
                }
                const response = await getDoctorBookings(accessToken, res.data.id);

                if (response.data instanceof Array) {
                    setBookingList(response.data);
                }
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.log(e);
            });
    }

    useEffect(() => {
        getBookings();
    }, [ session ]);

    const handleClick = (booking:Booking) => {
        router.push({
            pathname: "/bookingDetails",
            query: { 
                appointmentNumber: booking.appointmentNumber,
                date: booking.date,
                doctorId: booking.doctorId,
                emailAddress: booking.emailAddress,
                id: booking.id,
                mobileNumber: booking.mobileNumber,
                petId: booking.petId, 
                petOwnerName: booking.petOwnerName,
                sessionEndTime: booking.sessionEndTime,
                sessionStartTime: booking.sessionStartTime,
                status: booking.status,
                token: session?.accessToken
            }
        });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setBookingDate(event.target.value as string);
        const filteredBookings = filterBookings(event.target.value as string, bookingList);
        setFilteredBookingList(filteredBookings);
    };

    return (
        <div
            className={ styles.tableMainPanelDivDoc }
        >
            <Stack
                direction="row"
                justifyContent="space-between">
                <Stack direction="column" alignItems="flex-start">
                    <h2>{ "Bookings" }</h2>
                    <p>{ "Available Bookings for the doctor" }</p>
                </Stack>
            </Stack>
            <Box sx={ { minWidth: 120 } }>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter Bookings</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ bookingDate }
                        label="Filter Bookings"
                        onChange={ handleChange }
                    >
                        <MenuItem value={ "Previous" }>Previous</MenuItem>
                        <MenuItem value={ "Today" }>Today</MenuItem>
                        <MenuItem value={ "Upcoming" }>Upcoming</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <div>
                <Grid container spacing={ 2 }>
                    { filteredBookingList && filteredBookingList.map((booking) => ( 
                        <Grid
                            item
                            xs={ 4 }
                            sm={ 4 }
                            md={ 4 }
                            key={ booking.id }
                            onClick={ () => { 
                                setIsBookingOverviewOpen(true); 
                                setBooking(booking); 
                                handleClick(booking);} }>
                            <BookingCard booking={ booking } isBookingCardOpen={ isBookingOverviewOpen } />
                        </Grid>
                    )) }
                </Grid>
            </div>

        </div>
    );
}

function filterBookings(option: string, bookings: Booking[]): Booking[] {
    const today = new Date();
    let filteredBookings: Booking[] = [];
  
    switch (option) {
        case "Today":
            filteredBookings = bookings.filter((booking) => {
                const providedDate = new Date(booking.date);

                return isSameDate(providedDate, today);
            });

            break;
        case "Previous":
            filteredBookings = bookings.filter((booking) => {
                const providedDate = new Date(booking.date);

                return providedDate < today;
            });

            break;
        case "Upcoming":
            filteredBookings = bookings.filter((booking) => {
                const providedDate = new Date(booking.date);

                return providedDate > today;
            });

            break;
        default:
            filteredBookings = bookings;

            break;
    }
  
    return filteredBookings;
}
  
function isSameDate(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
}
  
