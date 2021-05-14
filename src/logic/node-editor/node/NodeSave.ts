import {NodeViewProperties} from "./NodeViewProperties";
import {SegmentSave} from "../segment/SegmentSave";
import {NodeModel} from "./NodeModel";

export interface NodeSave {
    name: string,
    id: number,
    nodeViewProps: NodeViewProperties,
    segmentSaves: SegmentSave[],
    additionInfo?: any;
}

export const createNodeSave = (node: NodeModel, additionalInfo?: any, segmentSaves?: SegmentSave[]): NodeSave => {
    let saves: SegmentSave[] = [];
    if (!segmentSaves) {
        node.segments.forEach(s => saves.push(s.save()));
    }

    return {
        name: node.name,
        id: node.id,
        nodeViewProps: node.viewProperties,
        segmentSaves: segmentSaves ? segmentSaves : saves,
        additionInfo: additionalInfo
    }
}