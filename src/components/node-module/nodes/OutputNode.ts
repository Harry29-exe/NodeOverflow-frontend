import {InputSegmentModel} from "../node-atomic/segments/InputSegment";
import {NodeValueFunction} from "../node-atomic/NodeValueFunction";
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {ImageLikeData} from "../../../logic/image-manipulation/structs/ImageLikeData";
import {NodeFactoryFunction} from "./utils/NodeFactory";
import {NodeSave} from "./utils/NodeSave";
import {NodeDimension} from "../../../logic/node-editor/node/NodeDimension";

export const CreateOutputNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Output", x ? x : 0, y ? y : 0,
        new NodeDimension(130, 20, 26, 20),
        new OutputNodeVFun());
    node.addSegment(new InputSegmentModel("image output"));
    return node;
}

export class OutputNFF implements NodeFactoryFunction<NodeSave> {
    public readonly nodeName: string = "Output";
    public readonly defaultDimensions = new NodeDimension(130, 20, 26, 20);

    createNewNode(id: number, x?: number, y?: number): NodeModel {
        let node = new NodeModel(id, "Output", x ? x : 0, y ? y : 0,
            this.defaultDimensions.clone(),
            new OutputNodeVFun());
        node.addSegment(new InputSegmentModel("image output"));
        return node;
    }

    loadNode(id: number, save: NodeSave): NodeModel {
        let node = new NodeModel(id, "Output", save.x, save.y,
            save.nodeDimensions ? save.nodeDimensions : this.defaultDimensions,
            new OutputNodeVFun());
        node.addSegment(new InputSegmentModel("image output"));
        return node;
    }

    createNodeSave(nodeModel: NodeModel): NodeSave {
        return new NodeSave(nodeModel, this.defaultDimensions);
    }
}

export class OutputNodeVFun implements NodeValueFunction<ImageData> {

    getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageData> {
        return new Promise<ImageData>(((resolve, reject) => {
            try {
                let inputLink = node.getSegmentLinks(0)[0].outputSegment;
                let inputPromise = inputLink.parent.getNodeValue(inputLink.index);
                inputPromise.then(
                    value => {
                        if (value instanceof ImageData) {
                            resolve(value)
                        } else if (value instanceof ImageLikeData) {
                            //TODO more checking should be done here
                            let image = new ImageData(value.data, value.width, value.height);
                            resolve(image);
                        } else {
                            reject("");
                        }
                    }
                );
            } catch (e: any) {
                reject(e);
            }
        }))

    }
}
