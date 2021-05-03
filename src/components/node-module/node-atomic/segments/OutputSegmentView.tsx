import {Flex} from '@chakra-ui/react';
import React from 'react';
import {SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
import {NodeStorage} from "../../NodeStorage";
import SegmentWrapper from "../SegmentWrapper";

const OutputSegmentView = (props: { model: SegmentModel<any>, storage: NodeStorage }) => {

    return (
        <SegmentWrapper model={props.model} storage={props.storage}>
            <Flex justifyContent='flex-end' alignItems='center' w='100%'>
                {props.model.label}
            </Flex>
        </SegmentWrapper>
    );
};

export default OutputSegmentView;