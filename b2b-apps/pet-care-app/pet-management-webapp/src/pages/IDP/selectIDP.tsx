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
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import "./idp.css";
import { Template } from "./idp";
import { Avatar, IconButton } from '@mui/material';
import GoogleIcon from '../../images/google-icon.png'
import EnterpriseIcon from '../../images/enterprise-icon.png'
import CancelIcon from '@mui/icons-material/Cancel';
import AddEnterpriseIDPIDP from "./addEnterpriseIDP";
import AddEnterpriseIDP from "./addEnterpriseIDP";
import AddGoogleIDP from "./addGoogleIDP";

interface SelectIdpProps {
    isSelectIdpOpen: boolean;
    setIsSelectIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAddEnterpriseIdpOpen: boolean;
    setIsAddEnterpriseIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAddGoogleIdpOpen: boolean;
    setIsAddGoogleIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectIDP(props: SelectIdpProps) {
    const { isSelectIdpOpen,
        setIsSelectIdpOpen,
        isAddEnterpriseIdpOpen,
        setIsAddEnterpriseIdpOpen,
        isAddGoogleIdpOpen,
        setIsAddGoogleIdpOpen
    } = props;

    const templates: Template[] = [
        {
            name: "Enterprise",
            description: "Enterprise login via standard OIDC protocol",
            icon: EnterpriseIcon
        },
        {
            name: "Google",
            description: "Login users with existing Google accounts",
            icon: GoogleIcon
        },
    ];

    const handleTemplateSelect = (template: Template) => {
        if (template.name === "Enterprise") {
            setIsAddEnterpriseIdpOpen(true);
        } else if (template.name === "Google") {
            setIsAddGoogleIdpOpen(true);
        }
        setIsSelectIdpOpen(false);
    }

    return (
        <>
            <Transition appear show={isSelectIdpOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="select-idp-div"
                    onClose={() => setIsSelectIdpOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div />
                    </Transition.Child>
                    <div className="align-title">
                        <Dialog.Panel>
                            <Dialog.Title
                                as="h4" className="select-idp-title-div">
                                {"Select Identity Provider"}
                                <br />
                                <label className="sub-title-label">
                                    Choose one of the following Identity Providers.
                                </label>
                            </Dialog.Title>
                            <div className="idp-list-div">
                                {templates.map((template) => {
                                    return (
                                        <div
                                            key={template.name}
                                            className={"idp-list-item"}
                                            onClick={() => handleTemplateSelect(template)}
                                        >
                                            <div>
                                                <label className="template-name">{template.name}</label>
                                                <br />
                                                <label className="template-desciption">{template.description}</label>
                                            </div>
                                            <div className="avatar-icon">
                                                <Avatar alt="icon" src={template.icon} variant="square" style={{ width: "6vh", height: "6vh" }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="close-icon">
                                <IconButton onClick={() => setIsSelectIdpOpen(false)}>
                                    <CancelIcon style={{ fontSize: "4vh", color: "#d1d1d1" }} />
                                </IconButton>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
            <div>
                <AddEnterpriseIDP isAddEnterpriseIdpOpen={isAddEnterpriseIdpOpen} setIsAddEnterpriseIdpOpen={setIsAddEnterpriseIdpOpen} />
            </div>
            <div>
                <AddGoogleIDP isAddGoogleIdpOpen={isAddGoogleIdpOpen} setIsAddGoogleIdpOpen={setIsAddGoogleIdpOpen}/>
            </div>
        </>
    );
}