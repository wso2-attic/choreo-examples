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

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import "./users.css";
import { Field, Form } from "react-final-form";
import FormSuite from "rsuite/Form";
import { Button, ButtonToolbar, Divider, Panel, Radio, RadioGroup, Stack } from "rsuite";
import EmailFillIcon from "@rsuite/icons/EmailFill";

export interface AddUsersProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUsers(props: AddUsersProps) {
    const { isOpen, setIsOpen } = props;
    const dateInputRef = useRef(null);

    const InviteConst = {
        INVITE: "pwd-method-invite",
        PWD: "pwd-method-pwd"
    }

    const [inviteSelect, setInviteSelect] = useState(InviteConst.INVITE);
    const [inviteShow, setInviteShow] = useState("LOADING_DISPLAY_BLOCK");
    const [passwordShow, setPasswordShow] = useState("LOADING_DISPLAY_NONE");

    const onSubmit = (values: any) => {
        console.log(values);
    }

    const onClose = () => {
        setIsOpen(false);
    }

    const validate = (values: any) => {
        let errors = {};
        console.log(values);
        return errors;
    }

    const inviteSelectOnChange = (value: string) => {
        setInviteSelect(value);

        switch (value) {
            case InviteConst.INVITE:
                setInviteShow("LOADING_DISPLAY_BLOCK");
                setPasswordShow("LOADING_DISPLAY_NONE");

                break;

            case InviteConst.PWD:
                setInviteShow("LOADING_DISPLAY_NONE");
                setPasswordShow("LOADING_DISPLAY_BLOCK");

                break;
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-user-div"
                    onClose={() => setIsOpen(false)}
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
                                as="h3" className="add-pet-div">
                                {"Add User"}
                            </Dialog.Title>
                            <div className="add-user-form">
                                <Form
                                    onSubmit={onSubmit}
                                    validate={validate}
                                    render={({ handleSubmit, form, submitting, pristine, errors }) => (
                                        <FormSuite
                                            layout="vertical"
                                            onSubmit={event => { handleSubmit(event).then(form.restart); }}
                                            fluid>
                                            <Field
                                                name="firstName"
                                                render={({ input, meta }) => (
                                                    <FormSuite.Group controlId="firstName">
                                                        <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>First Name</FormSuite.ControlLabel>
                                                        <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                            {...input}
                                                        />
                                                        {meta.error && meta.touched && (<FormSuite.ErrorMessage show={true} >
                                                            {meta.error}
                                                        </FormSuite.ErrorMessage>)}
                                                    </FormSuite.Group>
                                                )}
                                            />
                                            <br />
                                            <Field
                                                name="familyName"
                                                render={({ input, meta }) => (
                                                    <FormSuite.Group controlId="familyName">
                                                        <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Last Name</FormSuite.ControlLabel>
                                                        <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                            {...input}
                                                        />
                                                        {meta.error && meta.touched && (<FormSuite.ErrorMessage show={true} >
                                                            {meta.error}
                                                        </FormSuite.ErrorMessage>)}
                                                    </FormSuite.Group>
                                                )}
                                            />
                                            <br />
                                            <Field
                                                name="email"
                                                render={({ input, meta }) => (
                                                    <FormSuite.Group controlId="email">
                                                        <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Email</FormSuite.ControlLabel>
                                                        <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                            {...input}
                                                            type="email"
                                                        />
                                                        {meta.error && meta.touched && (<FormSuite.ErrorMessage show={true} >
                                                            {meta.error}
                                                        </FormSuite.ErrorMessage>)}
                                                    </FormSuite.Group>
                                                )}
                                            />
                                            <br />
                                            <Divider style={{ margin: '1vh 0', border: '0.1vh solid #ccc', width: '38vw' }} />
                                            <br />
                                            <Field
                                                name="username"
                                                render={({ input, meta }) => (
                                                    <FormSuite.Group controlId="username">
                                                        <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Username</FormSuite.ControlLabel>
                                                        <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                            {...input}
                                                        />
                                                        {meta.error && meta.touched && (<FormSuite.ErrorMessage show={true} >
                                                            {meta.error}
                                                        </FormSuite.ErrorMessage>)}
                                                    </FormSuite.Group>
                                                )}
                                            />
                                            <RadioGroup
                                                name="radioList"
                                                value={inviteSelect}
                                                defaultValue={InviteConst.INVITE}
                                                onChange={inviteSelectOnChange}>
                                                <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Select the method to set the user password</p>
                                                <Radio value={InviteConst.INVITE} style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>
                                                    Invite the user to set their own password
                                                </Radio>
                                                <br />
                                                {inviteShow === "LOADING_DISPLAY_BLOCK" && (
                                                    <div style={{ display: 'flex' }}>
                                                        <br />
                                                        <EmailInvitePanel />
                                                        <br />
                                                    </div>
                                                )}
                                                <br />
                                                <Radio value={InviteConst.PWD} style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Set a password for the user</Radio>
                                                {passwordShow === "LOADING_DISPLAY_BLOCK" && (
                                                    <div>
                                                        <br />
                                                        <Field
                                                            name="password"
                                                            render={({ input, meta }) => (
                                                                <FormSuite.Group controlId="password">
                                                                    <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Password</FormSuite.ControlLabel>
                                                                    <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                                        {...input}
                                                                        type="password"
                                                                        autoComplete="off"
                                                                    />
                                                                    {meta.error && meta.touched &&
                                                                        (<FormSuite.ErrorMessage show={true}>
                                                                            {meta.error}
                                                                        </FormSuite.ErrorMessage>)}
                                                                </FormSuite.Group>
                                                            )}
                                                        />
                                                        <br />
                                                        <Field
                                                            name="repassword"
                                                            render={({ input, meta }) => (
                                                                <FormSuite.Group controlId="repassword">
                                                                    <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Re enter password</FormSuite.ControlLabel>
                                                                    <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid #757474', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                                                        {...input}
                                                                        type="password"
                                                                        autoComplete="off"
                                                                    />
                                                                    {meta.error && meta.touched &&
                                                                        (<FormSuite.ErrorMessage show={true}>
                                                                            {meta.error}
                                                                        </FormSuite.ErrorMessage>)}
                                                                </FormSuite.Group>
                                                            )}
                                                        />
                                                    </div>
                                                )}
                                            </RadioGroup>
                                            <br />
                                            <br />
                                            <div className="buttons">
                                                <FormSuite.Group>
                                                    <ButtonToolbar>
                                                        <Button
                                                            className='add-user-submit-button'
                                                            size="lg"
                                                            appearance="primary"
                                                            type="submit"
                                                            // disabled={submitting || pristine || !checkIfJSONisEmpty(errors)}
                                                            >
                                                            Submit
                                                        </Button>
                                                        <Button
                                                            className='add-user-cancel-button'
                                                            size="lg"
                                                            appearance="ghost"
                                                            type="button"
                                                            onClick={onClose}
                                                            >Cancel</Button>
                                                    </ButtonToolbar>
                                                </FormSuite.Group>
                                            </div>
                                        </FormSuite>
                                    )}
                                />
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

function EmailInvitePanel() {
    return (
        <div className="email-invite-div" >
            <EmailFillIcon style={{ fontSize: "7vh", color: '#757474', position: 'absolute', marginLeft: '1vw', marginTop: '1vh' }} />
            <div className="invite-description">
                <p className="invite-para">
                    An email with a confirmation link will be sent to the provided
                    email address for the user to set their own password.
                </p>
            </div>
        </div>
    );
}