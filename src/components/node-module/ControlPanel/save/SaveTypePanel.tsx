import React, {PropsWithChildren} from 'react';
import {Box, Center, Flex, VStack} from "@chakra-ui/react";
import {BsDownload, FaCloudUploadAlt} from "react-icons/all";

const SaveTypePanel = (props: { setSaveType: (type: "local" | "cloud") => void }) => {
    return (
        <VStack w='100%' fontSize={'lg'}>
            <Box fontSize='xl' fontWeight={700}>Where you want save your project?</Box>
            <Flex justifyContent='space-around' alignItems='center' minH='30vh' w='100%'>
                <SaveType onClick={() => props.setSaveType("cloud")}>
                    <Box fontSize={'100px'}><FaCloudUploadAlt/></Box>
                    <Box>In cloud</Box>
                </SaveType>

                <SaveType onClick={() => props.setSaveType("cloud")}>
                    <Box fontSize='100px'><BsDownload/></Box>
                    <Box>Download</Box>
                </SaveType>
            </Flex>
        </VStack>
    );
};

const SaveType = (props: PropsWithChildren<{ onClick: () => void }>) => {
    return (
        <Center minH='20vh' w='40%' border={"2px solid"} borderColor={"whiteAlpha.400"} borderRadius={'lg'}
                _hover={{bg: "whiteAlpha.100", cursor: 'pointer'}} onClick={props.onClick}>
            <VStack>
                {props.children}
            </VStack>
        </Center>
    )
}

export default SaveTypePanel;