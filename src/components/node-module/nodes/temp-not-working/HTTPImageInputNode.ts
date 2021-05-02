import {NodeModel} from "../../../../logic/node-editor/node/NodeModel";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {ImageInputNodeVFun} from "../ImageInputNode";
import {HTTPImageSegmentModel} from "../../node-atomic/segments/HTTPImageSegment";
import {NodeDimension} from "../../../../logic/node-editor/node/NodeDimension";
import {PortType} from "../../../../logic/node-editor/segment/SegmentModel";

export const CreateHTTPImageInputNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "HTTP Image input", x ? x : 0, y ? y : 0,
        new NodeDimension(180, 20, 26, 0),
        new ImageInputNodeVFun());
    node.addSegment(new OutputSegmentModel("image"));
    // node.addSegment(new OutputSegmentModel("alfa"));
    node.addSegment(new HTTPImageSegmentModel("Load input image", null, PortType.NO_PORT))
    return node;
}