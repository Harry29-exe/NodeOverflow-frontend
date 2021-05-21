import React from 'react';
import {Flex, VStack} from "@chakra-ui/react";
import ProjectSearchBar from "./ProjectSearchBar";

const ProjectPage = () => {
    return (
        <Flex w='100%' h='100%' alignItems={'flex-start'} justifyContent={'center'}>
            <VStack w={'80%'} mt={'50px'}>
                <ProjectSearchBar/>
            </VStack>
        </Flex>
    );
};

export default ProjectPage;