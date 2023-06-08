/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import { Role } from "@b2bsample/business-admin-app/data-access/data-access-common-models-util";
import {
    controllerDecodeEditRolesToAddOrRemoveUser, controllerDecodeEditUser, controllerDecodeListAllRoles,
    controllerDecodeUserRole,
    controllerDecodeViewUsersInGroup
} from "@b2bsample/business-admin-app/data-access/data-access-controller";
import { InternalGroup, InternalUser, User } from "@b2bsample/shared/data-access/data-access-common-models-util";
import { FormButtonToolbar, FormField, ModelHeaderComponent } from "@b2bsample/shared/ui/ui-basic-components";
import { errorTypeDialog, successTypeDialog, warningTypeDialog } from "@b2bsample/shared/ui/ui-components";
import { checkIfJSONisEmpty } from "@b2bsample/shared/util/util-common";
import { LOADING_DISPLAY_BLOCK, LOADING_DISPLAY_NONE, fieldValidate } from "@b2bsample/shared/util/util-front-end-util";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { Checkbox, Divider, Loader, Modal, Panel, Table, TagPicker, useToaster } from "rsuite";
import FormSuite from "rsuite/Form";
import stylesSettings from "../../../../../../styles/Settings.module.css";

interface EditGroupComponentProps {
    session: Session
    group: InternalGroup
    open: boolean
    onClose: () => void
    userList: InternalUser[]
}

/**
 * 
 * @param prop - session, user (user details), open (whether the modal open or close), onClose (on modal close)
 * 
 * @returns Modal form to edit the group
 */
export default function EditGroupComponent(prop: EditGroupComponentProps) {

    const { session, group, open, onClose, userList } = prop;

    const toaster = useToaster();

    const [ loadingDisplay, setLoadingDisplay ] = useState(LOADING_DISPLAY_NONE);
    const [ allRoles, setAllRoles ] = useState<Role[]>(null);
    const [ userRoles, setUserRoles ] = useState<Role[]>(null);
    const [ userRolesForForm, setUserRolesForForm ] = useState(null);
    const [ initUserRolesForForm, setInitUserRolesForForm ] = useState<string[]>(null);
    const usersList = [ { name: "David" }, { name:"Peter" }, { name:"Sheril" } ];
    const [ users, setUsers ] = useState<InternalUser[]>([]);
    const { Column, HeaderCell, Cell } = Table;

    const fetchData = useCallback(async () => {
        const res = await controllerDecodeViewUsersInGroup(session, group?.displayName);

        await setUsers(res);
    }, [ open === true ]);

    useEffect(() => {
        fetchData();
    }, [ fetchData ]);

    const validate = (values: Record<string, unknown>): Record<string, string> => {
        let errors: Record<string, string> = {};

        errors = fieldValidate("groupName", values.groupName, errors);

        return errors;
    };

    const onDataSubmit = (response: User): void => {
        if (response) {
            successTypeDialog(toaster, "Changes Saved Successfully", "Group details edited successfully.");
            onClose();
        } else {
            errorTypeDialog(toaster, "Error Occured", "Error occured while editing the group. Try again.");
        }
    };

    const onRolesSubmit = (response: boolean): void => {
        if (response) {
            successTypeDialog(toaster, "Changes Saved Successfully", "User details edited successfully.");
            onClose();
        } else {
            warningTypeDialog(toaster, "Roles not Properly Updated",
                "Error occured while updating the roles. Try again.");
        }
    };

    const onSubmit = async (values: Record<string, unknown>): Promise<void> => {
        setLoadingDisplay(LOADING_DISPLAY_BLOCK);
    };

    return (
        <Modal backdrop="static" role="alertdialog" open={ open } onClose={ onClose } size="sm">

            <Modal.Header>
                <ModelHeaderComponent
                    title="Edit Group"
                    subTitle={ "Edit group details" } />
            </Modal.Header>
            <Modal.Body>
                <div className={ stylesSettings.addUserMainDiv }>
                    <Form
                        onSubmit={ onSubmit }
                        validate={ validate }
                        initialValues={ {
                            groupName: group?.displayName
                        } }
                        render={ ({ handleSubmit, form, submitting, pristine, errors }) => (
                            <FormSuite
                                layout="vertical"
                                onSubmit={ () => { handleSubmit().then(form.restart); } }
                                fluid>

                                <FormField
                                    name="groupName"
                                    label="Group Name"
                                    helperText="Name of the group."
                                    needErrorMessage={ true }
                                >
                                    <FormSuite.Control name="input"/>
                                </FormField>

                                <FormField
                                    name="editUsers"
                                    label="Edit Users"
                                    helperText="Update users in the group."
                                    needErrorMessage={ true }
                                >
                                    <></>
                                </FormField>

                                <div>
                                    <Table autoHeight autoWidth data={ userList }>
                                        <Column width={ 500 } align="left">
                                            <HeaderCell>
                                                <h6>Users</h6>
                                            </HeaderCell>
                                            <Cell dataKey="email">
                                                { (rowData: any) => (
                                                    <Checkbox
                                                        checked=
                                                            { users.some(user => user.email === rowData.email) }>
                                                        { rowData.email }
                                                    </Checkbox>
                                                ) }
                                            </Cell>
                                        </Column>
                                    </Table>
                                </div>

                                <FormButtonToolbar
                                    submitButtonText="Submit"
                                    submitButtonDisabled={ submitting || pristine || !checkIfJSONisEmpty(errors) }
                                    onCancel={ onClose }
                                />

                            </FormSuite>
                        ) }
                    />
                </div>
            </Modal.Body>

            <div style={ loadingDisplay }>
                <Loader size="lg" backdrop content="User is adding" vertical />
            </div>
        </Modal>
    );
}
