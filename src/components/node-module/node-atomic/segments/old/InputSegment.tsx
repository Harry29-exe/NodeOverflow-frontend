export const we = 'we';
//
// import React from 'react';
// import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
// import {NodeStorage} from "../../NodeStorage";
// import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
// import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
//
// class InputSegment extends SegmentViewWrapper<null, SegmentProps<null>, any> {
//
//     render() {
//         return (
//             <div>
//                 <div draggable={"false"} style={this.createInputLabelStyle()}>{this.props.segment.label}</div>
//                 {this.createPort()}
//             </div>
//         );
//     }
// }
//
// export default InputSegment;
//
// export class InputSegmentModel extends SegmentModel<null> {
//
//     constructor(label: string) {
//         super(label, null, PortType.INPUT);
//     }
//
//     createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
//         return <InputSegment storage={storage} segment={this} currentScale={currentScale} key={this.index}/>
//     }
// }