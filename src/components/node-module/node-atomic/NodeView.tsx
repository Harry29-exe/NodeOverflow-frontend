import React, {useEffect, useReducer, useRef} from 'react';
import "./Node.css";
import {NodeStorage} from "../NodeStorage";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {Box, Center, useMultiStyleConfig, VStack} from "@chakra-ui/react";
import {PressedKeys} from "../../../logic/contexts/GlobalKeyListener";

class NodeComponentState {
    public x: number;
    public y: number;
    public selected: boolean;
    public aboutToDelete: boolean;


    constructor(x: number, y: number, selected: boolean, aboutToDelete: boolean) {
        this.x = x;
        this.y = y;
        this.selected = selected;
        this.aboutToDelete = aboutToDelete;
    }
}

const createNodeComponentState = (props: NodeComponentProps): NodeComponentState => {
    return new NodeComponentState(props.node.x, props.node.y,
        props.selected ? props.selected : false, false);
}

function nodeStateReducer(state: NodeComponentState, action: any) {
    let x = action.x === undefined ? state.x : action.x;
    let y = action.y === undefined ? state.y : action.y;
    let selected = action.selected === undefined ? state.selected : action.selected;
    let aboutToDelete = action.aboutToDelete === undefined ?
        state.aboutToDelete : action.aboutToDelete;
    return new NodeComponentState(x, y, selected, aboutToDelete);
}

export class NodeComponentProps {
    public node: NodeModel;
    public storage: NodeStorage;
    public canvasViewProps: NodeCanvasViewProperties;
    public selected?: boolean;

    constructor(node: NodeModel, storage: NodeStorage, currentScale: NodeCanvasViewProperties, selected?: boolean) {
        this.node = node;
        this.storage = storage;
        this.canvasViewProps = currentScale;
        this.selected = selected;
    }
}

const NodeView = (props: NodeComponentProps) => {
    const nodeBackgroundRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useReducer(nodeStateReducer, createNodeComponentState(props));
    let lastTouch: number = 0;
    let dim = props.node.dimensions;
    let height = props.node.height;

    const deleteNodeListener = (event: any) => {
        if (state.selected && (event.code === "Backspace" || event.code === "Delete")) {
            props.storage.handleRemoveNode(props.node);
        }
    }

    const handleClick = (event: any) => {
        // event.preventDefault();
        setState({selected: true});
        props.storage.handleUpdateNode(props.node);
        let mouseX = event.clientX, mouseY = event.clientY;
        let lastMoveTime = 0;

        const moveNode = (event: any) => {
            if (Date.now() - lastMoveTime < 10) {
                return;
            }
            lastMoveTime = Date.now();

            let node = props.node;
            node.x -= (mouseX - event.clientX) / props.canvasViewProps.scale;
            node.y -= (mouseY - event.clientY) / props.canvasViewProps.scale;

            setState({x: node.x, y: node.y});

            mouseX = event.clientX;
            mouseY = event.clientY;

            // props.node.links.forEach(link => link.update());
            // props.storage.handleUpdateNode(props.node);
        }

        const cleanUp = (event: any) => {
            window.removeEventListener("mousemove", moveNode);
            window.removeEventListener("mouseup", cleanUp);
        }

        window.addEventListener("click", unselect);
        window.addEventListener("mousemove", moveNode);
        window.addEventListener("mouseup", cleanUp);
    }

    const unselect = (event: any) => {
        let shiftPressed = PressedKeys.keys.includes("ShiftLeft");

        if (nodeBackgroundRef.current && !shiftPressed) {
            let nodeBox = nodeBackgroundRef.current.getBoundingClientRect();
            if (event.clientX < nodeBox.left || event.clientX > nodeBox.left + nodeBox.width ||
                event.clientY < nodeBox.top || event.clientY > nodeBox.top + nodeBox.height) {
                setState({selected: false});

                window.removeEventListener("click", unselect);
            }
        } else if (!shiftPressed) {
            setState({selected: false});
            window.removeEventListener("click", unselect);
        }
    }

    const handleTouch = (event: any) => {
        // event.preventDefault();
        props.storage.handleUpdateNode(props.node);
        setState({selected: true});
        let screenX = event.touches[0].clientX;
        let screenY = event.touches[0].clientY;
        if (state.aboutToDelete) {
            props.storage.handleRemoveNode(props.node);
        } else if (Date.now() - lastTouch < 500) {
            setState({aboutToDelete: true});
            console.log(Date.now() - lastTouch);
        }
        lastTouch = Date.now();
        let lastMoveTime = 0;

        const moveNode = (event: any) => {
            if (Date.now() - lastMoveTime < 10 || event.touches.length > 1) {
                return;
            }
            lastMoveTime = Date.now();

            let touch = event.touches[0];
            let node = props.node;
            node.x = node.x - (screenX - touch.screenX) / props.canvasViewProps.scale;
            node.y = node.y - (screenY - touch.screenY) / props.canvasViewProps.scale;

            setState({x: node.x, y: node.y});

            screenX = touch.screenX;
            screenY = touch.screenY;

            // props.node.links.forEach(link => link.update());
            // props.storage.handleUpdateNode(props.node);
        }

        const cleanUp = (event: any) => {
            window.removeEventListener("touchmove", moveNode);
            window.removeEventListener("touchend", cleanUp);
        }

        window.addEventListener("touchstart", touchUnselect);
        window.addEventListener("touchmove", moveNode);
        window.addEventListener("touchend", cleanUp);
    }

    const touchUnselect = (event: any) => {
        if (!nodeBackgroundRef.current) {
            console.log("no ref");

            setState({selected: false, aboutToDelete: false});
            window.removeEventListener("touchstart", unselect);
        } else if (Date.now() - lastTouch > 10) {
            let nodeBox = nodeBackgroundRef.current.getBoundingClientRect();
            let touch = event.touches[event.touches.length - 1];
            if (touch.clientX < nodeBox.left || touch.clientX > nodeBox.left + nodeBox.width ||
                touch.clientY < nodeBox.top || touch.clientY > nodeBox.top + nodeBox.height) {

                setState({selected: false, aboutToDelete: false});
                window.removeEventListener("touchstart", unselect);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", deleteNodeListener);

        return () => {
            window.removeEventListener("keydown", deleteNodeListener);
            window.removeEventListener("touchstart", touchUnselect);
            window.removeEventListener("click", unselect);
        };
    }, [props.node.id]);

    const style = useMultiStyleConfig("Node", undefined);


    return (
        <div className={"Node"} style={{
            transform: `translate(${state.x}px, ${state.y}px)`
        }}>
            <Box ref={nodeBackgroundRef}
                 onClick={() => console.log("box")}
                 onMouseDown={handleClick}
                 onTouchStart={handleTouch}
                 sx={style.background}
                 width={`${dim.width}px`}
                 boxShadow={"0 0 3px 2px " + (state.aboutToDelete ? "#c21414" : state.selected ? "#29998e" : "#555e66")}
            >
                <VStack w={`100%`} zIndex={1} spacing={0}>
                    <Center sx={style.header}
                            boxShadow={"0 0 0 1px #3c454f"}
                            width={`100%`}
                            height={`${dim.headHeight}px`}
                            _hover={{cursor: 'default', userSelect: 'none'}}
                            _selection={{userSelect: 'none'}}>
                        {props.node.name}
                    </Center>

                    {props.node.segments.map(s => s.createView(props.storage))}

                    <Box h={`${dim.footerHeight}px`}/>
                </VStack>
            </Box>
        </div>
    );
}

export default NodeView;
