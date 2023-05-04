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

import React, { useState } from "react";
import FormSuite from "rsuite/Form";
import orgRolesData from "./orgRolesData.json";
import { FormApi, AnyObject } from "final-form";
import treeData from "./orgRolesData.json"
import CheckTree from 'rsuite/CheckTree';


export default function PermissionSelection() {
    const [checkedValues, setCheckedValues] = useState([]);
    const handleCheckTreeChange = (checkedValues: any) => {
        setCheckedValues(checkedValues);
    };


    return (
        <>
            <div className="permission-main-div">
                <CheckTree
                    data={treeData}
                    value={checkedValues}
                    onChange={handleCheckTreeChange}
                    // defaultValue={["/permission/admin/manage/identity/userstore"]}
                    showIndentLine
                    // defaultExpandAll={false}
                    defaultExpandItemValues={["/permission"]}
                    // disabledItemValues={["/permission"]}
                    // expandItemValues={["/permission/admin/manage/identity/userstore"]}
                />
                
            </div>
        </>
    );
}