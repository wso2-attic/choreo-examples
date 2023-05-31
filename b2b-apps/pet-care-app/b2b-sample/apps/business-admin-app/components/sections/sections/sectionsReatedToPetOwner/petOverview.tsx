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

import { ModelHeaderComponent } from "@b2bsample/shared/ui/ui-basic-components";
import { Checkbox, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { deletePet } from "apps/business-admin-app/APICalls/DeletePet/delete-pet";
import { getThumbnail } from "apps/business-admin-app/APICalls/GetThumbnail/get-thumbnail";
import { Availability, Doctor } from "apps/business-admin-app/types/doctor";
import { Pet } from "apps/business-admin-app/types/pets";
import axios, { AxiosError } from "axios";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Modal } from "rsuite";
import EditPetComponent from "./editPet";
import PET_IMAGE from "../../../../../../libs/business-admin-app/ui/ui-assets/src/lib/images/thumbnail.png";
import styles from "../../../../styles/doctor.module.css";


interface PetOverviewProps {
    session: Session
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isUpdateViewOpen: boolean;
    setIsUpdateViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pet: Pet;
}

/**
 * 
 * @param prop - session, open (whether modal open or close), onClose (on modal close)
 * 
 * @returns Modal to display overview of a pet.
 */
export default function PetOverview(props: PetOverviewProps) {

    const { session, isOpen, setIsOpen, isUpdateViewOpen, setIsUpdateViewOpen, pet } = props;

    const [ stringDate, setStringDate ] = useState("");
    const [ url, setUrl ] = useState(null);
    const [ availabilityInfo, setAvailabilityInfo ] = useState<Availability[] | null>([]);

    async function getThumbnails() {
        const accessToken = session.accessToken;

        if (pet) {
            getThumbnail(accessToken, pet?.id)
                .then((res) => {
                    if (res.data.size > 0) {
                        const imageUrl = URL.createObjectURL(res.data);

                        setUrl(imageUrl);
                    }
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError;

                        if (axiosError.response?.status === 404) {
                        // eslint-disable-next-line no-console
                            console.log("Resource not found");
                        // Handle the 404 error here
                        } else {
                        // eslint-disable-next-line no-console
                            console.log("An error occurred:", axiosError.message);
                        // Handle other types of errors
                        }
                    } else {
                    // eslint-disable-next-line no-console
                        console.log("An error occurred:", error);
                    // Handle other types of errors
                    }
                });
        }


    }

    useEffect(() => {
        setUrl(null);
        getThumbnails();
    }, [ isOpen ]);

    const handleEdit = () => {
        setIsOpen(false);
        setIsUpdateViewOpen(true);
    };

    const closePetOverviewDialog = (): void => {
        setIsOpen(false);
        setUrl(null);
    };


    const handleDelete = () => {
        async function deletePets() {
            const accessToken = session.accessToken;
            const response = await deletePet(accessToken, pet.id);

            setIsOpen(false);
        }
        deletePets();
    };

   

    return (
        <><Modal
            backdrop="static"
            role="alertdialog"
            open={ isOpen }
            onClose={ closePetOverviewDialog }
            size="sm"
            className={ styles.doctorOverviewMainDiv }>

            <Modal.Header>
                <ModelHeaderComponent title="Pet Overview" />
            </Modal.Header>

            <Modal.Body>
                <div className={ styles.petOverviewMainDiv }>
                    <div className={ styles.basicInfoDiv }>
                        <Grid container spacing={ 2 }>
                            <Grid item xs={ 6 }>
                                <Typography className="typography-style">
                                    <p className={ styles.docOverviewFont }>Name</p>
                                </Typography>
                                <Typography className="typography-style">
                                    <p className={ styles.docOverviewFont }>Type</p>
                                </Typography>
                                <Typography className="typography-style">
                                    <p className={ styles.docOverviewFont }>Date of Birth</p>
                                </Typography>
                            </Grid>
                            <Grid item xs={ 6 }>
                                <Typography className="typography-style-doc-overview">
                                    <p className={ styles.docOverviewFont }>{ pet?.name }</p>
                                </Typography>
                                <Typography className="typography-style-doc-overview">
                                    <p className={ styles.docOverviewFont }>{ pet?.breed }</p>
                                </Typography>
                                <Typography className="typography-style-doc-overview">
                                    <p className={ styles.docOverviewFont }>{ pet?.dateOfBirth }</p>
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </div>
                    <br />
                    <div className={ styles.vaccinationHeaderInOverview }>
                        Vaccination Information
                    </div>
                    <br/>
                    <div className={ styles.vaccInfoDivInOverview }>
                        { pet?.vaccinations.length > 0 ? (
                            <div>
                                <Table aria-label="simple table" style={ { width: "40vw" } }>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                style={ {
                                                    fontSize: "1.7vh", fontWeight: "bold",
                                                    color: "rgb(105, 105, 105)"
                                                } }>
                                                Vaccine Name</TableCell>
                                            <TableCell
                                                align="center"
                                                style={ {
                                                    fontSize: "1.7vh", fontWeight: "bold",
                                                    color: "rgb(105, 105, 105)"
                                                } }>
                                                Last vaccination Date
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={ {
                                                    fontSize: "1.7vh", fontWeight: "bold",
                                                    color: "rgb(105, 105, 105)"
                                                } }>Next Vaccination Date</TableCell>
                                            <TableCell
                                                align="center"
                                                style={ {
                                                    fontSize: "1.7vh", fontWeight: "bold",
                                                    color: "rgb(105, 105, 105)"
                                                } }>Enable Alerts</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { pet.vaccinations.map((vaccine) => (
                                            <TableRow key={ vaccine.name }>
                                                <TableCell
                                                    align="center"
                                                    style={ { fontSize: "1.7vh", padding: 1 } }>
                                                    { vaccine.name }</TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={ { fontSize: "1.7vh", padding: 1 } }>
                                                    { vaccine.lastVaccinationDate }</TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={ { fontSize: "1.7vh", padding: 1 } }>
                                                    { vaccine.nextVaccinationDate }</TableCell>
                                                <TableCell
                                                    align="center"
                                                    style={ { fontSize: "1.7vh", padding: 1 } }>
                                                    <Checkbox
                                                        color="primary" 
                                                        disabled={ true }
                                                        checked={ vaccine.enableAlerts } /></TableCell>
                                            </TableRow>
                                        )) }
                                    </TableBody>
                                </Table>
                                <br/>
                            </div>
                        ) : (
                            <div className={ styles.noVaccinationInfoDiv }>
                                Vaccination Details are not provided.
                            </div>
                        ) }
                        
                    </div>
                    <br /><br />
                    <div className={ styles.docImageStyle }>
                        { url ? (
                            <Image
                                style={ { borderRadius: "10%", height: "100%", width: "100%" } }
                                src={ url }
                                alt="pet-thumbnail" 
                                width={ 10 }
                                height={ 10 }
                            />
                        ) : (
                            <Image
                                style={ { borderRadius: "10%", height: "100%", width: "100%" } }
                                src={ PET_IMAGE }
                                alt="pet-thumbnail" />

                        ) }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ handleEdit } appearance="primary">
                    Edit
                </Button>
                <Button
                    onClick={ handleDelete }
                    appearance="subtle"
                    style={ { backgroundColor: "lightcoral", color: "white" } }>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <div>
            <EditPetComponent 
                session={ session } 
                isOpen={ isUpdateViewOpen } 
                setIsOpen={ setIsUpdateViewOpen } 
                pet={ pet }
                imageUrl={ url } 
                setImageUrl={ setUrl } />
        </div>
        </>
    );
}

