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
        <Box onTouchStart={onTouchTest} pos={"absolute"} top={0} left={0} width="100%" height="%">
            Main page
        </Box>
    );
};

export default MainPage;