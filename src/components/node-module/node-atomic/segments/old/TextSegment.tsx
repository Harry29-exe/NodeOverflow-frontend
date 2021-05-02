export const we = 'we';
//
// import React from 'react';
// import "./TextSegment.css";
// import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
// import {NodeStorage} from "../../NodeStorage";
// import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
// import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
//
// export class TextSegment extends SegmentViewWrapper<string, SegmentProps<string>, { clicked: boolean, value: string }> {
//     constructor(props: SegmentProps<string>) {
//         super(props);
//         this.state = {clicked: false, value: this.props.segment.value};
//     }
//
//     handleInput = (event: any) => {
//         this.props.segment.value = event.target.value;
//         this.setState({value: event.target.value});
//     }
//
//     handleInputClick = (event: any) => {
//         let temp = false;
//         const unfocused = () => {
//             if (!temp) {
//                 temp = true;
//             } else {
//                 window.removeEventListener("click", unfocused);
//                 this.setState({clicked: false});
//             }
//         }
//
//         window.addEventListener("click", unfocused);
//         this.setState({clicked: true});
//     }
//
//     protected createInputStyle() {
//         let dim = this.props.segment.parentDimensions;
//         return {
//             paddingLeft: "6px",
//             top: this.topPosition,
//             marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,
//             height: dim.segmentHeight - 2 * this.segmentStyle.percentageOffsetTop * dim.segmentHeight,
//             width: dim.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft) - 6,
//             marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,
//             borderRadius: dim.segmentHeight / 2,
//
//             fontFamily: this.nodeStyle.fontFamily,
//             fontWeight: this.nodeStyle.labelsFontWeight,
//             color: this.state.clicked ? this.nodeStyle.textColor : this.nodeStyle.segmentColor,
//             backgroundColor: this.nodeStyle.segmentColor,
//             fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight
//
//         } as React.CSSProperties
//     }
//
//
//     render() {
//         return (
//             <div>
//                 <input onClick={this.handleInputClick} onChange={this.handleInput}
//                        onSelect={event => console.log("se")} className={"textInput"}
//                        type={"text"} spellCheck="false"
//                        style={this.createInputStyle()} value={this.state.value}/>
//
//                 {!this.state.clicked ?
//                     <div style={this.createLabelStyle()}>
//                         {this.props.segment.label + ": " + this.state.value}
//                     </div>
//                     : null}
//                 {this.createPort()}
//             </div>
//         );
//     }
// }
//
// export default TextSegment;
//
// export class TextSegmentModel extends SegmentModel<string> {
//
//     constructor(value: string, label: string, portType: PortType) {
//         super(label, value, portType);
//     }
//
//     createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
//         return <TextSegment storage={storage} segment={this} currentScale={currentScale} key={this._index}/>
//     }
// }