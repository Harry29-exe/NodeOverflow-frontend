import React, {useState} from 'react';
import "./Navbar.css"
import {mainColors} from "../../App";
import {Link as RouterLink} from "react-router-dom";
import {Box, Link} from "@chakra-ui/react";
import UserIcon from "./UserIcon";
import {AiOutlineFullscreen, RiFullscreenExitLine, RiFullscreenLine} from "react-icons/all";

const toggleFullScreen = () => {
    let toggleOn = document.fullscreenElement;
    console.log(toggleOn);
    if (!toggleOn) {
        document.body.requestFullscreen();
    } else {
        console.log("quiting full screen");
        document.exitFullscreen();
    }
}

const Navbar: React.FunctionComponent = () => {
    const [fullscreenOn, setFullscreen] = useState(true);

    return (
        <Box position="absolute" top={0} left={0} width="100%" height="100%" margin={0} padding={0} fontSize={"4xl"}>

            <div className={"Navbar"} style={{
                position: "absolute", left: 0, top: 0,
                width: "100%", height: "100%", margin: 0, padding: 0,
                borderBottom: "2px solid " + mainColors.headerColor,
                boxSizing: "border-box"
            }}/>


            <Box style={{
                position: "absolute", width: "70%", height: "inherit",
                left: 0, top: 0, display: "flex", justifyContent: "flex-start", alignItems: "center",
                fontWeight: 600, color: "#fff"
            }}>

                <NavbarLink label="Home" to={"/"}/>

                <NavbarLink label="Editor" to="/editor"/>

                <NavbarLink label="Examples" to="/examples"/>


            </Box>

            <Box
                position="absolute" w={"30%"} height="inherit"
                left="70%" top={0} display="flex" justifyContent="flex-end" alignItems="center"
                fontWeight={600} color="#fff" fontSize="3.5vh" h="100%"
            >
                <Box bg="none" _hover={{color: mainColors.headerColor, cursor: "pointer",
                    transform: fullscreenOn? "scale(1.2)": "scale(1)"}}
                     transform={fullscreenOn? "scale(1)": "scale(1.2)"}
                     onClick={() => {
                         toggleFullScreen();
                         setFullscreen(!fullscreenOn);
                     }}
                     onTouchEnd={toggleFullScreen} transition="transform 0.3s 0s linear"
                     margin="15px">

                    {
                    fullscreenOn?
                    <RiFullscreenLine size="4.5vh"/>
                    :
                    <RiFullscreenExitLine size="4.5vh"/>
                    }

                </Box>

                <UserIcon size={40} margin="15px"/>

                <Box w={16} h={12} bg="primary.400">

                </Box>
            </Box>
        </Box>
    );

}

interface NavbarLinkProps {
    label: string;
    to: string;
}

const NavbarLink: React.FunctionComponent<NavbarLinkProps> = (props: NavbarLinkProps): JSX.Element => {
    return (
        <Link as={RouterLink} to={props.to} marginLeft="10px">
            {props.label}
        </Link>
    )
}

export default Navbar;