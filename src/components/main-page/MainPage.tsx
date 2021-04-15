import {Box, Image} from '@chakra-ui/react';
import React from 'react';
import background from "../../resources/images/background.png"
import Navbar from "../navbar/Navbar";

const MainPage = () => {

    const onTouchTest = (event: any) => {
        if (event.touches.length === 1) {
            let startX = event.touches[0].screenX;
            let startY = event.touches[0].screenY;


        }
        let startX = event.touch
        const onMove = (event: any) => {

        }
        console.log(event.touches[0].screenX);
        console.log(event.screenY);
        console.log(event.touches.length);
    }

    return (
        <Box onTouchStart={onTouchTest} pos={"absolute"} top={0} left={0} width="100vw" height="vh">
            <Navbar height={"50px"}/>

            <Box h={`calc(100vh - "50px`} w={"100vw"}>
                <Image src={background} h={"100%"} w={"100%"} objectFit={"cover"}/>
            </Box>
        </Box>
    );
};

export default MainPage;