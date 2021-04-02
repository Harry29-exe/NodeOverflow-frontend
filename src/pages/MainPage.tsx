import {Box} from '@chakra-ui/react';
import React from 'react';

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
        <Box onTouchStart={onTouchTest} width="100vw" height="100vh">
            Main page
        </Box>
    );
};

export default MainPage;