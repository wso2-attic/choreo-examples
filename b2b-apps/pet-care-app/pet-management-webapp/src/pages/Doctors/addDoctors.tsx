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
import React, { Fragment, useRef } from "react";
import "./doctor.css";

export interface AddDoctorsProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddDoctors(props: AddDoctorsProps) {
    const { isOpen, setIsOpen } = props;
    const dateInputRef = useRef(null);
    
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="center-outline-blue"
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
                                {"Add Doctor"}
                            </Dialog.Title>
                            <div className="child-div">
                                <form>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "3vh" }}>
                                                Name
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="name"
                                            type="text"
                                            placeholder="Name"
                                            // onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "3vh" }}>
                                                Registration Number
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="registration number"
                                            type="text"
                                            placeholder="Registration number"
                                            // onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="align-left">
                                        <div className="label-style">
                                            <label style={{ fontSize: "3vh" }}>
                                                Available Date
                                            </label>
                                        </div>
                                        <input
                                            className="input-style-2"
                                            id="Available Date"
                                            type="date"
                                            ref={dateInputRef}
                                            placeholder="Available Date"
                                            // onChange={(e) => setDoB(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="save-btn-div">
                                <button className="save-btn-style">
                                    Save
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}