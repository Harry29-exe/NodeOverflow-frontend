import React from 'react';
import {Box} from "@chakra-ui/react";
import NodeModule from "./NodeModule";
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {ImageInputNode} from "../../logic/node-editor/node-implementations/ImageInputNode";
import {NodeDimension} from "../../logic/node-editor/node/NodeDimension";
import {LinkModel} from "../../logic/node-editor/LinkModel";
import {DefaultProjectStorage} from "../../logic/node-editor/node-management/DefaultProjectStorage";

const storage = new DefaultProjectStorage();

const added = {tf: true};

const testNodes: NodeModel[] = [
    new ImageInputNode(0, storage.storageId, 0, 0, new NodeDimension(160, 22, 26, 22)),
    new ImageInputNode(1, storage.storageId, 60, -80, new NodeDimension(160, 22, 26, 22)),
    new ImageInputNode(2, storage.storageId, -60, 80, new NodeDimension(160, 22, 26, 22)),
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