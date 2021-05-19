import ProjectDetails from "../../../../logic/projects/ProjectDetails";
import {Box, Button, Center, Collapse, Flex, HStack, useBoolean, VStack} from "@chakra-ui/react";
import {RiArrowDropRightLine} from "react-icons/all";
import React from "react";

export const Project = (props: { project: ProjectDetails, loadProject: (projectId: number) => void }) => {
    const [open, setOpen] = useBoolean(false);

    let tagKey = 0;
    let collaboratorKey = 0;
    return (
        <Box w='100%' m={0} p={0} transition={'max-height 0.5s ease-in'}
             borderBottomRadius={'md'} border={"2px solid"}
             borderTop={"0px"} borderColor={"whiteAlpha.400"}>

            <HStack w='100%' minH={'40px'} cursor={'pointer'} onClick={setOpen.toggle} _hover={{bg: "blackAlpha.300"}}>
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
                    <Button variant={"ghost"} w='80%' h='30px' onClick={(e: any) => {
                        e.stopPropagation();
                        props.loadProject(props.project.id)
                    }}>
                        Load
                    </Button>
                </Center>
            </HStack>

            <Collapse in={open} animateOpacity>

                <Box mx={'2.5%'} w={'95%'} h={0} borderTop={"2px solid"} borderColor={"whiteAlpha.200"}/>

                <Flex fontWeight={300}>
                    <VStack w='100%' borderRadius={'md'}>
                        <Box fontWeight={400}>Tags:</Box>
                        {props.project.metadata.tags.map(t => <Box key={tagKey++}>{t}</Box>)}
                    </VStack>


                    {props.project.collaborators &&
                    <>
                        <VStack w='100%' borderRadius={'md'}>
                            <Box fontWeight={400}>Collaborators:</Box>
                            {props.project.collaborators.map(c =>
                                <Box key={collaboratorKey++}>{c.collaboratorUsername}</Box>)
                            }
                        </VStack>
                    </>
                    }
                </Flex>

            </Collapse>
        </Box>
    )
}