import React from 'react';
import {Box} from "@chakra-ui/react";
import NodeModule from "./NodeModule";
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {InputNodeModel} from "../../logic/node-editor/node/implementations/InputNodeModel";
import {NodeDimension} from "../../logic/node-editor/node/NodeDimension";
import {LinkModel} from "../../logic/node-editor/LinkModel";

const testNodes: NodeModel[] = [
    new InputNodeModel(0, 0, 0, 0, new NodeDimension(160, 22, 26, 22)),
    new InputNodeModel(1, 0, 60, -80, new NodeDimension(160, 22, 26, 22)),
    new InputNodeModel(2, 0, -60, 80, new NodeDimension(160, 22, 26, 22)),
]

const testLinks: LinkModel[] = [
    new LinkModel(testNodes[0].segments[1], testNodes[1].segments[1]),
    new LinkModel(testNodes[0].segments[0], testNodes[1].segments[2]),
    // new LinkModel(testNodes[0].segments[1], testNodes[1].segments[1])
]

const EditorPage = () => {
    return (
        <Box pos={"absolute"} top={0} h={"100%"} w={"100%"}>
            <NodeModule nodes={testNodes} links={testLinks}/>
        </Box>
    );
};

export default EditorPage;