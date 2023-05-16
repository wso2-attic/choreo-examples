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

import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import AddUsers from "./addUsers";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUser from "./editUser";
import './users.css';
import { getUsers } from "../../components/GetUsers/get-user";

export const ManageUsersPage: FunctionComponent = (): ReactElement => {
    const { getAccessToken, getIDToken } = useAuthContext();
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [isEditUserOpen, setIsEditUserOpen] = useState(false);
    const [userList, setUserList] = useState(null);


    async function getUserList() {
        const accessToken = await getAccessToken();
        getUsers(accessToken)
            .then((res) => {
                if (res.data instanceof Array) {
                    setUserList(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getUserList();
    }, [location.pathname === "/manage_users"]);


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
                                        <EditIcon style={{ fontSize: '4vh' }} />
                                    </IconButton>
                                    <IconButton className="delete-icon">
                                        <DeleteIcon style={{ fontSize: '4vh' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow className="table-row">
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Wenushika</TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Google
                                    <IconButton className="edit-icon-users" onClick={() => setIsEditUserOpen(true)}>
                                        <EditIcon style={{ fontSize: '4vh' }} />
                                    </IconButton>
                                    <IconButton className="delete-icon">
                                        <DeleteIcon style={{ fontSize: '4vh' }} />
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