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
import { Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import { default as authConfig } from "../config.json";
import LOGO_IMAGE from "../images/pet_care_logo.png";
import DOG_IMAGE from "../images/dog_image.png";
import CAT_IMAGE from "../images/cat.png";
import RABBIT_IMAGE from "../images/rabbit.png";
import COVER_IMAGE from "../images/nav-image.png";
import { DefaultLayout } from "../layouts/default";
import { AuthenticationResponse } from "../components";
import { useLocation } from "react-router-dom";
import { LogoutRequestDenied } from "../components/LogoutRequestDenied";
import { USER_DENIED_LOGOUT } from "../constants/errors";
import { Pet, PetInfo } from "../types/pet";
import AddPet from "./Pets/addPets";
import PetOverview from "./Pets/petOverview";
import PetCard from "./Pets/PetCard";
import { getPets } from "../components/getPetList/get-pets";
import MenuListComposition from "../components/UserMenu";
import NavBar from "../components/navBar";
import AddUsers from "./Users/addUsers";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TrendingUpRounded } from "@mui/icons-material";
import EditUser from "./Users/editUser";
import './Users/users.css';

interface DerivedState {
    authenticateResponse: BasicUserInfo,
    idToken: string[],
    decodedIdTokenHeader: string,
    decodedIDTokenPayload: Record<string, string | number | boolean>;
}

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const ManageUsersPage: FunctionComponent = (): ReactElement => {

    const {
        state,
        signIn,
        signOut,
        getBasicUserInfo,
        getIDToken,
        getDecodedIDToken,
        on
    } = useAuthContext();

    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);


    useEffect(() => {

        if (!state?.isAuthenticated) {
            return;
        }

        (async (): Promise<void> => {
            const basicUserInfo = await getBasicUserInfo();
            setUser(basicUserInfo);
        })();
    }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken]);


    return (
        <>
            <NavBar isBlur={isAddUserOpen || isEditUserOpen} />
            <div className={isAddUserOpen || isEditUserOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Manage Users
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Manage users in the organization
                    </label>
                </div>
                <div>
                    <button className="add-user-btn" onClick={() => setIsAddUserOpen(true)}>
                        Add user
                    </button>
                </div>
                <div className="users-table-div">
                    <Table aria-label="users table" style={{ width: "72vw", backgroundColor: 'white', borderRadius: '1vh' }}>
                        <TableHead>
                            <TableRow >
                                <TableCell align="left" style={{ fontSize: "2.5vh", fontWeight: "bold" }}>User</TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", fontWeight: "bold" }}>Managed By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className="table-row">
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Shalki</TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Google
                                    <IconButton className="edit-icon-users" onClick={() => setIsEditUserOpen(true)}>
                                        <EditIcon style={{fontSize:'4vh'}} />
                                    </IconButton>
                                    <IconButton className="delete-icon">
                                        <DeleteIcon style={{fontSize:'4vh'}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow className="table-row">
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Wenushika</TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Google
                                    <IconButton className="edit-icon-users" onClick={() => setIsEditUserOpen(true)}>
                                        <EditIcon style={{fontSize:'4vh'}} />
                                    </IconButton>
                                    <IconButton className="delete-icon">
                                        <DeleteIcon style={{fontSize:'4vh'}} />
                                    </IconButton></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div >
            <div>
                <AddUsers isOpen={isAddUserOpen} setIsOpen={setIsAddUserOpen} />
            </div>
            <div>
                <EditUser isOpen={isEditUserOpen} setIsOpen={setIsEditUserOpen} />
            </div>

        </>
    );
};