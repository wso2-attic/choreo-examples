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

import { BasicUserInfo, Hooks, useAuthContext } from "@asgardeo/auth-react";
import { Grid } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import { useLocation } from 'react-router-dom';
import NavBarInUserView from "../NavBar/navBarInUserView";
import { getPets } from "../../components/getPetList/get-pets";
import { Pet } from "../../types/pet";
import PetCard from "./PetCard";
import AddPets from "./addPets";
import PetOverview from "./petOverview";

export const ManagePetsPage: FunctionComponent = (): ReactElement => {
    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [isAddPetOpen, setIsAddPetOpen] = useState(false);
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isUpdateViewOpen, setIsUpdateViewOpen] = useState(false);
    const [petList, setPetList] = useState<Pet[] | null>(null);
    const [pet, setPet] = useState<Pet | null>(null);
    const location = useLocation();
    const { getAccessToken } = useAuthContext();

    async function getPetList() {
        const accessToken = await getAccessToken();
        getPets(accessToken)
            .then((res) => {
                if (res.data instanceof Array) {
                    setPetList(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }


    useEffect(() => {
        getPetList();
    }, [location.pathname === "/user_pets", isAddPetOpen, isUpdateViewOpen]);


    return (
        <>
            <NavBarInUserView isBlur={isAddPetOpen || isOverviewOpen || isUpdateViewOpen} />
            <div className={isAddPetOpen || isOverviewOpen || isUpdateViewOpen ? "home-div-blur" : "home-div"}>
                <div className="heading-div">
                    <label className="home-wording">
                        Manage Pets
                    </label>
                </div>
                <div className="manage-users-description">
                    <label className="manage-users-description-label">
                        Manage pets of the user
                    </label>
                </div>
                <div>
                    <button className="add-doctor-btn" onClick={() => setIsAddPetOpen(true)}>
                        Add Pet
                    </button>
                </div>
                <div className="doctor-grid-div">
                    <Grid container spacing={2}>
                        {petList && petList.map((pet) => (
                            <Grid item xs={4} sm={4} md={4}
                                onClick={() => { setIsOverviewOpen(true); setPet(pet); }}>
                                <PetCard
                                    petId={pet.id}
                                    petName={pet.name}
                                    breed={pet.breed}
                                    isUpdateViewOpen={isUpdateViewOpen}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div>
                <AddPets isOpen={isAddPetOpen} setIsOpen={setIsAddPetOpen} />
            </div>
            <div>
                <PetOverview
                    isOpen={isOverviewOpen}
                    setIsOpen={setIsOverviewOpen}
                    isUpdateViewOpen={isUpdateViewOpen}
                    setIsUpdateViewOpen={setIsUpdateViewOpen}
                    pet={pet}
                />
            </div>
        </>
    );
};