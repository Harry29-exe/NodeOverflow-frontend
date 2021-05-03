import React, {PropsWithChildren} from 'react';
import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";
import {Center, Flex} from "@chakra-ui/react";
import Port from "./Port";
import {NodeStorage} from "../NodeStorage";

type SegmentWrapperProps = {
    model: SegmentModel<any>,
    storage: NodeStorage,
}

const SegmentWrapper = (props: PropsWithChildren<SegmentWrapperProps>) => {
    const portSize = 15;

    return (
        <Flex ref={props.model.ref} width='100%'
              userSelect='none'
            // pointerEvents='none'
        >

            {props.model.hasInputPort &&
            <Port parent={props.model} storage={props.storage} portType='in'/>
            }

            <Center alignSelf="center" justifySelf="center"
                    my='4px' w={`calc(100% - ${2 * portSize}px)`}>
                {props.children}
            </Center>

            {props.model.hasOutputPort &&
            <Port parent={props.model} storage={props.storage} portType='out'/>
            }

        </Flex>
    );
};

export default SegmentWrapper;