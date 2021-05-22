import React, {useContext, useState} from 'react';
import {Center, Flex, VStack} from "@chakra-ui/react";
import ProjectSearchBar from "./ProjectSearchBar";
import {getProjects, ProjectList, ProjectsFilters} from "../../logic/projects/GetProjects";
import {AuthContext} from "../../logic/auth/AuthContext";

const ProjectPage = () => {
    const [projects, setProjects] = useState<ProjectList | null>(null);
    const authContext = useContext(AuthContext);

    const updateProjects = (filters: ProjectsFilters) => {
        getProjects(authContext, 8, 1, filters)
            .then(
                value => setProjects(value),
                reason => console.log(reason));
    }

    return (
        <Flex w='100%' h='100%' alignItems={'flex-start'} justifyContent={'center'}>
            <VStack w={'100%'}>
                <VStack w={'80%'} mt={'50px'}>
                    <ProjectSearchBar returnFilters={updateProjects}/>
                </VStack>

                <VStack w='80%'>
                    {projects &&
                    projects.projectDetails.map(p => (
                        <Center w='100%' bg={'gray.800'} key={p.id}>
                            {p.metadata.title}
                        </Center>
                    ))}
                </VStack>
            </VStack>
        </Flex>
    );
};

export default ProjectPage;