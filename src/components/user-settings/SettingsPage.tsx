import React from 'react';
import {Box, Center, Flex, Input, Text, VStack} from "@chakra-ui/react";

const SettingsPage = () => {
    return (
        <Center w="100%" h="100%">
            <Flex minW="80%" minH={"75%"} border={"2px solid #888"} borderRadius={"lg"} overflow="hidden">
                <VStack w={["85px", "100px", "200px", "250px"]} bg="gray.700">
                    <Box>Option1</Box>
                    <Box>Option2</Box>
                    <Box>Option3</Box>
                    <Box>Option4</Box>
                </VStack>

                <Center flexGrow={1}>
                    <VStack margin={4}>
                        <Text fontSize="lg" fontWeight="bold">Username</Text>
                        <Input placeholder="Username" size="lg" maxW={"100%"}
                               boxSizing="border-box"/>


                        <Text fontSize="lg" fontWeight="bold">Email</Text>
                        <Input placeholder="Username" size="lg" maxW={"100%"}
                               boxSizing="border-box"/>

                        <Text fontSize="lg" fontWeight="bold">Password</Text>
                        <Input placeholder="Password" size="lg" maxW={"100%"}
                               boxSizing="border-box"/>
                    </VStack>
                </Center>
            </Flex>
        </Center>
    );
};

export default SettingsPage;