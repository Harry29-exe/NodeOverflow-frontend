export const we = 'we';

//
// import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
// import {CreateNode, NodeFactoryFunction} from "./utils/NodeFactory";
// import {NodeValueFunction} from "../node-atomic/NodeValueFunction";
// import {ImageLikeData} from "../../../logic/image-manipulation/structs/ImageLikeData";
// import {OutputSegmentModel} from "../node-atomic/segments/OutputSegment";
// import {NumericSliderSegmentModel} from "../node-atomic/segments/NumericSliderSegment";
// import {InputSegmentModel} from "../node-atomic/segments/InputSegment";
// import "../../../logic/image-manipulation/workers/ContrastWorker";
// import {ContrastImageWorker} from "../../../logic/image-manipulation/workers/ContrastWorker";
// import {NodeSave} from "./utils/NodeSave";
// import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";
// import {PortType} from "../../../logic/node-editor/segment/SegmentModel";
//
// export const CreateContrastNode: CreateNode = (id: number, x?: number, y?: number): NodeModel => {
//     let node = new NodeModel(id, "Contrast", x ? x : 0, y ? y : 0,
//         new NodeDimension(155, 20, 26, 20),
//         new ContrastNodeVFun());
//     node.addSegment(new OutputSegmentModel("image"));
//     node.addSegment(new NumericSliderSegmentModel("Contrast", 0, PortType.INPUT, -1, 1, 2));
//     node.addSegment(new InputSegmentModel("image/channel"));
//
//     return node;
// }
//
// export class ContrastNodeSave extends NodeSave {
//     public readonly contrast: number;
//
//     constructor(nodeModel: NodeModel, nodeDefaultDim: NodeDimension) {
//         super(nodeModel, nodeDefaultDim);
//         this.contrast = nodeModel.segments[1].value;
//     }
// }
//
// export class ContrastNFF implements NodeFactoryFunction<ContrastNodeSave> {
//     readonly nodeName: string = "Contrast";
//     public readonly defaultDimensions = new NodeDimension(155, 20, 26, 20);
//
//     createNewNode(id: number, x?: number, y?: number): NodeModel {
//         let node = new NodeModel(id, "Contrast", x ? x : 0, y ? y : 0,
//             this.defaultDimensions,
//             new ContrastNodeVFun());
//         node.addSegment(new OutputSegmentModel("image"));
//         node.addSegment(new NumericSliderSegmentModel("Contrast", 0, PortType.INPUT, -1, 1, 2));
//         node.addSegment(new InputSegmentModel("image/channel"));
//
//         return node;
//     }
//
//     loadNode(id: number, save-load: ContrastNodeSave): NodeModel {
//         let node = new NodeModel(id, "Contrast", 0, 0,
//             save-load.nodeDimensions ? save-load.nodeDimensions : this.defaultDimensions,
//             new ContrastNodeVFun());
//         node.addSegment(new OutputSegmentModel("image"));
//         node.addSegment(new NumericSliderSegmentModel("Contrast", 0, PortType.INPUT, -1, 1, 2));
//         node.addSegment(new InputSegmentModel("image/channel"));
//
//         return node;
//     }
//
//     createNodeSave(nodeModel: NodeModel): ContrastNodeSave {
//         return new ContrastNodeSave(nodeModel, this.defaultDimensions);
//     }
// }
//
// export class ContrastNodeVFun implements NodeValueFunction<ImageLikeData> {
//     private imageWorker = new ContrastImageWorker();
//
//     async getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageLikeData> {
//         let inputImg: any;
//         try {
//             let imageSrc = node.getSegmentLinks(2)[0].outputSegment;
//             inputImg = await imageSrc.parent.getNodeValue(imageSrc.index);
//         } catch (e: any) {
//             return Promise.reject("No input");
//         }
//
//         if (inputImg instanceof ImageLikeData) {
//             this.imageWorker.setParams(node.segments[1].value);
//             return this.imageWorker.run(inputImg);
//         } else {
//             return Promise.reject("Input data is not image like data");
//         }
//     }
//
// }