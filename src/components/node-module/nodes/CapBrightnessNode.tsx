import {NodeDimension, NodeModel} from "../node-atomic/NodeModel";
import {NodeValueFunction} from "../node-atomic/NodeValueFunction";
import "../../../logic/image-manipulation/workers/CapBrightnessWorker";
import {CapBrightnessImageWorker, CapBrightnessParams} from "../../../logic/image-manipulation/workers/CapBrightnessWorker";
import {OutputSegmentModel} from "../node-atomic/segments/OutputSegment";
import {InputSegmentModel} from "../node-atomic/segments/InputSegment";
import {PortType} from "../node-atomic/Segment";
import {OptionSegmentModel} from "../node-atomic/segments/OptionSegment";
import {ImageLikeData} from "../../../logic/image-manipulation/structs/ImageLikeData";
import {NodeFactoryFunction} from "./utils/NodeFactory";
import {NodeSave} from "./utils/NodeSave";
import {NumericSliderSegmentModel} from "../node-atomic/segments/NumericSliderSegment";

export const CreateClampImageNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Cap Brightness", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 22, 26, 20), new ClampImageNodeVFun());
    node.addSegment(new OutputSegmentModel("image"));
    node.addSegment(new OptionSegmentModel("Cap at", "Max", ["Max", "Min"]))
    node.addSegment(new NumericSliderSegmentModel("value", 255, PortType.INPUT, 0, 255, 0));
    node.addSegment(new InputSegmentModel("image"));

    return node;
}

export class CapBrightnessNodeSave extends NodeSave {
    public readonly capAt: "Max" | "Min";
    public readonly value: number;

    constructor(nodeModel: NodeModel, nodeDefaultDim: NodeDimension) {
        super(nodeModel, nodeDefaultDim);
        this.capAt = nodeModel.segments[1].value;
        this.value = nodeModel.segments[2].value;
    }
}

export class CapBrightnessNFF implements NodeFactoryFunction<CapBrightnessNodeSave> {
    public readonly nodeName: string = "Cap brightness";
    public readonly defaultDimensions = new NodeDimension(180, 22, 26, 20);

    createNewNode(id: number, x?: number, y?: number): NodeModel {
        let node = new NodeModel(id, this.nodeName, x ? x : 0, y ? y : 0,
            this.defaultDimensions, new ClampImageNodeVFun());
        node.addSegment(new OutputSegmentModel("image"));
        node.addSegment(new OptionSegmentModel("Cap at", "Max", ["Max", "Min"]))
        node.addSegment(new NumericSliderSegmentModel("value", 255,
            PortType.INPUT, 0, 255, 0));
        node.addSegment(new InputSegmentModel("image"));

        return node;
    }

    loadNode(id: number, save: CapBrightnessNodeSave): NodeModel {
        let node = new NodeModel(id, this.nodeName, save.x, save.y,
            save.nodeDimensions ? save.nodeDimensions : this.defaultDimensions,
            new ClampImageNodeVFun());
        node.addSegment(new OutputSegmentModel("image"));
        node.addSegment(new OptionSegmentModel("Cap at", save.capAt, ["Max", "Min"]))
        node.addSegment(new NumericSliderSegmentModel("value", 255,
            PortType.INPUT, 0, 255, 0));
        node.addSegment(new InputSegmentModel("image"));

        return node;
    }

    createNodeSave(nodeModel: NodeModel): CapBrightnessNodeSave {
        return new CapBrightnessNodeSave(nodeModel, this.defaultDimensions);
    }
}

export class ClampImageNodeVFun implements NodeValueFunction<ImageLikeData> {
    private imageWorker = new CapBrightnessImageWorker(new CapBrightnessParams(255, true));

    async getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageLikeData> {
        let imgSource = node.getSegmentLinks(3)[0].outputSegment;
        let sourcePromise = imgSource.parent.getNodeValue(imgSource.index);
        let value = await sourcePromise;
        if (!(value instanceof ImageLikeData)) {
            return Promise.reject("input value has to be of ImageLikeData");
        }

        let cap = node.segments[2].value;
        this.imageWorker.setParams(new CapBrightnessParams(cap < 0 ? 0 : cap > 255 ? 255 : cap, node.segments[1].value === "Max"));
        return this.imageWorker.run(value);
    }
}