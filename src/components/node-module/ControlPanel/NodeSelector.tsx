import {Box, VStack,} from '@chakra-ui/react';
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {NodeCreateFunction} from "../../../logic/node-editor/node-management/GlobalNodeFactory";
import nodeList from "../../../logic/node-editor/NodeList";
import {DefaultProjectStorage} from "../../../logic/node-editor/node-management/DefaultProjectStorage";
import NodeView from "../node-atomic/NodeView";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {ProjectStorage} from "../../../logic/node-editor/node-management/ProjectStorage";
import {useState} from "react";
import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";
import './NodeSelector.css';

interface HandleAddNodeFun {
    (screenX: number, screenY: number, createFun: NodeCreateFunction): void;
}

const viewProps: NodeCanvasViewProperties = new NodeCanvasViewProperties(1, 0, 0);
const standardDim = new NodeDimension(160, 26, 22, 22);
const tempStorage: ProjectStorage = new DefaultProjectStorage();

const reducer = (state: { y: number }, newValue: number) => {
    state.y = newValue;
    return {y: newValue};
}

//TODO poprwić żeby nie renderował się przy każdym update node module
const NodeSelector = (props: { isOpen: boolean, nodeDropped: (screenX: number, screenY: number, createFun: NodeCreateFunction) => void, distanceFromPageTop: string | number }) => {
    const [width, setWidth] = useState('224px');
    const defaultWidth = '224px';
    const nodes = nodeList;
    let childKey = 0;

    return (
        <Box position='relative'
             top='0' left='0'
             w={props.isOpen ? width : defaultWidth} zIndex={50}
             h={`calc(100vh - ${props.distanceFromPageTop}px)`}
             transform={`translate(${props.isOpen ? 0 : '-100%'}, 0) rotateY(180deg)`}
             transition={'transform 0.15s ease-in'}
             overflowY='scroll' overflowX='hidden' className={'SelectorScrollbar'}
        >
            <Box pos='inherit' w={width === '100%' ? '100%' : '214px'} h='inherit' transform={`rotateY(180deg)`}>

                <VStack alignItems='flex-start' spacing={'20px'} minH={`calc(100vh - ${props.distanceFromPageTop}px)`}
                        py={'12px'} pr={'10px'} pl={'22px'} borderRight={'2px solid'}
                        borderColor={'primary.400'} maxW={'214px'} bg={'gray.700'}>
                    {nodes.map(elem =>
                        <NodeAddButton key={childKey++} create={elem[1]} name={elem[0]}
                                       handleAddNode={props.nodeDropped}
                                       toggleWidth={() => setWidth(width !== '100%' ? '100%' : defaultWidth)}/>
                    )}
                </VStack>
            </Box>

            {/*<Box pos='absolute' w={'10px'} h='inherit' top={0} left={'100%'} bg={'gray.700'}/>*/}
        </Box>
    );
}

const NodeAddButton = (props: { name: string, create: NodeCreateFunction, toggleWidth: () => void, handleAddNode: HandleAddNodeFun }) => {
    const [currentNode, setNode] = useState<NodeModel>(
        props.create(tempStorage.useNextNodeId(), tempStorage.storageId, 0, 0, standardDim));
    const [height, setHeight] = useState(0);

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


    return (
        <Box onMouseUp={handleMouseUp} onMouseDown={props.toggleWidth} minW='100%' h={height}>
            <NodeView node={currentNode} storage={tempStorage} canvasScale={viewProps.scale}/>
        </Box>
    )
}


export default NodeSelector;