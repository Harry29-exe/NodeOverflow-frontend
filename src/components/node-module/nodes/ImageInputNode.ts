import {OutputSegmentModel} from "../node-atomic/segments/OutputSegment";
import {ImageSegmentModel} from "../node-atomic/segments/ImageSegment";
import {NodeValueFunction} from "../node-atomic/NodeValueFunction";
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {ImageLikeData} from "../../../logic/image-manipulation/structs/ImageLikeData";
import {NodeFactoryFunction} from "./utils/NodeFactory";
import {NodeSave} from "./utils/NodeSave";
import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";
import {PortType} from "../../../logic/node-editor/segment/SegmentModel";

export const CreateImageInputNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Image input", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 20, 26, 0),
        new ImageInputNodeVFun());
    node.addSegment(new OutputSegmentModel("image"));
    node.addSegment(new ImageSegmentModel("Load input image", null, PortType.NO_PORT))
    return node;
}

export class ImageInputNodeSave extends NodeSave {

    constructor(nodeModel: NodeModel, nodeDefaultDim: NodeDimension) {
        super(nodeModel, nodeDefaultDim);
        let imageSegment = nodeModel.segments[1];
        if (imageSegment instanceof ImageSegmentModel) {
            this.fileToLoadList[0] = imageSegment.fileToLoad;
        } else {
            throw Error();
        }
    }
}

export class ImageInputNFF implements NodeFactoryFunction<ImageInputNodeSave> {
    public readonly nodeName: string = "Image input";
    public readonly defaultDimensions = new NodeDimension(180, 20, 26, 0);

    createNewNode(id: number, x?: number, y?: number): NodeModel {
        let node = new NodeModel(id, this.nodeName, x ? x : 0, y ? y : 0,
            this.defaultDimensions,
            new ImageInputNodeVFun());
        node.addSegment(new OutputSegmentModel("image"));
        node.addSegment(new ImageSegmentModel("Load input image", null, PortType.NO_PORT));
        return node;
    }

    loadNode(id: number, save: ImageInputNodeSave): NodeModel {
        let node = new NodeModel(id, this.nodeName, save.x, save.y,
            save.nodeDimensions ? save.nodeDimensions : this.defaultDimensions,
            new ImageInputNodeVFun());
        node.addSegment(new OutputSegmentModel("image"));
        node.addSegment(new ImageSegmentModel("Load input image", null, PortType.NO_PORT));
        return node;
    }

    createNodeSave(nodeModel: NodeModel): ImageInputNodeSave {
        return new ImageInputNodeSave(nodeModel, this.defaultDimensions);
    }
}

export class ImageInputNodeVFun implements NodeValueFunction<ImageLikeData> {

    getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageLikeData> {
        if (node.segments[1].value instanceof ImageData) {
            return new Promise(
                resolve => {
                    let imageData: ImageData = node.segments[1].value;
                    let dataCopy = new ImageLikeData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
                    resolve(dataCopy);
                }
            );
        } else {
            return Promise.reject("Image not loaded");
        }
    }
}
