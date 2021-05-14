import React from 'react';
import SegmentWrapper from "../SegmentWrapper";
import {Box, Center, useBoolean, VStack} from "@chakra-ui/react";
import {OptionSegment} from "../../../../logic/node-editor/segment/imp/OptionSegment";
import SegmentProps from "../SegmentProps";

const OptionSegmentView = (props: SegmentProps<OptionSegment<any>>) => {
    const [open, setOpen] = useBoolean(false);
    let ref = React.useRef<HTMLDivElement>(null);
    const changeValue = (value: any) => {
        props.model.value = value;
        setOpen.off();
    }

    let iterate = -1;
    return (
        <SegmentWrapper {...props}>
            <Box onClick={(e: any) => e.stopPropagation()}
                 onMouseDown={(e: any) => e.stopPropagation()}
                 w='100%' ref={ref}>

                <Center w={"100%"} bg={"gray.700"}
                        cursor='pointer'
                        borderTopRadius={'md'}
                        borderBottomRadius={open ? 0 : 'md'}
                        onClick={() => setOpen.toggle()}>
                    {props.model.value}
                </Center>

                {open &&
                <VStack spacing={0} h={0} w='100%'
                        transform={"unset"}>

                    <Center pos='relative' top={`${iterate--}px`} w='100%' bg={'gray.700'} paddingBottom={'1px'}>
                        <Box w='90%' bg={'primary.400'} h='1px' borderRadius='1px'/>
                    </Center>

                    {props.model.possibleValues.map(value =>
                        <MappedValue val={value} changeValue={changeValue} offset={iterate--}/>)
                    }

                    <Box pos='relative' top={`${iterate--}px`}
                         w='100%' minH={"10px"}
                         borderBottomRadius='md' bg={'gray.700'}>
                    </Box>
                </VStack>
                }

            </Box>
        </SegmentWrapper>
    );
};

const MappedValue = (props: { val: any, changeValue: (v: any) => void, offset: number }) => {
    return (
        <Center onClick={() => props.changeValue(props.val)}
                pos='relative' top={`${props.offset}px`}
                w='100%' bg={'gray.700'}
                p={0} m={0}>
            <Center _hover={{bg: "gray.800", cursor: "pointer"}} w='90%' h='90%' borderRadius='md'>
                {props.val}
            </Center>
        </Center>
    )
}

export default OptionSegmentView;