import React, {useState} from 'react';
import {
    Center,
    CloseButton,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    VStack
} from "@chakra-ui/react";
import {HiOutlinePlus} from "react-icons/all";

const SaveProjectForm = () => {
    const [tags, setTags] = useState<string[]>([""]);

    let tagId = 0;
    return (
        <VStack>
            <FormControl id="project-name">
                <FormLabel>Project name</FormLabel>
                <Input placeholder="Project name:"/>
            </FormControl>

            <FormControl>
                <FormLabel id="modifier">
                    <FormLabel>Select access modifier</FormLabel>
                    <Select defaultValue="PUBLIC">
                        <option>PUBLIC</option>
                        <option>PROTECTED</option>
                        <option>PRIVATE</option>
                    </Select>
                </FormLabel>
            </FormControl>

            <VStack w={"50%"}>
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