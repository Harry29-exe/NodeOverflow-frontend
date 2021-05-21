import React, {useState} from 'react';
import {
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    useBoolean,
    VStack
} from "@chakra-ui/react";
import {AiOutlineSearch, BsChevronBarDown} from "react-icons/all";

const ProjectSearchBar = () => {
    const [searchPhrase, setPhrase] = useState("")
    const [uncoiled, setUncoiled] = useBoolean(false);

    return (
        <VStack minW={['340px', '540px', '840px']} w={'100%'} border='2px solid' borderColor={'whiteAlpha.400'}
                borderRadius={'lg'} p={'20px'}>
            <VStack spacing={0} w='50%' minW={['300px', '500px', '800px']} border='2px solid'
                    borderColor={'whiteAlpha.400'} borderRadius={'lg'} overflow='hidden'>
                <Center p={'10px'} minW={['300px', '500px', '800px']} w='100%'>
                    <Input flexGrow={1} mr={'10px'} type={'text'} onChange={e => setPhrase(e.target.value)}/>
                    <Button size={'md'}>
                        <AiOutlineSearch/>
                    </Button>
                </Center>

                <Center w={'100%'} h={'20px'} bg={'whiteAlpha.400'} _hover={{bg: "primary.400", cursor: "pointer"}}
                        onClick={setUncoiled.toggle}>
                    <BsChevronBarDown
                        style={{transition: "transform 0.5s", transform: `rotateX(${uncoiled ? 0.5 : 0}turn)`}}/>
                </Center>
            </VStack>

            <Collapse in={uncoiled}>
                <Flex w='100%' flexWrap='wrap' alignItems={'stretch'}>
                    <VStack m={'15px'} flexGrow={1}>
                        <Box fontSize={'lg'} fontWeight={700}>General</Box>
                        <FormControl>
                            <FormLabel>Access modifier</FormLabel>
                            <Select placeholder="Access modifier">
                                <option>Public</option>
                                <option>Private</option>
                                <option>Protected</option>
                            </Select>
                        </FormControl>
                        <Select>
                            <option></option>
                        </Select>
                    </VStack>

                    <Box w={0} mx={'25px'} border={'1px solid'} borderColor={'whiteAlpha.400'}
                         display={['none', 'inline']}/>

                    <VStack m={'15px'} flexGrow={2}>
                        <Box fontSize={'lg'} fontWeight={700}>Creation date:</Box>
                        <FormControl>
                            <FormLabel>from:</FormLabel>
                            <Input type="date"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>to:</FormLabel>
                            <Input type="date"/>
                        </FormControl>
                    </VStack>
                    <VStack m={'15px'} flexGrow={2}>
                        <Box fontSize={'lg'} fontWeight={700}>Creation date:</Box>
                        <FormControl>
                            <FormLabel>from:</FormLabel>
                            <Input type="date"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>to:</FormLabel>
                            <Input type="date"/>
                        </FormControl>
                    </VStack>
                </Flex>
            </Collapse>


        </VStack>
    );
};

const SearchResult = () => {

}

export default ProjectSearchBar;