import React, {Component} from 'react';
import NodeView from "./node-atomic/NodeView";
import LinkView from "./node-atomic/LinkView";
import {NodeStorage, NodeStorageListener} from "../../logic/node-editor/node-management/NodeStorage";
import {NodeCanvasViewProperties} from "./NodeCanvasViewProperties";
import "./NodeCanvas.css"
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {LinkModel} from "../../logic/node-editor/LinkModel";
import CanvasContext from '../../logic/contexts/CanvasContext';

export class NodeCanvasState {
    public viewProperties: NodeCanvasViewProperties;
    public nodes: NodeModel[];
    public links: LinkModel[];

    constructor(viewProperties: NodeCanvasViewProperties, nodes: NodeModel[], links: LinkModel[]) {
        this.viewProperties = viewProperties;
        this.nodes = nodes;
        this.links = links;
    }
}

export class NodeCanvasProps {
    storage: NodeStorage;
    viewProps: NodeCanvasViewProperties

    constructor(storage: NodeStorage, viewProps: NodeCanvasViewProperties) {
        this.storage = storage;
        this.viewProps = viewProps;
    }
}

class NodeCanvas extends Component<NodeCanvasProps, NodeCanvasState> {
    protected storageListener: NodeStorageListener = ((nodes, links) =>
        this.setState({nodes: nodes, links: links}));
    private listenerId: number = 0;
    protected canvasRef = React.createRef<HTMLDivElement>();

    constructor(props: NodeCanvasProps) {
        super(props);
        this.state = new NodeCanvasState(props.viewProps, props.storage.getNodes(), props.storage.getLinks());
    }

    handleMove = (event: any) => {
        let time = Date.now();
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        const transform = (event: any) => {
            if (Date.now() - time > 5) {
                event.preventDefault();
                this.state.viewProperties.shiftLeft =
                    this.state.viewProperties.shiftLeft - (mouseX - event.clientX) / this.state.viewProperties.scale;
                this.state.viewProperties.shiftTop =
                    this.state.viewProperties.shiftTop - (mouseY - event.clientY) / this.state.viewProperties.scale;

                mouseX = event.clientX;
                mouseY = event.clientY;
                time = Date.now();
                this.setState({
                    viewProperties: this.state.viewProperties
                });
            }
        }

        window.addEventListener("mousemove", transform);
        window.addEventListener("mouseup",
            () => window.removeEventListener("mousemove", transform));
    }

    handleScroll = (event: any) => {
        let offset = event.deltaMode === 0 ? event.deltaY : event.deltaY * 50;
        let newScale = this.state.viewProperties.scale - offset * 0.001;
        newScale = newScale < 0.1 ? 0.1 : newScale > 20 ? 20 : newScale;

        this.state.viewProperties.scale = newScale;
        this.setState({
            viewProperties: this.state.viewProperties
        });
    }

    preventDefault = (event: any) => {
        event.preventDefault(event);
        event.stopPropagation();
        return false;
    }

    disableScroll = (event: any) => {
        window.addEventListener("mousewheel", this.preventDefault, {passive: false});
        window.addEventListener("touchmove", this.preventDefault, {passive: false});
    }

    enableScroll = (event: any) => {
        window.removeEventListener("mousewheel", this.preventDefault);
        window.removeEventListener("touchmove", this.preventDefault);
    }

    componentDidMount() {
        this.listenerId = this.props.storage.addUpdateListener(this.storageListener);
    }

    componentWillUnmount() {
        this.props.storage.removeUpdateListener(this.listenerId);
    }

    handleTouch = (event: any) => {
        this.disableScroll(event);
        if (event.touches.length == 1) {
            this.handleTouchMove(event);
        } else {
            this.handleTouchScale(event);
        }
    }

    handleTouchMove = (event: any) => {
        let time = Date.now();
        let x1 = event.touches[0].screenX;
        let y1 = event.touches[0].screenY;
        const onTouchMove = (event: any) => {
            if (event.touches.length > 1) {
                endTouch(event);
            } else if (Date.now() - time > 5) {
                let viewProps = this.state.viewProperties;
                let touch = event.touches[0];
                viewProps.shiftTop += (touch.screenY - y1) / viewProps.scale;
                y1 = touch.screenY;
                viewProps.shiftLeft += (touch.screenX - x1) / viewProps.scale;
                x1 = touch.screenX;
                time = Date.now();
                this.setState({viewProperties: viewProps});
            }
        }
        const endTouch = (event: any) => {
            window.removeEventListener("touchend", endTouch);
            window.removeEventListener("touchmove", onTouchMove);
        }
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", endTouch);
    }

    handleTouchScale = (event: any) => {
        let time = Date.now();
        let x1 = event.touches[0].screenX;
        let y1 = event.touches[0].screenY;
        let x2 = event.touches[1].screenX;
        let y2 = event.touches[1].screenY;
        let originalDistance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        let originalScale = this.state.viewProperties.scale;
        const onTouchMove = (event: any) => {
            if (Date.now() - time > 5) {
                x1 = event.touches[0].screenX;
                y1 = event.touches[0].screenY;
                x2 = event.touches[1].screenX;
                y2 = event.touches[1].screenY;
                let newDistance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                this.state.viewProperties.scale = originalScale * (newDistance / originalDistance);
                time = Date.now();
                this.setState({viewProperties: this.state.viewProperties});
            }
        }

        const onTouchEnd = (event: any) => {
            if (event.touches.length < 2) {
                window.removeEventListener("touchmove", onTouchMove);
                window.removeEventListener("touchend", onTouchEnd);
            }
        }
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
    }

    render() {
        let key = 0;
        return (
            <div onMouseEnter={this.disableScroll} onMouseLeave={this.enableScroll}
                 ref={this.canvasRef} className={"Background"} onWheel={this.handleScroll}
                 style={{
                     width: "100%", height: "100%", overflow: "hidden", position: "absolute",
                     top: 0, left: 0, margin: 0, padding: 0
                 }}
                 draggable={"false"} unselectable={"on"}>

                <CanvasContext.Provider value={this.state.viewProperties}>
                    <div id={`s0c`} style={{
                        position: "absolute", backgroundColor: "#ddaaaa",
                        left: "50%", top: "50%",
                        // transition: `transform 0.1s`,
                        transform: `scale(${this.state.viewProperties.scale}) 
                        translate(${this.state.viewProperties.shiftLeft}px, 
                            ${this.state.viewProperties.shiftTop}px)`

                    }}>

                        {this.state.links.map(l =>
                            <LinkView link={l} scale={this.state.viewProperties.scale} key={l.domId}/>
                        )}

                        {this.state.nodes.map(n =>
                            <NodeView key={n.id} node={n} canvasViewProps={this.state.viewProperties}
                                      storage={this.props.storage}/>
                        )}
                    </div>
                </CanvasContext.Provider>

                <div style={{width: "inherit", height: "inherit"}}
                     onMouseDown={this.handleMove} onTouchStart={this.handleTouch}
                     onTouchEnd={this.enableScroll} onTouchCancel={this.enableScroll}>
                </div>
            </div>
        );
    }
}

export default NodeCanvas;