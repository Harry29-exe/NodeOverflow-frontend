import React, {PropsWithChildren} from 'react';
import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";
import {Box, Center, Flex, useMultiStyleConfig} from "@chakra-ui/react";
import Port from "./Port";
import {NodeStorage} from "../../../logic/node-editor/node-management/NodeStorage";

type SegmentWrapperProps = {
    model: SegmentModel<any>,
    storage: NodeStorage,
}

const SegmentWrapper = (props: PropsWithChildren<SegmentWrapperProps>) => {
    const styles = useMultiStyleConfig("Segment", undefined);
    const portSize = 15;

    return (
        <Flex width='100%' userSelect='none'>

            {props.model.hasInputPort ?
                <Port parent={props.model} storage={props.storage} portType='in'/>
                :
                <Box w='15px'/>
            }

            <Center __css={styles.segment} w={`calc(100% - ${2 * portSize}px)`}>
                {props.children}
            </Center>

            {props.model.hasOutputPort ?
                <Port parent={props.model} storage={props.storage} portType='out'/>
                :
                <Box w='15px'/>
            }
        </Flex>
    );
};

export default SegmentWrapper;