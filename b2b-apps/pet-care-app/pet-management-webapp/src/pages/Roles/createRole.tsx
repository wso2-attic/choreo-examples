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
import "./roles.css";
import { Button, ButtonToolbar, Divider, Modal, Panel, Radio, RadioGroup, Stack } from "rsuite";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepButton, Typography } from "@mui/material";
import { Field, Form } from "react-final-form";
import FormSuite from "rsuite/Form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import BasicDetails from "./basicDetails";
import PermissionSelection from "./permissionSelection";
import UserSelection from "./userSelection";

const steps = ['Basic Details', 'Permission Selection', 'Users Selection'];

export interface CreateRoleProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRole(props: CreateRoleProps) {
    const { isOpen, setIsOpen } = props;
    const [displayName, setDisplayName] = useState("");

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const nameValidate = (name: string, errors: any) => {
        if (!name) {
            errors.name = "This field cannot be empty";
        }

        return errors;
    };

    const validate = (values: any) => {
        let errors = {};

        errors = nameValidate(values.name, errors);

        return errors;
    };

    const onUpdate = async (values: any) => {

        setDisplayName(values.name);
        // onNext();
    };


    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="add-role-div"
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
                                {"Create Role"}
                            </Dialog.Title>
                            <div className="add-role-form">
                                <Box sx={{ width: '99%' }}>
                                    <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                                        {steps.map((label, index) => (
                                            <Step key={label} completed={completed[index]}>
                                                <StepButton color="inherit" onClick={handleStep(index)}>
                                                    {label}
                                                </StepButton>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <div >
                                        {activeStep === 0 && (
                                            <BasicDetails />
                                        )}
                                        {activeStep === 1 && (
                                            <PermissionSelection/>
                                        )}
                                        {activeStep === 2 && (
                                            <UserSelection/>
                                        )}
                                        {allStepsCompleted() ? (
                                            <React.Fragment>
                                                <Typography sx={{ mt: 2, mb: 1 }}>
                                                    All steps completed - you&apos;re finished
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    <Button onClick={handleReset}>Reset</Button>
                                                </Box>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                                    Step {activeStep + 1}
                                                </Typography> */}
                                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                    {/* <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                    >
                                                        Back
                                                    </Button> */}
                                                    <Box sx={{ flex: '1 1 auto' }} />
                                                    <Button onClick={handleNext} className="next-btn">
                                                        Next
                                                    </Button>
                                                    {/* {activeStep !== steps.length &&
                                                        (completed[activeStep] ? (
                                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                                Step {activeStep + 1} already completed
                                                            </Typography>
                                                        ) : (
                                                            <Button onClick={handleComplete}>
                                                                {completedSteps() === totalSteps() - 1
                                                                    ? 'Finish'
                                                                    : 'Complete Step'}
                                                            </Button>
                                                        ))} */}
                                                </Box>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </Box>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>

            </Transition>
        </>
    );
}
