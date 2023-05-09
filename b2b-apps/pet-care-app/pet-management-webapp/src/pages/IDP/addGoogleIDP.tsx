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
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { Button, ButtonToolbar, Form, Input, InputGroup } from "rsuite";
import CopyIcon from "@rsuite/icons/Copy";

interface AddEnterpriseIdpProps {
    isAddGoogleIdpOpen: boolean;
    setIsAddGoogleIdpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddGoogleIDP(props: AddEnterpriseIdpProps) {
    const { isAddGoogleIdpOpen, setIsAddGoogleIdpOpen } = props;


    const onClose = () => {
        setIsAddGoogleIdpOpen(false);
    }

    return (
        <>
            <Transition appear show={isAddGoogleIdpOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-ep-idp-div"
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
                                {"Google"}
                                <br />
                                <label className="sub-title-label">
                                    Login users with existing Google accounts.
                                </label>
                            </Dialog.Title>
                            <div className="prerequisite-div">
                                <InfoIcon style={{ fontSize: "2.2vh", paddingRight: "0.5vw" }} />
                                <label style={{ fontWeight: "bold", fontSize: "2.5vh" }}>Prerequisite</label>
                                <br />
                                <br />
                                Before you begin, create an OAuth application, and obtain a client ID & secret.
                                Add the following URL as the Authorized Redirect URI.
                                <br />
                                <br />
                                <InputGroup >
                                    <Input readOnly value={"url"} size="lg" className="url-input" />
                                    <InputGroup.Button
                                    // onClick={() => copyValueToClipboard(getCallbackUrl(orgId))}
                                    >
                                        <CopyIcon />
                                    </InputGroup.Button>
                                </InputGroup>
                            </div>
                            <div className="ep-idp-form-div">
                                <Form className="ep-idp-form">
                                    <Form.Group controlId="application_name">
                                        <Form.ControlLabel className="ep-idp-form-label">Idp Name</Form.ControlLabel>
                                        <Form.Control name="application_name" className="ep-idp-form-input" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="client_id">
                                        <Form.ControlLabel className="ep-idp-form-label">Client ID</Form.ControlLabel>
                                        <Form.Control name="client_id" type="text" autoComplete="off" className="ep-idp-form-input" />
                                    </Form.Group>
                                    <br />
                                    <Form.Group controlId="client_secret">
                                        <Form.ControlLabel className="ep-idp-form-label">Client Secret</Form.ControlLabel>
                                        <Form.Control name="client_secret" type="password" autoComplete="off" className="ep-idp-form-input" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="buttons-div">
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button
                                            className='cancel-ep-idp-button'
                                            size="lg"
                                            appearance="ghost"
                                            type="button"
                                            onClick={onClose}
                                        >Cancel</Button>
                                        <Button
                                            className='create-ep-idp-button'
                                            size="lg"
                                            appearance="primary"
                                            type="submit"
                                        // disabled={submitting || pristine || !checkIfJSONisEmpty(errors)}
                                        >
                                            Create
                                        </Button>
                                    </ButtonToolbar>
                                </Form.Group>
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
        </>
    );
}