import {Box, VStack,} from '@chakra-ui/react';
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {NodeCreateFunction} from "../../../logic/node-editor/node-management/GlobalNodeFactory";
import nodeList from "../../../logic/node-editor/NodeList";
import {DefaultNodeStorage} from "../../../logic/node-editor/node-management/DefaultNodeStorage";
import NodeView from "../node-atomic/NodeView";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeStorage} from "../../../logic/node-editor/node-management/NodeStorage";
import {useRef, useState} from "react";
import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";
import './NodeSelector.css';

interface HandleAddNodeFun {
    (screenX: number, screenY: number, createFun: NodeCreateFunction): void;
}

const viewProps: NodeCanvasViewProperties = new NodeCanvasViewProperties(1, 0, 0);
const standardDim = new NodeDimension(160, 26, 22, 22);
const tempStorage: NodeStorage = new DefaultNodeStorage();

const reducer = (state: { y: number }, newValue: number) => {
    state.y = newValue;
    return {y: newValue};
}

const NodeSelector = (props: { isOpen: boolean, nodeDropped: (screenX: number, screenY: number, createFun: NodeCreateFunction) => void, distanceFromPageTop: string | number }) => {
    const [width, setWidth] = useState('224px');
    const nodes = nodeList;
    let childKey = 0;

    return (
        <Box position='relative'
             top='0' left='0'
             w={width} zIndex={50}
             h={`calc(100vh - ${props.distanceFromPageTop}px)`}
             transform={`translate(${props.isOpen ? 0 : '-100%'}) rotateY(180deg)`}
             transition={'transform 0.15s ease-in'}
             overflow='auto' className={'SelectorScrollbar'}
        >
            <Box pos='inherit' w={width === '100%' ? '100%' : '214px'} h='inherit' transform={`rotateY(180deg)`}>
                <VStack alignItems='flex-start' py={'12px'} pr={'10px'} pl={'22px'} borderRight={'2px solid'}
                        borderColor={'primary.400'} maxW={'214px'} bg={'gray.700'}>
                    {nodes.map(elem =>
                        <NodeAddButton key={childKey++} create={elem[1]} name={elem[0]}
                                       handleAddNode={props.nodeDropped}
                                       toggleWidth={() => setWidth(width !== '100%' ? '100%' : '224px')}/>
                    )}
                </VStack>
            </Box>
        </Box>
    );
}

const NodeAddButton = (props: { name: string, create: NodeCreateFunction, toggleWidth: () => void, handleAddNode: HandleAddNodeFun }) => {
    const [currentNode, setNode] = useState<NodeModel>(
        props.create(tempStorage.useNextNodeId(), tempStorage.storageId, 0, 0, standardDim));
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseUp = (event: any) => {
        props.toggleWidth();
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


    let currentRef = ref.current;
    return (
        <Box onMouseUp={handleMouseUp} onMouseDown={props.toggleWidth} minW='100%' h={height}>
            <NodeView node={currentNode} storage={tempStorage} canvasViewProps={viewProps}/>
        </Box>
    )
}


export default NodeSelector;