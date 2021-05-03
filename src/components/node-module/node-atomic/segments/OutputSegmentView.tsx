import React from 'react';
import {SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
import {NodeStorage} from "../../NodeStorage";
import SegmentWrapper from "../SegmentWrapper";

const OutputSegmentView = (props: { model: SegmentModel<any>, storage: NodeStorage }) => {

    return (
        <SegmentWrapper model={props.model} storage={props.storage}>
            {props.model.label}
        </SegmentWrapper>
    );
};

export default OutputSegmentView;

// <Flex ref={props.model.ref} __css={styles.wrapper}>
//     {props.model.hasInputPort &&
//         <Port parent={props.model} storage={props.storage}/>
//     }
//
//     {props.model.hasOutputPort &&
//         <Port parent={props.model} storage={props.storage}/>
//     }
//
//     <Center alignSelf="center" justifySelf="center"
//             pointerEvents="auto">
//         {props.model.label}
//     </Center>
//
// </Flex>