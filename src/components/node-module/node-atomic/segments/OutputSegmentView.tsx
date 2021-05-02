import React from 'react';
import {Center, Flex} from "@chakra-ui/react";
import {SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
import Port from "../Port";

const OutputSegmentView = (props: { model: SegmentModel<any> }) => {
    return (
        <Flex ref={props.model.ref} w="100%"
              userSelect="none" pointerEvents="none">
            <Port/>

            <Center alignSelf="center" justifySelf="center"
                    pointerEvents="auto" onClick={() => console.log("flex")}>
                {props.model.label}
            </Center>

        </Flex>
    );
};

export default OutputSegmentView;