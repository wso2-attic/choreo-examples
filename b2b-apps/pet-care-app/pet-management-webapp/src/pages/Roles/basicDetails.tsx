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

export default function BasicDetails() {
    return (
        <div className="role-creation-main-div">
            <div className="role-creation-basic">

                <Form
                    // onSubmit={onUpdate}
                    // validate={validate}
                    // initialValues={{
                    //     name: displayName
                    // }}
                    render={({ handleSubmit, form, errors }) => (
                        <FormSuite
                            layout="vertical"
                            // className={styles.addUserForm}
                            onSubmit={event => { handleSubmit(event).then(form.restart); }}
                            fluid>

                            <Field
                                name="name"
                                render={({ input, meta }) => (
                                    <FormSuite.Group controlId="name">
                                        <FormSuite.ControlLabel style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#757474', fontSize: '2.5vh' }}>Role Name*</FormSuite.ControlLabel>

                                        <FormSuite.Control style={{ width: '38vw', fontFamily: 'Arial, Helvetica, sans-serif', border: '0.2vh solid rgb(196, 196, 196)', borderRadius: '0.5vh', fontSize: '2.5vh' }}
                                            {...input} />

                                        {/* <Stack style={{ marginTop: "5px" }}>
                                                        <InfoOutlineIcon style={{ marginLeft: "2px", marginRight: "10px" }} />
                                                        <Form.HelpText>{"The name of the role."}</Form.HelpText>
                                                    </Stack> */}

                                        {meta.error && meta.touched && (<FormSuite.ErrorMessage show={true}>
                                            {meta.error}
                                        </FormSuite.ErrorMessage>)}
                                    </FormSuite.Group>
                                )} />

                            {/* <div className="buttons">
                                            <FormSuite.Group>
                                                <ButtonToolbar>
                                                    <Button
                                                        // className={styles.addUserButton}
                                                        size="md"
                                                        appearance="primary"
                                                        type="submit"
                                                        // disabled={!checkIfJSONisEmpty(errors)}
                                                        >
                                                        Next
                                                    </Button>
                                                </ButtonToolbar>
                                            </FormSuite.Group>

                                        </div> */}
                        </FormSuite>
                    )} onSubmit={function (values: Record<string, any>, form: FormApi<Record<string, any>, Partial<Record<string, any>>>, callback?: (errors?: AnyObject) => void): void | AnyObject | Promise<AnyObject> {
                        throw new Error("Function not implemented.");
                    }} />
            </div>
        </div>
    );

}