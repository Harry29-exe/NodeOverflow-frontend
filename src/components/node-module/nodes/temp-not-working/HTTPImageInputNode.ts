import {NodeDimension, NodeModel} from "../../node-atomic/NodeModel";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {PortType} from "../../node-atomic/Segment";
import {ImageInputNodeVFun} from "../ImageInputNode";
import {HTTPImageSegmentModel} from "../../node-atomic/segments/HTTPImageSegment";

export const CreateHTTPImageInputNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "HTTP Image input", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 20, 26, 0),
        new ImageInputNodeVFun());
    node.addSegment(new OutputSegmentModel("image"));
    // node.addSegment(new OutputSegmentModel("alfa"));
    node.addSegment(new HTTPImageSegmentModel("Load input image", null, PortType.NO_PORT))
    return node;
}