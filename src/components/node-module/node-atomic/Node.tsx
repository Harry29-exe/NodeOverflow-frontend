import React, {PureComponent} from 'react';
import "./Node.css";
import {DummyValueFunction} from "./NodeValueFunction";
import {NodeStorage} from "../NodeStorage";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeDimension, NodeModel, NodeStyle} from "./NodeModel";
import {Box} from "@chakra-ui/react";
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

class Node extends PureComponent<NodeComponentProps, NodeComponentState> {
    private _nodeBackgroundRef = React.createRef<HTMLDivElement>();
    private readonly width: number;
    private readonly height: number;
    private readonly nodeStyle: NodeStyle;
    private lastTouch: number = 0;

    constructor(props: NodeComponentProps) {
        super(props);
        let node = this.props.node;
        this.width = node.dimensions.width;
        this.height = (node.dimensions.headHeight
            + node.dimensions.segmentHeight * node.segments.length
            + node.dimensions.footerHeight);
        this.nodeStyle = props.node.style;

        this.state = new NodeComponentState(
            this.props.node.x,
            this.props.node.y,
            props.selected ? props.selected : false,
            false);
    }

    deleteNodeListener = (event: any) => {
        if (this.state.selected && (event.code === "Backspace" || event.code === "Delete")) {

            this.props.storage.handleRemoveNode(this.props.node);
        }
    }

    handleClick = (event: any) => {
        event.preventDefault();
        this.setState({selected: true});

        this.props.storage.handleUpdateNode(this.props.node);
        let mouseX = event.clientX, mouseY = event.clientY;
        let lastMoveTime = 0;

        const moveNode = (event: any) => {
            if (Date.now() - lastMoveTime < 10) {
                return;
            }
            lastMoveTime = Date.now();
            let x = this.state.x - (mouseX - event.clientX) / this.props.canvasViewProps.scale;
            let y = this.state.y - (mouseY - event.clientY) / this.props.canvasViewProps.scale;

            this.setState({x: x, y: y});
            this.props.node.x = x;
            this.props.node.y = y;

            mouseX = event.clientX;
            mouseY = event.clientY;
            this.props.storage.handleUpdateNode(this.props.node);
        }

        const cleanUp = (event: any) => {
            window.removeEventListener("mousemove", moveNode);
            window.removeEventListener("mouseup", cleanUp);
        }

        window.addEventListener("click", this.unselect);
        window.addEventListener("mousemove", moveNode);
        window.addEventListener("mouseup", cleanUp);
    }

    unselect = (event: any) => {
        let shiftPressed = PressedKeys.keys.includes("ShiftLeft");
        console.log(PressedKeys.keys);
        if (this._nodeBackgroundRef.current && !shiftPressed) {
            let nodeBox = this._nodeBackgroundRef.current.getBoundingClientRect();
            if (event.clientX < nodeBox.left || event.clientX > nodeBox.left + nodeBox.width ||
                event.clientY < nodeBox.top || event.clientY > nodeBox.top + nodeBox.height) {
                this.setState({selected: false});
                window.removeEventListener("click", this.unselect);
            }
        } else if (!shiftPressed) {
            this.setState({selected: false});
            window.removeEventListener("click", this.unselect);
        }
    }

    handleTouch = (event: any) => {
        event.preventDefault();
        this.props.storage.handleUpdateNode(this.props.node);
        this.setState({selected: true});
        let screenX = event.touches[0].clientX;
        let screenY = event.touches[0].clientY;
        if (this.state.aboutToDelete) {
            this.props.storage.handleRemoveNode(this.props.node);
        } else if (Date.now() - this.lastTouch < 500) {
            this.setState({aboutToDelete: true});
            console.log(Date.now() - this.lastTouch);
        }
        this.lastTouch = Date.now();
        let lastMoveTime = 0;

        const moveNode = (event: any) => {
            if (Date.now() - lastMoveTime < 10 || event.touches.length > 1) {
                return;
            }
            lastMoveTime = Date.now();
            let touch = event.touches[0];
            let x = this.state.x - (screenX - touch.screenX) / this.props.canvasViewProps.scale;
            let y = this.state.y - (screenY - touch.screenY) / this.props.canvasViewProps.scale;

            this.setState({x: x, y: y});
            this.props.node.x = x;
            this.props.node.y = y;

            screenX = touch.screenX;
            screenY = touch.screenY;
            this.props.storage.handleUpdateNode(this.props.node);
        }

        const cleanUp = (event: any) => {
            window.removeEventListener("touchmove", moveNode);
            window.removeEventListener("touchend", cleanUp);
        }

        window.addEventListener("touchstart", this.touchUnselect);
        window.addEventListener("touchmove", moveNode);
        window.addEventListener("touchend", cleanUp);
    }

    touchUnselect = (event: any) => {
        if (!this._nodeBackgroundRef.current) {
            console.log("no ref");
            this.setState({selected: false, aboutToDelete: false});
            window.removeEventListener("touchstart", this.unselect);
        } else if (Date.now() - this.lastTouch > 10) {
            let nodeBox = this._nodeBackgroundRef.current.getBoundingClientRect();
            let touch = event.touches[event.touches.length - 1];
            if (touch.clientX < nodeBox.left || touch.clientX > nodeBox.left + nodeBox.width ||
                touch.clientY < nodeBox.top || touch.clientY > nodeBox.top + nodeBox.height) {
                console.log(`screenX: ${touch.screenX}, left: ${nodeBox.left}, width: ${nodeBox.width}`);
                console.log(`screenY: ${touch.screenY}, top: ${nodeBox.top}, height: ${nodeBox.height}`);
                console.log(`${this.props.node.id}`);
                this.setState({selected: false, aboutToDelete: false});
                window.removeEventListener("touchstart", this.unselect);
            }
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.deleteNodeListener);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.deleteNodeListener);
        window.removeEventListener("touchstart", this.touchUnselect);
        window.removeEventListener("click", this.unselect);
    }

    render() {
        return (
            <div className={"nodeWrapper"} style={{
                transform: `translate(${this.state.x}px, ${this.state.y}px`
                , transition: `transform 0.01s 0 ease-out`
            }}>
                <div style={{position: "absolute", top: this.props.node.dimensions.headHeight}}>
                </div>

                {this.props.node.segments.map(s => s.createView(this.props.storage, this.props.canvasViewProps))}

                <div ref={this._nodeBackgroundRef} className={"nodeBackground"}
                     onMouseDown={this.handleClick}
                     onTouchStart={this.handleTouch}
                     style={{
                         width: this.width + "px",
                         height: this.height + "px",
                         borderRadius: this.props.node.dimensions.headHeight,
                         backgroundColor: this.nodeStyle.nodeBackgroundColor,
                         boxShadow: "0 0 3px 2px " + (this.state.aboutToDelete ? "#c21414" :
                             this.state.selected ? this.nodeStyle.headerColor : "#555e66")
                     }}>

                    <Box draggable="false" className={"header"} style={{
                        width: this.props.node.dimensions.width,
                        height: this.props.node.dimensions.headHeight,
                        color: this.nodeStyle.textColor,
                        fontWeight: this.nodeStyle.headerFontWeight,
                        // backgroundColor: this.nodeStyle.headerColor
                    }} bg="primary.400">
                        {this.props.node.name}
                    </Box>

                </div>
            </div>
        );
    }
}

export default Node;
