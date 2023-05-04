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

import { Field, Form } from "react-final-form";
import FormSuite from "rsuite/Form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import React from "react";
import { FormApi, AnyObject } from "final-form";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Tab } from "@headlessui/react";

export default function UserSelection() {
    return (
        <div className="user-add-main-div">
            <div className="add-user-div-in-role-creation">
                <Table aria-label="simple table" style={{ width: "30vw"}}>
                    <TableHead >
                        <TableRow >
                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell align="center" style={{ fontSize: "1.7vh", fontWeight: "bold" }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell align="center" style={{ fontSize: "1.7vh", padding: 1, width: '0vw' }}><Checkbox color="primary" disabled={false} checked={true} /></TableCell>
                            <TableCell align="left" style={{ fontSize: "1.7vh", padding: 1 }}>Shalki</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );

}