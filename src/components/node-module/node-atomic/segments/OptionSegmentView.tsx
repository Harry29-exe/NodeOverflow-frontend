import React from 'react';
import {SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
import {NodeStorage} from "../../NodeStorage";
import SegmentWrapper from "../SegmentWrapper";
import {Box, Select} from "@chakra-ui/react";

const OptionSegmentView = (props: { model: SegmentModel<any>, storage: NodeStorage }) => {
    return (
        <SegmentWrapper {...props}>
            <Box onClick={(e: any) => {
                e.stopPropagation();
                console.log("stopped")
            }}
                 onMouseDown={(e: any) => {
                     e.stopPropagation();
                     console.log("stopped")
                 }}
                 w='100%'>
                <Select size={'xs'}>
                    <option>val1</option>
                    <option>val2</option>
                    <option>val3</option>
                </Select>
            </Box>
        </SegmentWrapper>
    );
};

export default OptionSegmentView;