import React from 'react';
import {Box} from "@chakra-ui/react";
import NodeModule from "./NodeModule";
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {InputNodeModel} from "../../logic/node-editor/node/implementations/InputNodeModel";
import {NodeDimension} from "../../logic/node-editor/node/NodeDimension";

const testNodes: NodeModel[] = [
    new InputNodeModel(0, 0, 0, new NodeDimension(160, 22, 26, 22)),
]

const EditorPage = () => {
    return (
        <Box pos={"absolute"} top={0} h={"100%"} w={"100%"}>
            <NodeModule nodes={testNodes}/>
        </Box>

    );
};

export default EditorPage;