import React, {useContext, useState} from 'react';
import {Box, Center, HStack, Input, Progress, VStack} from "@chakra-ui/react";
import {AuthContext} from "../../../../logic/auth/AuthContext";
import {getProjects, ProjectsFilters} from "../../../../logic/projects/GetProjects";
import ProjectDetails from "../../../../logic/projects/ProjectDetails";
import {RiArrowDropRightLine} from "react-icons/all";
import {Project} from "./Project";
import ProjectSearchBar from "../../../projects/ProjectSearchBar";

interface state {
    projects: ProjectDetails[] | null | "NOT LOGGED",
    allResults?: number;
    currentListStart?: number;
    lastRequest: number;
}

const ProjectBrowser = (props: { loadProject: (projectId: number) => void }) => {
    const [projectsState, setProjectsState] = useState<state>({projects: null, lastRequest: 0});
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState<ProjectsFilters | undefined>(undefined);
    const resultsPerPage = 8;
    const authContext = useContext(AuthContext);

    if ((projectsState.projects === null && Date.now() - projectsState.lastRequest > 2000) ||
        (projectsState.allResults !== undefined && projectsState.currentListStart !== (page - 1) * resultsPerPage)) {
        console.log(authContext.isLogged);
        if (!authContext.isLogged) {
            setProjectsState({projects: "NOT LOGGED", lastRequest: Date.now()})
        } else {
            setProjectsState({projects: null, lastRequest: Date.now()});
            getProjects(authContext, resultsPerPage, page, filters)
                .then(value => setProjectsState({
                    projects: value.projectDetails,
                    allResults: value.allResults,
                    currentListStart: value.listStart,
                    lastRequest: projectsState.lastRequest
                }));
        }
    }

    const calcPageCount = () => {
        return projectsState.allResults === undefined ?
            0
            :
            Math.ceil(projectsState.allResults / resultsPerPage)
    }

    const updateProjects = (newPage: number) => {
        getProjects(authContext, resultsPerPage, newPage, filters)
            .then(
                value => setProjectsState({
                    projects: value.projectDetails,
                    allResults: value.allResults,
                    currentListStart: value.listStart,
                    lastRequest: projectsState.lastRequest
                }),
                reason => console.log(reason));
        if(newPage !== page) {
            setPage(newPage);
        }
    }

    let key = 0;
    return (
        <VStack w={"100%"} px={'1.5%'} fontSize={'lg'} fontWeight={400} spacing={2} maxH={"70vh"} overflow={"auto"}>
            <ProjectSearchBar returnFilters={filters => {
                setFilters(filters);
                updateProjects(1);
            }}/>

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

                        <Progress size="2xl" isIndeterminate/>
            }

            <HStack>
                <Input type="number" w='80px' defaultValue={1} onChange={e => updateProjects(parseInt(e.target.value))}/>
                <Box>/</Box>
                <Input type="number" value={calcPageCount()} w='80px'
                       isDisabled/>
            </HStack>

        </VStack>
    );
};

export default ProjectBrowser;