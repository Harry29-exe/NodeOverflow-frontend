import {Box, Center, Flex, HStack, Image, VStack} from '@chakra-ui/react';
import React from 'react';
import background from "../../resources/images/background2.png";
import editor1 from "../../resources/images/editor1.png";

const MainPage = () => {

    return (
        <Box h={'100%'} w={'100%'}>
            <VStack h="100%" w={"100%"} spacing={"15px"} overflow={"auto"}>

                <VStack w={"90%"} spacing={0} mt={"15px"} bg={"gray.750"}
                        border={"2px solid"} borderColor={"primary.400"} borderRadius={"25px"} >
                    <Image src={background} h={"250px"} w={"100%"} objectFit={"cover"} zIndex={10}  borderTopRadius={"25px"}/>

                    <Center w="100%"  fontWeight={400} fontSize={"22px"} py={"10px"} pos={"relative"}>
                        Free tool for image processing entirely based on concepts of flow programing .
                    </Center>
                </VStack>

                <Center w={"90%"} flexWrap={"wrap"} py={"15px"}>
                    <Center w="49%" h="75px" bg={"gray.750"} m={"5px"} borderRadius={"lg"}>About</Center>
                    <Center w="49%" h="75px" bg={"gray.750"} m={"5px"}>Examples</Center>
                    <Center w="49%" h="75px" bg={"gray.750"} m={"5px"}>About</Center>
                    <Center w="49%" h="75px" bg={"gray.750"} m={"5px"}>Examples</Center>
                </Center>

                <VStack bg={"gray.750"} w={"90%"} h={"400px"} borderRadius={"25px"}>
                    <VStack w={"50%"}>
                        <h3>No painting</h3>
                        <h6>Do everything what you typically do without need for painting skills</h6>
                    </VStack>

                    <Image src={editor1} minH={"200px"} w={"100%"} objectFit={"contain"} borderRadius={"25px"} zIndex={10}/>
                </VStack>

                <VStack bg={"gray.750"} w={"90%"} h={"400px"} borderRadius={"25px"}>
                    <VStack w={"50%"}>
                        <h3>No painting</h3>
                        <h6>Do everything what you typically do without need for painting skills</h6>
                    </VStack>

                    <Image src={editor1} minH={"200px"} w={"100%"} objectFit={"contain"} borderRadius={"25px"} zIndex={10}/>
                </VStack>

                {/*<VStack bg={"gray.750"} w={"90%"} h={"400px"} borderRadius={"25px"}>*/}
                {/*    <VStack w={"50%"}>*/}
                {/*        <h3>No painting</h3>*/}
                {/*        <h6>Do everything what you typically do without need for painting skills</h6>*/}
                {/*    </VStack>*/}

                {/*    <Image src={editor1} minH={"200px"} w={"100%"} objectFit={"contain"} borderRadius={"25px"} zIndex={10}/>*/}
                {/*</VStack>*/}
            </VStack>

        </Box>
    );
};

export default MainPage;