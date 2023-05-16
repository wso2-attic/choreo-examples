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

import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import { default as authConfig } from "./config.json";
import { ErrorBoundary } from "./error-boundary";
import { HomePage, NotFoundPage } from "./pages";
import { HomePageForAdmin } from "./pages/homePageForAdmin";
import { ManageUsersPage } from "./pages/Users/manageUsers";
import { RoleManagementPage } from "./pages/Roles/roleManagement";
import { IdentityProvidersPage } from "./pages/IDP/identityProviders";
import { ManageDoctorsPage } from "./pages/Doctors/manageDoctors";
import { HomePageForDoctor } from "./pages/homePageForDoctor";
import { DoctorProfilePage } from "./pages/Doctors/doctorProfile";
import { BookingsInDoctorView } from "./pages/Bookings/bookingsInDocView";
import { HomePageForUser } from "./pages/homePageForUser";
import { ManagePetsPage } from "./pages/Pets/petsPage";
import { BookingsInPetOwnerView } from "./pages/Bookings/bookingInPetOwnerView";
import { BookingDetailsInDoctorView } from "./pages/Bookings/bookingDetailsPageInDocView";

const AppContent: FunctionComponent = (): ReactElement => {
    const { error } = useAuthContext();

    return (
        <ErrorBoundary error={error}>
            <Router>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/admin_home" element={ <HomePageForAdmin /> } />
                <Route path="/doctor_home" element={ <HomePageForDoctor /> } />
                <Route path="/user_home" element={ <HomePageForUser /> } />
                <Route path="/manage_users" element={ <ManageUsersPage /> } />
                <Route path="/role_management" element={ <RoleManagementPage /> } />
                <Route path="/identity_providers" element={ <IdentityProvidersPage /> } />
                <Route path="/manage_doctors" element={ <ManageDoctorsPage /> } />
                <Route path="/doctor_profile" element={ <DoctorProfilePage /> } />
                <Route path="/doctor_bookings" element={ <BookingsInDoctorView /> } />
                <Route path="/user_pets" element={ <ManagePetsPage /> } />
                <Route path="/user_bookings" element={ <BookingsInPetOwnerView /> } />
                <Route path="/booking_details" element={ <BookingDetailsInDoctorView /> } />
                <Route element={ <NotFoundPage /> } />
            </Routes>
        </Router>
        </ErrorBoundary>
    )
};

const App = () => (
    <AuthProvider config={authConfig}>
        <AppContent />
    </AuthProvider>
);

render((<App />), document.getElementById("root"));
