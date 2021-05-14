import React from 'react';
import SegmentWrapper from "../SegmentWrapper";
import SegmentProps from "../SegmentProps";
import {Flex} from "@chakra-ui/react";
import {InputSegment} from "../../../../logic/node-editor/segment/imp/InputSegment";

const InputSegmentView = (props: SegmentProps<InputSegment>) => {
    return (
        <SegmentWrapper storage={props.storage} model={props.model}>
            <Flex justifyContent='flex-start' alignItems='center' w='100%'>
                {props.model.label}
            </Flex>
        </SegmentWrapper>
    );
};

export default InputSegmentView;