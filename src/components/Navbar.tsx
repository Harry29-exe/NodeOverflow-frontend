import React from 'react';
import "./Navbar.css"
import {mainColors} from "../App";
import {Link as RouterLink} from "react-router-dom";
import {Box, Link} from "@chakra-ui/react";

const toggleFullScreen = (event: any) => {
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
    let onFullScreen: boolean = false;

    return (
        <Box position="absolute" top={0} left={0} width="100%" height="100%" margin={0} padding={0}>

            <div className={"Navbar"} style={{
                position: "absolute", left: 0, top: 0,
                width: "100%", height: "100%", margin: 0, padding: 0,
                borderBottom: "2px solid " + mainColors.headerColor,
                boxSizing: "border-box"
            }}/>


            <div style={{
                position: "absolute", width: "70%", height: "inherit",
                left: 0, top: 0, display: "flex", justifyContent: "flex-start", alignItems: "center",
                fontWeight: 600, color: "#fff", fontSize: "3.5vh"
            }}>

                <NavbarLink label="Home" to={"/"}/>

                <NavbarLink label="Editor" to="/editor"/>

                <NavbarLink label="Examples" to="/examples"/>


            </div>

            <div style={{
                position: "absolute", width: "30%", height: "inherit",
                left: "70%", top: 0, display: "flex", justifyContent: "flex-end", alignItems: "center",
                fontWeight: 600, color: "#fff", fontSize: "3.5vh"
            }}>
                <Box bg="none" _hover={{color: mainColors.headerColor, cursor: "pointer", transform: "scale(1.2)"}}
                     onClick={toggleFullScreen} onTouchEnd={toggleFullScreen} transition="transform 0.3s 0s linear"
                     margin="15px">
                    ⤢
                </Box>
            </div>
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