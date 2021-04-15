import {NodeDimension, NodeModel} from "../../node-atomic/NodeModel";
import {SeparateChannelsNodeVFun} from "../to-update/SeparateChannelsNode";
import {NodeValueFunction} from "../../node-atomic/NodeValueFunction";
import WorkerLoader from "../../../../logic/image-manipulation/WorkerLoader"
import ContrastWorker from "../../../../logic/image-manipulation/workers/ContrastWorker";
import {CreateNode} from "../utils/NodeFactory";

export const CreateChannelToImageNode: CreateNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Channel to image", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 22, 26, 20),
        new SeparateChannelsNodeVFun());


    return node;
}

export class ChannelToImageNodeVFun implements NodeValueFunction<ImageData> {
    private contrastWorker: Worker = WorkerLoader(ContrastWorker);
    private result: ImageData | null = null;

    async getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageData> {
        let inputSource = node.getSegmentLinks(2)[0].outputSegment;
        let inputPromise = inputSource.parent.getNodeValue(inputSource.index);

        let inputValue = await inputPromise;

        return this.onInputValue(inputValue)
    }

    onInputValue(value: any): Promise<ImageData> {
        return Promise.resolve(new ImageData(1, 1));
    }

}