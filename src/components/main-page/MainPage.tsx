import {Box, Image} from '@chakra-ui/react';
import React from 'react';
import background from "../../resources/images/background.png"

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
        <Box h={'100%'} w={'100%'}>
            <Image src={background} h={"300px"} w={"100%"} objectFit={"cover"}/>
        </Box>
    );
};

export default MainPage;