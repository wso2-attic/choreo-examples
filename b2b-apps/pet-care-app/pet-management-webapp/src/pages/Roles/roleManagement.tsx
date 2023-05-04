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

import { Avatar, Grid, IconButton, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import "./roles.css";
import EditIcon from '@mui/icons-material/Edit';
import CreateRole from './createRole';
// import { Avatar } from 'rsuite';

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const RoleManagementPage: FunctionComponent = (): ReactElement => {
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const title = "Org Creator";


    return (
        <>
            <NavBar isBlur={isAddRoleOpen} />
            <div className={isAddRoleOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Role Management
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Manage organization roles here.
                    </label>
                </div>
                <div>
                    <button className="create-role-btn" onClick={() => setIsAddRoleOpen(true)} >
                        Create Role
                    </button>
                </div>
                <div className="role-table-div">
                    <Table aria-label="users table" style={{ width: "72vw", backgroundColor: 'white', borderRadius: '1vh' }}>
                        <TableBody>
                            <TableRow className="table-row">
                                <TableCell align="left" style={{ fontSize: "2.5vh", width: '0vw' }}>
                                    <Avatar variant="circular" style={{ backgroundColor: '#4e40ed' }}>
                                        A
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>Administrator
                                    <IconButton className="edit-icon" onClick={() => setIsEditRoleOpen(true)}>
                                        <EditIcon style={{ fontSize: '4vh' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow className="table-row">
                                <TableCell align="left" style={{ fontSize: "2.5vh", width: '0vw' }}>
                                    <Avatar variant="circular" style={{ backgroundColor: '#4e40ed' }}>
                                        O
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left" style={{ fontSize: "2.5vh", color: '#6d7273' }}>
                                    Org Creator
                                    <IconButton className="edit-icon" onClick={() => setIsEditRoleOpen(true)}>
                                        <EditIcon style={{ fontSize: '4vh' }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <CreateRole isOpen={isAddRoleOpen} setIsOpen={setIsAddRoleOpen} />
                </div>
            </div>
        </>
    );
};