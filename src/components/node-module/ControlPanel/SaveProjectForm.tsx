import React, {useState} from 'react';
import {
    Box,
    Center,
    CloseButton,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    VStack
} from "@chakra-ui/react";
import {HiOutlinePlus} from "react-icons/all";

const BR = () => {
    return (
        <Center w={"100%"}>
            <Box w={'98%'} mx={'1%'} mt={'10px'} mb={'10px'} h={0} borderTop={"1px solid"}
                 borderColor={"whiteAlpha.400"}/>
        </Center>
    )
}

const SaveProjectForm = () => {
    const [tags, setTags] = useState<string[]>([""]);

    let tagId = 0;
    return (
        <VStack alignItems={'flex-start'} w='100%'>
            <FormControl id="project-name">
                <FormLabel>Project name</FormLabel>
                <Input placeholder="Project name:"/>
            </FormControl>

            <BR/>

            <HStack spacing={0} w='100%' alignItems={'stretch'} flexWrap={'wrap'}>

                <VStack w={"45%"} minW={'300px'}>
                    <FormControl w='100%'>
                        <FormLabel id="modifier">Select access modifier</FormLabel>
                        <Select defaultValue="PUBLIC">
                            <option>PUBLIC</option>
                            <option>PROTECTED</option>
                            <option>PRIVATE</option>
                        </Select>
                    </FormControl>

                    <BR/>

                    <Center fontWeight={400} fontSize={"lg"}>
                        Tags
                    </Center>

                    {
                        tags.map(t =>
                            <AddTag value={t}
                                    onChange={(v, id) => {
                                        let newTags = tags.slice(0);
                                        newTags[id] = v;
                                        setTags(newTags);
                                    }}
                                    remove={tagId => setTags(tags.slice(0, tagId).concat(tags.slice(tagId + 1)))}
                                    tagId={tagId++}/>
                        )
                    }

                    <IconButton w="100%" aria-label="add-tag" variant={"ghost"}
                                onClick={() => setTags(tags.concat([""]))}
                                icon={<HiOutlinePlus/>}/>
                </VStack>

                <Flex w={'10%'} justifyContent={'center'} alignItems={'stretch'}>
                    <Box w={0} borderRight={"1px solid"} borderColor={"whiteAlpha.400"}/>
                </Flex>

                <VStack w={"45%"} minW={'300px'} justifyContent={'flex-start'}>
                    <Center>Collaborators</Center>

                </VStack>
            </HStack>
        </VStack>
    );
};

const AddTag = (props: { tagId: number, value: string, onChange: (val: string, tagsId: number) => void, remove: (tagId: number) => void }) => {
    return (
        <InputGroup>
            <Input id={`tag${props.tagId}`} onChange={(e: any) => props.onChange(e.target.value, props.tagId)}
                   value={props.value}/>
            <InputRightElement onClick={() => props.remove(props.tagId)} children={<CloseButton/>}/>
        </InputGroup>
    )
}

export default SaveProjectForm;