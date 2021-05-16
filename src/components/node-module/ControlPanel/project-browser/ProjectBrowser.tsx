import React, {useContext, useState} from 'react';
import {Box, Button, Center, Collapse, HStack, useBoolean, VStack} from "@chakra-ui/react";
import {AuthContext} from "../../../../logic/auth/AuthContext";
import {getProjects} from "../../../../logic/projects/GetProjects";
import ProjectDetails from "../../../../logic/projects/ProjectDetails";
import {RiArrowDropRightLine} from "react-icons/all";

const ProjectBrowser = () => {
    const [projects, setProjects] = useState<ProjectDetails[] | null>(null);
    const authContext = useContext(AuthContext);
    if (projects === null) {
        getProjects(authContext).then(value => setProjects(value));
    }

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
                    <Button variant={"ghost"} w='80%' h='30px'>
                        Load
                    </Button>
                </Center>
            </HStack>
            {projects !== null ?
                projects.map(p => <Project project={p}/>)
                :
                <div/>
            }
        </VStack>
    );
};

const Project = (props: { project: ProjectDetails }) => {
    const [open, setOpen] = useBoolean(false);

    return (
        <Box w='100%' m={0} p={0} transition={'max-height 0.5s ease-in'}
             borderBottomRadius={'md'} border={"2px solid"}
             borderTop={"0px"} borderColor={"whiteAlpha.400"}>

            <HStack w='100%' minH={'40px'} cursor={'pointer'} onClick={setOpen.toggle}>
                <Box mx={'5px'} transform={open ? "rotate(0)" : "rotate(0.25turn)"}
                     transition={"transform 0.1s linear"}>
                    <RiArrowDropRightLine/>
                </Box>
                <Center w={['70%', '50%', '36%']}>
                    {props.project.metadata.title}
                </Center>
                <Center w={['0', '25%', '18%']} display={['none', 'inline']}>mod date</Center>
                <Center w={['0', '0', '18%']} display={['none', 'none', 'inline']}>create date</Center>
                <Center w={['30%', '25%', '20%']}>
                    <Button variant={"ghost"} w='80%' h='30px'>
                        Load
                    </Button>
                </Center>
            </HStack>

            <Collapse in={open} animateOpacity>

                <Box mx={'2.5%'} w={'95%'} h={0} borderTop={"2px solid"} borderColor={"whiteAlpha.200"}/>
                <VStack w='100%' borderRadius={'md'}>
                    {props.project.metadata.tags.map(t => <Box>{t}</Box>)}
                </VStack>

            </Collapse>
        </Box>
    )
}

export default ProjectBrowser;