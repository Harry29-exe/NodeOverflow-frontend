import {Box, VStack,} from '@chakra-ui/react';
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {NodeCreateFunction} from "../../../logic/node-editor/node-management/GlobalNodeFactory";
import nodeList from "../../../logic/node-editor/node/NodeList";
import {DefaultNodeStorage} from "../../../logic/node-editor/node-management/DefaultNodeStorage";
import NodeView from "../node-atomic/NodeView";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeStorage} from "../../../logic/node-editor/node-management/NodeStorage";
import {useState} from "react";
import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";

interface HandleAddNodeFun {
    (screenX: number, screenY: number, createFun: NodeCreateFunction): void;
}

const viewProps: NodeCanvasViewProperties = new NodeCanvasViewProperties(1, 0, 0);
const standardDim = new NodeDimension(160, 26, 22, 22);
const tempStorage: NodeStorage = new DefaultNodeStorage();

const NodeSelector = (props: { isOpen: boolean, nodeDropped: (screenX: number, screenY: number, createFun: NodeCreateFunction) => void, distanceFromPageTop: string | number }) => {
    const nodes = nodeList;
    let childKey = 0;
    return (
        <Box position='fixed'
             top={props.distanceFromPageTop} left='0' zIndex={100}
             h={`calc(100vh - ${props.distanceFromPageTop}px)`}
             transform={`translate(${props.isOpen ? 0 : '-100%'})`}
             transition={'transform 0.3s linear'}
             bg={'gray.700'}
        >
            <VStack alignItems='flex-start' m={'10px'} minW={'160px'}>
                {nodes.map(elem =>
                    <NodeAddButton key={childKey++} create={elem[1]} name={elem[0]} handleAddNode={props.nodeDropped}/>
                )}
            </VStack>
        </Box>
    );
}

const NodeAddButton = (props: { name: string, create: NodeCreateFunction, handleAddNode: HandleAddNodeFun }) => {
    const [currentNode, setNode] = useState<NodeModel>(
        props.create(tempStorage.useNextNodeId(), tempStorage.storageId, 0, 0, standardDim));
    const [height, setHeight] = useState(0);

    const handleMouseUp = (event: any) => {
        setNode(props.create(tempStorage.useNextNodeId(), tempStorage.storageId));
        props.handleAddNode(event.clientX, event.clientY, props.create);
    }

    let nodeElem = document.getElementById(currentNode.domId)
    if (nodeElem === null) {
        setTimeout(() => setHeight(0), 10);
    } else {
        let h = nodeElem.getBoundingClientRect().height;
        if (h !== height) {
            setHeight(h);
        }
    }

    return (
        <Box w='100%' h={height}
             onMouseUp={handleMouseUp}
        >
            <NodeView node={currentNode} storage={tempStorage}
                      canvasViewProps={viewProps}/>
        </Box>
    )
}


export default NodeSelector;