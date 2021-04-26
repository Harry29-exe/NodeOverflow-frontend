import React, {useEffect, useState} from 'react';
import "./Node.css";
import {DummyValueFunction} from "./NodeValueFunction";
import {NodeStorage} from "../NodeStorage";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeDimension, NodeModel} from "../../../logic/node-editor/NodeModel";
import {Box, useStyleConfig} from "@chakra-ui/react";
import {PressedKeys} from "../../../logic/GlobalKeyListener";

export class NodeComponentState {
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

export function createDefaultNode(id: number, name: string, x?: number, y?: number): NodeModel {
    x = x ? x : 0;
    y = y ? y : 0;
    return new NodeModel(id, name, x, y,
        new NodeDimension(180, 22, 25, 20),
        new DummyValueFunction());
}

const Node = (props: NodeComponentProps) => {
    const nodeBackgroundRef = React.createRef<HTMLDivElement>();
    const [state, setState] = useState<NodeComponentState>(
        new NodeComponentState(props.node.x, props.node.y,
            props.selected ? props.selected : false, false));
    const style = useStyleConfig("Node", undefined);
    let lastTouch: number = 0;
    let dim = props.node.dimensions;
    let height = props.node.height;

    const deleteNodeListener = (event: any) => {
        if (state.selected && (event.code === "Backspace" || event.code === "Delete")) {
            props.storage.handleRemoveNode(props.node);
        }
    }

    const handleClick = (event: any) => {
        event.preventDefault();
        state.selected = true
        setState(state);
        props.storage.handleUpdateNode(props.node);
        let mouseX = event.clientX, mouseY = event.clientY;
        let lastMoveTime = 0;

        const moveNode = (event: any) => {
            if (Date.now() - lastMoveTime < 10) {
                return;
            }
            lastMoveTime = Date.now();
            let x = state.x - (mouseX - event.clientX) / props.canvasViewProps.scale;
            let y = state.y - (mouseY - event.clientY) / props.canvasViewProps.scale;

            state.x = x;
            state.y = y;
            setState(state);
            props.node.x = x;
            props.node.y = y;

            mouseX = event.clientX;
            mouseY = event.clientY;
            props.storage.handleUpdateNode(props.node);
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
        console.log(PressedKeys.keys);
        if (nodeBackgroundRef.current && !shiftPressed) {
            let nodeBox = nodeBackgroundRef.current.getBoundingClientRect();
            if (event.clientX < nodeBox.left || event.clientX > nodeBox.left + nodeBox.width ||
                event.clientY < nodeBox.top || event.clientY > nodeBox.top + nodeBox.height) {
                state.selected = false;
                setState(state);
                window.removeEventListener("click", unselect);
            }
        } else if (!shiftPressed) {
            state.selected = false;
            setState(state);
            window.removeEventListener("click", unselect);
        }
    }

    const handleTouch = (event: any) => {
        event.preventDefault();
        props.storage.handleUpdateNode(props.node);
        state.selected = true;
        setState(state);
        let screenX = event.touches[0].clientX;
        let screenY = event.touches[0].clientY;
        if (state.aboutToDelete) {
            props.storage.handleRemoveNode(props.node);
        } else if (Date.now() - lastTouch < 500) {
            state.aboutToDelete = true;
            setState(state);
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
            let x = state.x - (screenX - touch.screenX) / props.canvasViewProps.scale;
            let y = state.y - (screenY - touch.screenY) / props.canvasViewProps.scale;

            state.x = x;
            state.y = y;
            setState(state);
            props.node.x = x;
            props.node.y = y;

            screenX = touch.screenX;
            screenY = touch.screenY;
            props.storage.handleUpdateNode(props.node);
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
            state.selected = false;
            state.aboutToDelete = false;
            setState(state);
            window.removeEventListener("touchstart", unselect);
        } else if (Date.now() - lastTouch > 10) {
            let nodeBox = nodeBackgroundRef.current.getBoundingClientRect();
            let touch = event.touches[event.touches.length - 1];
            if (touch.clientX < nodeBox.left || touch.clientX > nodeBox.left + nodeBox.width ||
                touch.clientY < nodeBox.top || touch.clientY > nodeBox.top + nodeBox.height) {
                state.selected = false;
                state.aboutToDelete = false;
                setState(state);
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
    }, [props]);


    return (
        <Box className={"nodeWrapper"}
             transform={`translate(${state.x}px, ${state.y}px`}
             transition={`transform 0.01s 0 ease-out`}>

            <div style={{position: "absolute", top: props.node.dimensions.headHeight}}>
            </div>

            {props.node.segments.map(s => s.createView(props.storage, props.canvasViewProps))}

            <Box ref={nodeBackgroundRef} className={"nodeBackground"}
                 onMouseDown={handleClick}
                 onTouchStart={handleTouch}
                 width={`${dim.width}px`}
                 height={`${height}px`}
                 borderRadius={props.node.dimensions.headHeight}
                 backgroundColor="gray.400"
                 boxShadow={"0 0 3px 2px " + (state.aboutToDelete ? "#c21414" :
                     state.selected ? "primary.400" : "#555e66")}
            >

                <Box draggable="false" className={"header"} style={{
                    width: props.node.dimensions.width,
                    height: props.node.dimensions.headHeight,
                    color: "#fff",
                    fontWeight: 400,
                    // backgroundColor: this.nodeStyle.headerColor
                }} bg="primary.400">
                    {props.node.name}
                </Box>

            </Box>

        </Box>
    );

}

export default Node;
