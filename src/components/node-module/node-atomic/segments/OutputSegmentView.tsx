import {Flex} from '@chakra-ui/react';
import React from 'react';
import {NodeStorage} from "../../../../logic/node-editor/node-management/NodeStorage";
import SegmentWrapper from "../SegmentWrapper";
import {OutputSegment} from "../../../../logic/node-editor/segment/imp/OutputSegment";

const OutputSegmentView = (props: { model: OutputSegment, storage: NodeStorage }) => {

    return (
        <SegmentWrapper model={props.model} storage={props.storage}>
            <Flex justifyContent='flex-end' alignItems='center' w='100%'>
                {props.model.label}
            </Flex>
        </SegmentWrapper>
    );
};

export default OutputSegmentView;