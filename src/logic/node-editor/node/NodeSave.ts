import {NodeViewProperties} from "./NodeViewProperties";
import {SegmentSave} from "../segment/SegmentSave";

export interface NodeSave {
    name: string,
    id: number,
    nodeViewProps: NodeViewProperties,
    segmentSaves: SegmentSave[],
}