import React from 'react';
import {Box} from "@chakra-ui/react";
import Navbar from "../navbar/Navbar";
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
        <Box pos="absolute" left={0} top={0} w={"100vw"} h={"100vh"}>
            <Navbar height={"50px"}/>
            <Box pos={"absolute"} top={"50px"} h={"calc(100vh - 50px)"}
                w={"100vw"}>
                <NodeModule nodes={testNodes}/>
            </Box>
        </Box>
    );
};

export default EditorPage;