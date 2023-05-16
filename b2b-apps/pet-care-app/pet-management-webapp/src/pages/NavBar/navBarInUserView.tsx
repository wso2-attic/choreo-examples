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
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink as Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LOGO_IMAGE from "../../images/pet_care_logo_2.png";

interface LinkProps {
    isSelected: boolean;
}

interface NavBarProps {
    isBlur: boolean;
}

export const Nav = styled.nav<NavBarProps>`
background-color: #4e40ed;
width: 20vw;
height: 100%;
position: absolute;
margin-top: 0vh;
filter: ${props => props.isBlur ? 'blur(0.5vw)' : 'blur(0vw)'};
`;

export const NavLink = styled(Link) <LinkProps>`
color: #ffffff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1vw;
padding-top: 1vh;
padding-bottom: 1vh;
height: 100%;
font-family: Arial, Helvetica, sans-serif;
font-size: 1.5vw;
cursor: pointer;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #4e40ed;
}
color: ${props => props.isSelected ? '#4e40ed' : '#ffffff'};
background-color: ${props => props.isSelected ? '#fff' : 'transparent'};
`;

export const NavIcon = styled.div`
padding-right: 1vw`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
// display: flex;
// align-items: center;
// margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
// &:hover {
// 	transition: all 0.2s ease-in-out;
// 	background: #fff;
// 	color: #808080;
// }
.active {
    transition: all 0.2s ease-in-out;
 	background: #fff;
 	color: #808080;
}
}
`;

export const NavHeader = styled.div`
color: #c9c5fc;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1.5vw;
padding-top: 5vh;
padding-bottom: 3vh;
height: 100%;
font-family: Arial, Helvetica, sans-serif;
font-size: 1.5vw;
font-weight: bold;
cursor: pointer;
`;

export const NavLogo = styled.div`
color: #ffffff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1.5vw;
padding-top: 5vh;
padding-bottom: 3vh;
height: 100%;
font-family: Arial, Helvetica, sans-serif;
font-size: 1.5vw;
font-weight: bold;
cursor: pointer;
`;

function NavBarInUserView(props: NavBarProps) {
    const {isBlur} = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <Nav isBlur={isBlur}>
                <Bars />
                <NavMenu>
                    <NavLogo>
                        <img
                            style={{ width: "15vw", height: "11.5vh" }}
                            src={LOGO_IMAGE}
                            alt="pet-care-logo"
                        />
                    </NavLogo>
                    <NavLink to='/user_home' isSelected={path.includes('doctor_home') ? true : false} >
                        <NavIcon>
                            <HomeIcon style={{ width: "4vh", height: "4vh", padding: "1vh" }} />
                        </NavIcon>
                        Home
                    </NavLink>
                    <NavLink to='/user_pets' isSelected={path.includes('doctor_profile') ? true : false} >
                        <NavIcon>
                            <PetsIcon style={{ width: "4vh", height: "4vh", padding: "1vh" }} />
                        </NavIcon>
                        Pets
                    </NavLink>
                    <NavLink to='/user_bookings' isSelected={path.includes('doctor_bookings') ? true : false}>
                        <NavIcon>
                            <StickyNote2Icon style={{ width: "4vh", height: "4vh", padding: "1vh" }} />
                        </NavIcon>
                        Channelling
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );

}

export default React.memo(NavBarInUserView);