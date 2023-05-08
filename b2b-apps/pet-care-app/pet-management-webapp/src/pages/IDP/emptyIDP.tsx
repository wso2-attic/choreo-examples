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
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import "./idp.css"
import SelectIDP from "./selectIDP";

interface EmptyIdpProps {
    isSelectIdpOpen: boolean;
    setIsSelectIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAddEnterpriseIdpOpen: boolean;
    setIsAddEnterpriseIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAddGoogleIdpOpen: boolean;
    setIsAddGoogleIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function emptyIDP(props: EmptyIdpProps) {
    const {isSelectIdpOpen, 
        setIsSelectIdpOpen, 
        isAddEnterpriseIdpOpen, 
        setIsAddEnterpriseIdpOpen,
        isAddGoogleIdpOpen,
        setIsAddGoogleIdpOpen
    } = props;
    
    return (
        <div>
            <div className="fingerprint-icon">
                <FingerprintIcon style={{ width: "15vw", height: "15vw", color: "#6b6e6e" }} />
                <p className="no-idp-description">
                There are no identity providers available at the moment.
                </p>
                <button className="create-idp-btn" onClick={() => {setIsSelectIdpOpen(true)}}>
                   Add Identity Provider 
                </button>
            </div>
            <SelectIDP 
            isSelectIdpOpen={isSelectIdpOpen} 
            setIsSelectIdpOpen={setIsSelectIdpOpen}
            isAddEnterpriseIdpOpen={isAddEnterpriseIdpOpen}
            setIsAddEnterpriseIdpOpen={setIsAddEnterpriseIdpOpen}
            isAddGoogleIdpOpen={isAddGoogleIdpOpen}
            setIsAddGoogleIdpOpen={setIsAddGoogleIdpOpen}
            />
        </div>
    );
}