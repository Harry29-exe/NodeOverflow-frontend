import React, {useRef, useState} from 'react';
import {Box} from "@chakra-ui/react";
import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";
import {ProjectStorage} from "../../../logic/node-editor/node-management/ProjectStorage";
import LinkTemporary from "./LinkTemporary";

class Props {
    public parent: SegmentModel<any>;
    public storage: ProjectStorage;
    public portType: "in" | "out";

    constructor(parent: SegmentModel<any>, storage: ProjectStorage, portType: "in" | "out") {
        this.parent = parent;
        this.storage = storage;
        this.portType = portType;
    }
}

class TempLinkState {
    public mouseX: number;
    public mouseY: number;
    public hasTempLink: boolean;

    constructor(hasTempLink: boolean, x1: number, y1: number) {
        this.mouseX = x1;
        this.mouseY = y1;
        this.hasTempLink = hasTempLink;
    }
}

const Port = (props: Props) => {
    const [tempLinkState, setLinkState] = useState<TempLinkState>(new TempLinkState(false, 0, 0));
    const portRef = useRef<HTMLDivElement>(null);

    let offset = props.portType === "in" ? '-' : '';
    const domId = `${props.parent.domId}${props.portType}`;

    const handleClick = (event: any) => {
        event.stopPropagation();
        event.preventDefault();

        if (props.portType === "in") {
            handleInputClick(event);
        } else if (props.portType === "out") {
            handleOutputClick(event)
        }
    }

    const handleOutputClick = (event: any) => {
        let current = portRef.current;
        if (current === undefined || current === null) {
            throw new Error();
        }
        let portBox = current.getBoundingClientRect();
        setLinkState(new TempLinkState(true, portBox.left, portBox.top));

        const handleTempLinkMove = (event: any) => {
            setLinkState(new TempLinkState(true, event.clientX, event.clientY));
        }

        const handleTempLink = (event: any) => {
            window.removeEventListener("mousemove", handleTempLinkMove);
            window.removeEventListener("mouseup", handleTempLink);

            setLinkState(new TempLinkState(false, 0, 0));
            props.storage.handleAttemptToAddLink(props.parent);
        }

        window.addEventListener("mousemove", handleTempLinkMove);
        window.addEventListener("mouseup", handleTempLink);
    }

    const handleInputClick = (event: any) => {
        props.storage.handleRemoveLinks(props.parent, "in");
    }

    return (
        <>
            <Box
                id={domId}
                ref={portRef}
                onClick={(e: any) => e.stopPropagation()}
                onTouchStart={(e: any) => e.stopPropagation()}
                onMouseEnter={(e: any) => props.storage.setHoveredPort(props.parent, props.portType)}
                onMouseLeave={(e: any) => props.storage.clearHoveredPort()}
                onMouseDown={handleClick}
                alignSelf="center" w="15px" h="15px"
                justifySelf={props.portType === "in" ? "flex-start" : "flex-end"}
                bg={"primary.400"} borderRadius="50%"
                border={"2px solid"} borderColor={"gray.600"}
                transform={`translate(${offset}55%, 0px)`}
                _hover={{bg: "primary.100", cursor: "crosshair"}}
            >
            </Box>
            {tempLinkState.hasTempLink ?
                <LinkTemporary portDomId={domId}
                               mouseX={tempLinkState.mouseX} mouseY={tempLinkState.mouseY}/>
                :
                null
            }
        </>
    );
};

export default Port;


