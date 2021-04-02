import {NodeDimension, NodeModel} from "../../node-atomic/NodeModel";
import {NodeValueFunction} from "../../node-atomic/NodeValueFunction";
import {ChanelType, ImageLikeData} from "../../../image-manipulation/structs/ImageLikeData";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {InputSegmentModel} from "../../node-atomic/segments/InputSegment";
import WorkerLoader from "../../../image-manipulation/WorkerLoader";
import "../../../image-manipulation/workers/SeparateChannelsWorker"
import SeparateChannelsWorker, {
    createWorkerMessage,
    WorkerReturnType
} from "../../../image-manipulation/workers/SeparateChannelsWorker";

export const CreateSeparateChannelsNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Separate channels", x ? x : 0, y ? y : 0,
        new NodeDimension(170, 22, 26, 20),
        new SeparateChannelsNodeVFun());
    node.addSegment(new OutputSegmentModel("image red channel"));
    node.addSegment(new OutputSegmentModel("image green channel"));
    node.addSegment(new OutputSegmentModel("image blue channel"));
    node.addSegment(new OutputSegmentModel("image alpha channel"));
    node.addSegment(new InputSegmentModel("image"));

    return node;
}

export class SeparateChannelsNodeVFun implements NodeValueFunction<ImageData> {
    private worker: Worker = WorkerLoader(SeparateChannelsWorker);

    getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageLikeData> {
        return new Promise((resolve, reject) => {

            let width: number, height: number;
            let channelType: ChanelType;
            this.worker.addEventListener("message", (message: MessageEvent<WorkerReturnType>) => {
                let data = message.data
                resolve(new ImageLikeData(data.channelData, width, height));
            });

            try {
                let imgSource = node.getSegmentLinks(4)[0].outputSegment;
                let imgPromise = imgSource.parent.getNodeValue(imgSource.index);
                imgPromise.then(
                    value => {
                        if (!(value instanceof ImageData)) {
                            reject("Separate channels node takes image as input");
                        }
                        width = value.width;
                        height = value.height;
                        this.worker.postMessage(createWorkerMessage(value, segmentIndex), [value.data.buffer]);
                    },
                    reason => reject(reason)
                );
            } catch (e: any) {
                reject();
            }

        });
    }
}