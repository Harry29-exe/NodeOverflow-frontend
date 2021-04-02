import {DummyValueFunction} from "../../node-atomic/NodeValueFunction";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {PortType} from "../../node-atomic/Segment";
import {OptionSegmentModel} from "../../node-atomic/segments/OptionSegment";
import {NumberSegmentModel} from "../../node-atomic/segments/NumberSegment";
import {InputSegmentModel} from "../../node-atomic/segments/InputSegment";
import {NodeDimension, NodeModel} from "../../node-atomic/NodeModel";

export const CreateResizeImageNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Resize image", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 20, 26, 20),
        // new ResizeImageNodeVFun());
        new DummyValueFunction());
    node.addSegment(new OutputSegmentModel("image"));
    node.addSegment(new OptionSegmentModel("Resize type", "Percentage", ["Percentage", "Pixels"]));
    node.addSegment(new InputSegmentModel("Image"));
    node.addSegment(new NumberSegmentModel("Width", 100, PortType.INPUT));
    node.addSegment(new NumberSegmentModel("Height", 100, PortType.INPUT));

    return node;
}

// export class ResizeImageNodeVFun implements NodeValueFunction<ImageData> {
//     getNodeValue(node: NodeModel, segmentIndex: number): ImageData {
//         let imageDataSrc = node.getSegmentLinks(2)[0].outputSegment;
//         let imageData = imageDataSrc.parent.getNodeValue(imageDataSrc.index);
//         let newWidth;
//         let newHeight;
//         if (node.segments[1].value === "Percentage") {
//             newWidth = imageData.width * (node.segments[3].value / 100);
//             newHeight = imageData.height * (node.segments[4].value / 100);
//         } else {
//             newWidth = node.segments[3].value;
//             newHeight = node.segments[4].value;
//         }
//
//         let tempCanvas = document.createElement("canvas") as HTMLCanvasElement;
//         tempCanvas.width = imageData.width;
//         tempCanvas.height = imageData.height;
//         let tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
//         tempCtx.putImageData(imageData, 0, 0);
//
//         let outputCanvas = document.createElement("canvas") as HTMLCanvasElement;
//         outputCanvas.width = newWidth;
//         outputCanvas.height = newHeight;
//         let outputCtx = outputCanvas.getContext("2d") as CanvasRenderingContext2D;
//         outputCtx.drawImage(tempCanvas, 0, 0, imageData.width, imageData.height, 0, 0, newWidth, newHeight);
//
//         return outputCtx.getImageData(0, 0, newWidth, newHeight);
//     }
//
// }