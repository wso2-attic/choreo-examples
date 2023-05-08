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

interface AddEnterpriseIdpProps {
    isAddGoogleIdpOpen: boolean;
    setIsAddGoogleIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddGoogleIDP(props: AddEnterpriseIdpProps) {
    const { isAddGoogleIdpOpen, setIsAddGoogleIdpOpen } = props;


    return (
        <>
            <Transition appear show={isAddGoogleIdpOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="select-idp-div"
                    onClose={() => setIsAddGoogleIdpOpen(false)}
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
                                Google
                            </div>
                            <div className="close-icon">
                                <IconButton onClick={() => setIsAddGoogleIdpOpen(false)}>
                                    <CancelIcon style={{ fontSize: "4vh", color: "#d1d1d1" }} />
                                </IconButton>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
            <div>
                
            </div>
        </>
    );
}