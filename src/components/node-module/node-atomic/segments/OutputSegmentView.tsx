import React from 'react';
import {Center, Flex} from "@chakra-ui/react";
import {SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
import Port from "../Port";

const OutputSegmentView = (props: { model: SegmentModel<any> }) => {
    return (
        <Flex ref={props.model.ref} w="100%">
            <Port/>
            <Center alignSelf="center" justifySelf="center">
                {props.model.label}
            </Center>
        </Flex>
    );
};

export default OutputSegmentView;