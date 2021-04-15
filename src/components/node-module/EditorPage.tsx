import React from 'react';
import {Box} from "@chakra-ui/react";
import NodeModule from "./NodeModule";
import {NodeModel} from "./node-atomic/NodeModel";
import {CreateImageInputNode} from "./nodes/ImageInputNode";
import {CreateOutputNode} from "./nodes/OutputNode";
import {CreateClampImageNode} from "./nodes/CapBrightnessNode";
import {CreateContrastNode} from "./nodes/ContrastNode";

const testNodes: NodeModel[] = [
    CreateImageInputNode(1, -360, -60),
    CreateOutputNode(2, 220, 80),
    CreateClampImageNode(3, 0, 0),
    CreateContrastNode(4, 100, 0)
]

const EditorPage = () => {
    return (
        <Box pos={"absolute"} top={0} h={"100%"} w={"100%"}>
            <NodeModule nodes={testNodes}/>
        </Box>

    );
};

export default EditorPage;