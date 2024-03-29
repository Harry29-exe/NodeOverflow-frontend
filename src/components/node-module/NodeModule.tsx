import React, {Component} from 'react';
import NodeCanvas from "./NodeCanvas";
import "./NodeModule.css";

import RenderWindow from "./RenderWindow";
import NodeControlPanel from "./ControlPanel/NodeControlPanel";
import {ProjectStorage} from "../../logic/node-editor/node-management/ProjectStorage";
import {NodeCanvasViewProperties} from "./NodeCanvasViewProperties";
import {mainColors} from "../../App";

export interface NodeModuleProps {
    storage: ProjectStorage,
    disableControlPanel?: boolean
}

export interface NodeModuleState {
    dividerPosition: number;
}

export class NodeModule extends Component<NodeModuleProps, NodeModuleState> {
    //TODO
    private nodeCanvasViewProps: NodeCanvasViewProperties = new NodeCanvasViewProperties(1, 0, 0);
    private readonly storage;
    private controlPanelHeight = '40px';

    constructor(props: any) {
        super(props);
        this.storage = props.storage;
        this.state = {dividerPosition: 60};
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
        let controlPanelH = this.controlPanelHeight;
        return (
            <div style={{top: 0, height: "100%", width: "100%", position: "relative", left: 0}}>

                {!this.props.disableControlPanel ?
                    <div style={{position: "absolute", width: "100%", height: controlPanelH}}>
                        <NodeControlPanel storage={this.storage} viewProps={this.nodeCanvasViewProps}/>
                    </div>
                    :
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "40px",
                        backgroundColor: mainColors.segmentColor
                    }}>
                    </div>
                }

                <div style={{
                    top: controlPanelH,
                    left: 0,
                    height: `calc(100% - ${controlPanelH})`,
                    width: this.state.dividerPosition + "%",
                    position: "absolute"
                }}>
                    <NodeCanvas storage={this.storage} viewProps={this.nodeCanvasViewProps}/>
                </div>

                <div onMouseDown={this.handleResizeMouseDown}
                     onTouchStart={this.handleResizeTouchStart}
                     className={"Separator"} style={{
                    height: `calc(100% - ${controlPanelH})`, width: "10px", top: controlPanelH,
                    left: this.state.dividerPosition < 50 ? `${this.state.dividerPosition}%` : `calc(${this.state.dividerPosition}% - 10px)`,
                    position: "absolute", overflow: "hidden", margin: 0, padding: 0,
                    backgroundColor: mainColors.segmentColor, boxShadow: "0 0 2px 1px " + mainColors.borderColor,

                }}/>

                <div style={{
                    top: controlPanelH,
                    left: this.state.dividerPosition < 50 ? `calc(${this.state.dividerPosition}% + 10px)` : `${this.state.dividerPosition}%`,
                    width: this.state.dividerPosition < 50 ? `calc(${100 - this.state.dividerPosition}% - 10px)` : `${100 - this.state.dividerPosition}%`,
                    height: `calc(100% - ${controlPanelH})`,
                    position: "absolute",
                    overflow: "hidden",
                    margin: 0,
                    padding: 0
                }}>
                    <RenderWindow storage={this.storage}/>
                </div>
            </div>
        );
    }
}

export default NodeModule;
