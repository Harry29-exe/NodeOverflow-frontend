export const we = 'we';

// import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
// import {NodeStorage} from "../../NodeStorage";
// import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
//
// import React from 'react';
// import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
//
// class HttpImageSegment extends SegmentViewWrapper<ImageData | null, SegmentProps<ImageData | null>, any> {
//
//     constructor(props: SegmentProps<ImageData | null>, onInputChange: (event: any) => void) {
//         super(props);
//         this.state = {imgSrc: ""};
//     }
//
//     onInputChange = (event: any) => {
//         let image = new Image();
//         image.crossOrigin = "anonymous";
//         image.onload = () => {
//             console.log(image.width, image.height);
//             let canvas = document.createElement("Canvas") as HTMLCanvasElement;
//             canvas.width = image.width;
//             canvas.height = image.height;
//             let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//             ctx.drawImage(image, 0, 0);
//             this.props.segment.value = ctx.getImageData(0, 0, image.width, image.height);
//             console.log(this.props.segment.value);
//             this.setState({imgSrc: event.target.value});
//         }
//         image.src = event.target.value;
//     }
//
//     render() {
//         return (
//             <div>
//                 <input type="text" onChange={this.onInputChange}/>
//                 <img style={{
//                     margin: "2px",
//                     maxWidth: this.width - 4,
//                     maxHeight: this.props.segment.parentDimensions.segmentHeight * (4 - 2 * this.segmentStyle.percentageOffsetTop) - 4,
//                     display: "block",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                     marginTop: "auto",
//                     marginBottom: "auto",
//                     borderRadius: this.height / 2
//                 }} src={this.state.imgSrc}/>
//             </div>
//         );
//     }
// }
//
// export default HttpImageSegment;
//
// export class HTTPImageSegmentModel extends SegmentModel<ImageData | null> {
//     private _imgSrc: string = "";
//
//     constructor(label: string, value: ImageData | null, portType: PortType) {
//         super(label, value, portType, 5);
//     }
//
//     createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
//         return <HttpImageSegment segment={this} storage={storage} currentScale={currentScale}/>
//     }
//
//     get imgSrc(): string {
//         return this._imgSrc;
//     }
//
//     set imgSrc(value: string) {
//         this._imgSrc = value;
//     }
// }
