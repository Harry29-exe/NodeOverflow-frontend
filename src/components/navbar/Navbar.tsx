import React, {useState} from 'react';
import {mainColors} from "../../App";
import {Link as RouterLink} from "react-router-dom";
import {Box, Center, Image, Link} from "@chakra-ui/react";
import {RiFullscreenExitLine, RiFullscreenLine} from "react-icons/all";
import logo from "../../resources/images/logo.svg";
import UserNavbarSection from "./UserNavbarSection";

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

interface NavbarProps {
    height: number | string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ( props: NavbarProps) => {
    const [fullscreenOn, setFullscreen] = useState(true);

    return (
        <Box position="absolute" top={0} left={0} width="100vw" height={props.height}
             margin={0} padding={0} fontSize={"xl"} bg={"gray.700"}
             boxSizing={"border-box"} borderBottomWidth={"2px"} borderBottomColor={"primary.400"}
        >

            <Box style={{
                position: "absolute", width: "70%", height: "inherit",
                left: 0, top: 0, display: "flex", justifyContent: "flex-start", alignItems: "center",
                fontWeight: 600, color: "#fff"
            }}>

                <Center h={"100%"} boxSizing={"border-box"} _hover={{background: "rgba(0,0,0,0.2)"}}
                        padding={1} marginLeft={"10px"} transition={"background 0.3s 0s"}>
                    <Link as={RouterLink} to={"/"} h={"100%"}
                          _hover={{textStyle: "normal"}} _focus={{boxShadow: "none"}}>
                        <Image src={logo} h={"100%"}/>
                    </Link>
                </Center>

                <NavbarLink to={"/editor"}>
                    Editor
                </NavbarLink>

                <NavbarLink to={"/examples"}>
                    Examples
                </NavbarLink>
            </Box>

            <Box
                position="absolute" w={"30%"} height="inherit"
                left="70%" top={0} display="flex" justifyContent="flex-end" alignItems="center"
                fontWeight={600} color="#fff" fontSize="3.5vh" h="100%"
            >
                <Box bg="none" _hover={{
                    color: mainColors.headerColor, cursor: "pointer",
                    transform: fullscreenOn ? "scale(1.2)" : "scale(1)"
                }}
                     transform={fullscreenOn ? "scale(1)" : "scale(1.2)"}
                     onClick={() => {
                         toggleFullScreen();
                         setFullscreen(!fullscreenOn);
                     }}
                     onTouchEnd={toggleFullScreen} transition="transform 0.3s 0s linear"
                     margin="15px">

                    {
                        fullscreenOn ?
                            <RiFullscreenLine size="30px"/>
                            :
                            <RiFullscreenExitLine size="30px"/>
                    }

                </Box>

                <UserNavbarSection/>
            </Box>
        </Box>
    );
}

interface NavbarLinkProps extends React.ComponentProps<any> {
    to: string;
}

const NavbarLink: React.FunctionComponent<NavbarLinkProps> = (props: NavbarLinkProps): JSX.Element => {
    return (
        <Center h={"100%"} boxSizing={"border-box"} _hover={{background: "rgba(0,0,0,0.2)"}}
                padding={1} marginLeft={"10px"} transition={"background 0.3s 0s"}>
            <Link as={RouterLink} to={props.to} _hover={{textStyle: "normal"}} _focus={{boxShadow: "none"}}>
                {props.children}
            </Link>
        </Center>
    )
}

export default Navbar;