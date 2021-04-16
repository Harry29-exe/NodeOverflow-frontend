import React, {Component} from 'react';
import NodeCanvas from "./NodeCanvas";
import "./NodeModule.css";
import {LinkModel} from "./node-atomic/Link";

import RenderWindow from "./RenderWindow";
import NodeControlPanel from "./NodeControlPanel";
import {DefaultNodeStorage, NodeStorageListener} from "./NodeStorage";
import {NodeCanvasViewProperties} from "./NodeCanvasViewProperties";
import {NodeModel} from "./node-atomic/NodeModel";
import {mainColors} from "../../App";

export interface NodeModuleProps {
    nodes?: NodeModel[],
    links?: LinkModel[],
    disableControlPanel?: boolean
}

export interface NodeModuleState {
    nodes: NodeModel[];
    links: LinkModel[];
    dividerPosition: number;
}

export class NodeModule extends Component<NodeModuleProps, NodeModuleState> {
    private nodeCanvasViewProps: NodeCanvasViewProperties = new NodeCanvasViewProperties(1, 0, 0, 0, 0);
    protected storageListener: NodeStorageListener = ((nodes, links) => this.setState({nodes: nodes, links: links}));
    private readonly storage;

    constructor(props: any) {
        super(props);
        this.storage = new DefaultNodeStorage(props.nodes ? props.nodes : [],
            props.links ? props.links : [], [this.storageListener]);
        this.state = {nodes: this.storage.getNodes(), links: this.storage.getLinks(), dividerPosition: 60};
    }

    handleResizeMouseDown = (event: any) => {
        let parent = event.target.parentElement;
        let parentBox = parent.getBoundingClientRect() as DOMRect;
        const handleMouseMove = (event: any) => {
            event.preventDefault();
            let newPosition = (event.clientX - parentBox.left) / parentBox.width * 100;
            this.setState({dividerPosition: newPosition > 100 ? 100 : newPosition > 0 ? newPosition : 0})
        }
        const handleMouseUp = (event: any) => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    handleResizeTouchStart = (event: any) => {
        let parent = event.target.parentElement;
        let parentBox = parent.getBoundingClientRect() as DOMRect;
        const handleTouchMove = (event: any) => {
            event.preventDefault();
            let newPosition = (event.touches[0].screenX - parentBox.left) / parentBox.width * 100;
            this.setState({dividerPosition: newPosition > 100 ? 100 : newPosition > 0 ? newPosition : 0})
        }
        const handleTouchEnd = (event: any) => {
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        }

        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
    }

    render() {
        return (
            <div style={{top: 0, height: "100%", width: "100%", position: "relative", left: 0}}>

                {!this.props.disableControlPanel ?
                    <div style={{position: "absolute", width: "100%", height: "4.5%"}}>
                        <NodeControlPanel storage={this.storage} viewProps={this.nodeCanvasViewProps}/>
                    </div>
                    :
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "4.5%",
                        backgroundColor: mainColors.segmentColor
                    }}>
                    </div>
                }

                <div style={{
                    top: "4.5%",
                    left: 0,
                    height: "95.5%",
                    width: this.state.dividerPosition + "%",
                    position: "absolute"
                }}>
                    <NodeCanvas storage={this.storage} viewProps={this.nodeCanvasViewProps}/>
                </div>

                <div onMouseDown={this.handleResizeMouseDown}
                     onTouchStart={this.handleResizeTouchStart}
                     className={"Separator"} style={{
                    height: "95.5%", width: "10px", top: "4.5%",
                    left: this.state.dividerPosition < 50 ? `${this.state.dividerPosition}%` : `calc(${this.state.dividerPosition}% - 10px)`,
                    position: "absolute", overflow: "hidden", margin: 0, padding: 0,
                    backgroundColor: mainColors.segmentColor, boxShadow: "0 0 2px 1px " + mainColors.borderColor,

                }}/>

                <div style={{
                    top: "4.5%",
                    left: this.state.dividerPosition < 50 ? `calc(${this.state.dividerPosition}% + 10px)` : `${this.state.dividerPosition}%`,
                    width: this.state.dividerPosition < 50 ? `calc(${100 - this.state.dividerPosition}% - 10px)` : `${100 - this.state.dividerPosition}%`,
                    height: "95.5%",
                    position: "absolute",
                    overflow: "hidden",
                    margin: 0,
                    padding: 0
                }}>
                    <RenderWindow nodes={this.state.nodes}/>
                </div>
            </div>
        );
    }
}

export default NodeModule;