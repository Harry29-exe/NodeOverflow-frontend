import React, {useContext, useState} from 'react';
import {Box, Center, HStack, VStack} from "@chakra-ui/react";
import {AuthContext} from "../../../../logic/auth/AuthContext";
import {getProjects} from "../../../../logic/projects/GetProjects";
import ProjectDetails from "../../../../logic/projects/ProjectDetails";
import {RiArrowDropRightLine} from "react-icons/all";
import {Project} from "./Project";

interface state {
    projects: ProjectDetails[] | null | "NOT LOGGED",
    lastRequest: number
}

const ProjectBrowser = (props: { loadProject: (projectId: number) => void }) => {
    const [projectsState, setProjectsState] = useState<state>({projects: null, lastRequest: 0});
    const authContext = useContext(AuthContext);
    if (projectsState.projects === null && Date.now() - projectsState.lastRequest > 2000) {
        console.log(authContext.isLogged);
        if (!authContext.isLogged) {
            setProjectsState({projects: "NOT LOGGED", lastRequest: Date.now()})
        } else {
            setProjectsState({projects: null, lastRequest: Date.now()})
            getProjects(authContext).then(value => setProjectsState({
                projects: value,
                lastRequest: projectsState.lastRequest
            }));
        }
    }

    let key = 0;
    return (
        <VStack w={"100%"} px={'1.5%'} fontSize={'lg'} fontWeight={400} spacing={2} maxH={"70vh"} overflow={"auto"}>
            <HStack w='100%' bg={"primary.500"} minH={'40px'} borderRadius={'md'}>
                <Box mx={'5px'} opacity={0}>
                    <RiArrowDropRightLine/>
                </Box>
                <Center w={['70%', '50%', '36%']}>
                    Title
                </Center>
                <Center w={['0', '25%', '18%']} display={['none', 'inline']}>last modification</Center>
                <Center w={['0', '0', '18%']} display={['none', 'none', 'inline']}>creation date</Center>
                <Center w={['30%', '25%', '20%']}>
                    Load
                </Center>
            </HStack>
            {
                projectsState.projects === "NOT LOGGED" ?
                    <Center fontSize={"lg"} fontWeight={700}>
                        To be able to load projects you need to log in
                    </Center>

                    :

                    projectsState.projects !== null ?
                        projectsState.projects.map(p => <Project project={p} loadProject={props.loadProject}
                                                                 key={key++}/>)
                        :

                        <div/>
            }
        </VStack>
    );
};

export default ProjectBrowser;