//
// import React, {Component} from 'react';
// import "./Port.css"
// import LinkTemporary from "./LinkTemporary";
// import {NodeStorage} from "../NodeStorage";
// import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
// import {SegmentStyle} from "../../../logic/node-editor/node/NodeModel";
// import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";
//
// class Props {
//     public parent: SegmentModel<any>;
//     public topPosition: number;
//     public storage: NodeStorage;
//     public currentScale: NodeCanvasViewProperties;
//
//     constructor(parent: SegmentModel<any>, topPosition: number, storage: NodeStorage, currentScale: NodeCanvasViewProperties) {
//         this.parent = parent;
//         this.topPosition = topPosition;
//         this.storage = storage;
//         this.currentScale = currentScale;
//     }
// }
//
// class State {
//     public x1: number;
//     public y1: number;
//     public x2: number;
//     public y2: number;
//     public hasTempLink: boolean
//
//     constructor(hasTempLink: false, x1: number, y1: number, x2: number, y2: number) {
//         this.x1 = x1;
//         this.y1 = y1;
//         this.x2 = x2;
//         this.y2 = y2;
//         this.hasTempLink = hasTempLink;
//     }
// }
//
// class Port extends Component<Props, State> {
//
//     constructor(props: Props) {
//         super(props);
//         this.state = {hasTempLink: false, x1: 0, y1: 0, x2: 0, y2: 0};
//     }
//
//     handleClick = (event: any) => {
//         event.preventDefault();
//
//         if (this.props.parent.portType === PortType.INPUT) {
//             this.handleInputClick(event);
//         } else if (this.props.parent.portType === PortType.OUTPUT) {
//             this.handleOutputClick(event)
//         }
//     }
//
//     handleOutputClick = (event: any) => {
//         let dim = this.props.parent.parentDimensions;
//         let x1 = dim.width;
//         let y1 = this.props.topPosition + dim.segmentHeight * 0.5;
//         this.setState({
//             hasTempLink: true,
//             x1: x1, y1: y1, x2: x1, y2: y1
//         });
//         let startX = event.clientX;
//         let startY = event.clientY;
//
//         const handleTempLinkMove = (event: any) => {
//             this.setState({
//                 x2: this.state.x1 + (event.clientX - startX) / this.props.currentScale.scale,
//                 y2: this.state.y1 + (event.clientY - startY) / this.props.currentScale.scale
//             })
//         }
//
//         const handleTempLink = (event: any) => {
//             window.removeEventListener("mousemove", handleTempLinkMove);
//             window.removeEventListener("mouseup", handleTempLink);
//             this.setState({hasTempLink: false});
//             this.props.storage.handleAttemptToAddLink(this.props.parent,
//                 this.props.parent.parent.x + this.state.x2,
//                 this.props.parent.parent.y + this.state.y2);
//         }
//
//         window.addEventListener("mousemove", handleTempLinkMove);
//         window.addEventListener("mouseup", handleTempLink);
//     }
//
//     handleInputClick = (event: any) => {
//         this.props.storage.handleRemoveLinks(this.props.parent);
//     }
//
//     handleTouch = (event: any) => {
//         event.preventDefault();
//
//         if (this.props.parent.portType === PortType.INPUT) {
//             this.handleInputClick(event);
//         } else if (this.props.parent.portType === PortType.OUTPUT) {
//             this.handleOutputTouch(event)
//         }
//     }
//
//     handleOutputTouch = (event: any) => {
//         let dim = this.props.parent.parentDimensions;
//         let x1 = dim.width;
//         let y1 = this.props.topPosition + dim.segmentHeight * 0.5;
//         this.setState({
//             hasTempLink: true,
//             x1: x1, y1: y1, x2: x1, y2: y1
//         });
//         let startX = event.touches[0].screenX;
//         let startY = event.touches[0].screenY;
//
//         const handleTempLinkMove = (event: any) => {
//             this.setState({
//                 x2: this.state.x1 + (event.touches[0].screenX - startX) / this.props.currentScale.scale,
//                 y2: this.state.y1 + (event.touches[0].screenY - startY) / this.props.currentScale.scale
//             })
//         }
//
//         const handleTempLink = (event: any) => {
//             window.removeEventListener("touchmove", handleTempLinkMove);
//             window.removeEventListener("touchend", handleTempLink);
//             this.setState({hasTempLink: false});
//             this.props.storage.handleAttemptToAddLink(this.props.parent,
//                 this.props.parent.parent.x + this.state.x2,
//                 this.props.parent.parent.y + this.state.y2);
//         }
//
//         window.addEventListener("touchmove", handleTempLinkMove);
//         window.addEventListener("touchend", handleTempLink);
//     }
//
//     createStyle() {
//         let dim = this.props.parent.parentDimensions;
//         let style = SegmentStyle;
//         let size = dim.segmentHeight - 2 * style.percentageOffsetTop * dim.segmentHeight;
//         return {
//             top: this.props.topPosition,
//             height: size,
//             width: size,
//             marginTop: dim.segmentHeight * style.percentageOffsetTop,
//             marginLeft: this.props.parent.portType === PortType.INPUT ?
//                 -size / 2 : dim.width - size / 2,
//             borderRadius: dim.segmentHeight / 2,
//             //TODO add hover state and revrite css to jsx
//             // backgroundColor: nodeStyle.headerColor
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 <div onMouseDown={this.handleClick} onTouchStart={this.handleTouch}
//                      className={"portView"} style={this.createStyle()}>
//                 </div>
//                 {this.state.hasTempLink ?
//                     <LinkTemporary
//                         x1={this.state.x1} y1={this.state.y1}
//                         x2={this.state.x2} y2={this.state.y2}/>
//                     :
//                     null}
//             </div>
//         );
//     }
// }
//
// export default Port;