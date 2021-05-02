import {CreateNode} from "../utils/NodeFactory";
import {NodeModel} from "../../../../logic/node-editor/node/NodeModel";
import {NodeValueFunction} from "../../node-atomic/NodeValueFunction";
import {ImageLikeData} from "../../../../logic/image-manipulation/structs/ImageLikeData";
import {InvertImageWorker} from "../../../../logic/image-manipulation/workers/InvertWorker";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {InputSegmentModel} from "../../node-atomic/segments/InputSegment";
import {NodeDimension} from "../../../../logic/node-editor/node/NodeDimension";

export const CreateInvertNode: CreateNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Invert node", x ? x : 0, y ? y : 0,
        new NodeDimension(150, 22, 26, 20), new InvertNodeVFun());
    node.addSegment(new OutputSegmentModel("image"));
    node.addSegment(new InputSegmentModel("image"));

    return node
}

export class InvertNodeVFun implements NodeValueFunction<ImageLikeData> {
    private invertWorker = new InvertImageWorker();

    async getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageLikeData> {
        let inputImg: any;
        try {
            let imageSrc = node.getSegmentLinks(1)[0].outputSegment;
            inputImg = await imageSrc.parent.getNodeValue(imageSrc.index);
        } catch (e: any) {
            return Promise.reject("No input");
        }

        if (inputImg instanceof ImageLikeData) {
            return this.invertWorker.run(inputImg);
        } else {
            return Promise.reject("Input in not image like data");
        }
    }

}