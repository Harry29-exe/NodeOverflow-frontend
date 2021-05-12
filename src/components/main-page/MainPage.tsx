import {Box, Image} from '@chakra-ui/react';
import React from 'react';
import background from "../../resources/images/background.png"

const MainPage = () => {

    return (
        <Box h={'100%'} w={'100%'}>
            <Image src={background} maxH={"300px"} w={"100%"} objectFit={"cover"}/>
        </Box>
    );
};

export default MainPage;