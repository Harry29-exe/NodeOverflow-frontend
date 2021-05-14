import {Flex} from '@chakra-ui/react';
import React from 'react';
import SegmentWrapper from "../SegmentWrapper";
import {OutputSegment} from "../../../../logic/node-editor/segment/imp/OutputSegment";
import SegmentProps from "../SegmentProps";

const OutputSegmentView = (props: SegmentProps<OutputSegment>) => {

    return (
        <SegmentWrapper model={props.model} storage={props.storage}>
            <Flex justifyContent='flex-end' alignItems='center' w='100%'>
                {props.model.label}
            </Flex>
        </SegmentWrapper>
    );
};

export default OutputSegmentView;