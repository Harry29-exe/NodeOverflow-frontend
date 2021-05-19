import React from 'react';
import {Box} from "@chakra-ui/react";
import NodeModule from "./NodeModule";
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {ImageInputNodeModel} from "../../logic/node-editor/node/implementations/ImageInputNodeModel";
import {NodeDimension} from "../../logic/node-editor/node/NodeDimension";
import {LinkModel} from "../../logic/node-editor/LinkModel";
import {DefaultProjectStorage} from "../../logic/node-editor/node-management/DefaultProjectStorage";

const storage = new DefaultProjectStorage();

const added = {tf: false};
const testNodes: NodeModel[] = [
    new ImageInputNodeModel(0, storage.storageId, 0, 0, new NodeDimension(160, 22, 26, 22)),
    new ImageInputNodeModel(1, storage.storageId, 60, -80, new NodeDimension(160, 22, 26, 22)),
    new ImageInputNodeModel(2, storage.storageId, -60, 80, new NodeDimension(160, 22, 26, 22)),
]

const testLinks: LinkModel[] = [
    // new LinkModel(testNodes[0].segments[1], testNodes[1].segments[1]),
    // new LinkModel(testNodes[0].segments[0], testNodes[1].segments[2]),
    // new LinkModel(testNodes[0].segments[1], testNodes[1].segments[1])
]


const EditorPage = () => {
    if (!added.tf) {
        testNodes.forEach(n => storage.handleAddNode(n));
        testLinks.forEach(l => storage.handleAddLink(l));
        added.tf = true;
    }
    return (
        <Box pos={"absolute"} top={0} h={"100%"} w={"100%"}>
            <NodeModule storage={storage}/>
        </Box>
    );
};

export default EditorPage;