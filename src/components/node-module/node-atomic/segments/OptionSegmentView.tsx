import React from 'react';
import {NodeStorage} from "../../NodeStorage";
import SegmentWrapper from "../SegmentWrapper";
import {Box, Center, useBoolean, VStack} from "@chakra-ui/react";
import {OptionSegment} from "../../../../logic/node-editor/segment/imp/OptionSegment";

const OptionSegmentView = (props: { model: OptionSegment<any>, storage: NodeStorage }) => {
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

                <Center w={"100%"} h={"20px"} bg={"gray.700"}
                        borderTopRadius={'md'}
                        borderBottomRadius={open ? 0 : 'md'}
                        onClick={() => setOpen.toggle()}>
                    {props.model.value}
                </Center>

                {open &&
                <VStack bg={"gray.700"} h={0} w='100%'
                        transform={"unset"} spacing={0}>
                    {props.model.possibleValues.map(value =>
                        <Center onClick={() => changeValue(value)}
                                pos='relative' top={`${iterate--}px`}
                            // boxSizing='content-box'
                            // borderTop='3px solid' borderColor={'gray.700'}
                                w='100%' bg={'gray.700'}
                                p={0} m={0}>
                            {value}
                        </Center>
                    )}
                    <Box
                        pos='relative' top={`${iterate--}px`}
                        w='100%' minH={"10px"}
                        borderBottomRadius='md' bg={'gray.700'}>
                    </Box>
                </VStack>
                }

            </Box>
        </SegmentWrapper>
    );
};

export default OptionSegmentView;