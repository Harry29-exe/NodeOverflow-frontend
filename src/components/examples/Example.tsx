import React from 'react';
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {LinkModel} from "../../logic/node-editor/LinkModel";
import {ExampleLink} from "./ExamplesPage";
import {Box} from "@chakra-ui/react";
import NodeModule from "../node-module/NodeModule";
import {ProjectStorage} from "../../logic/node-editor/node-management/ProjectStorage";

export interface ExampleProps {
    name: string,
    description: string,
    nodeModels: NodeModel[],
    linkModels: LinkModel[]
}

const Example = (props: ExampleLink) => {
    return (
        <Box>
            <NodeModule storage={{} as ProjectStorage}/>
        </Box>
    )
};


export default Example;