import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {NodeDimension} from "../NodeDimension";
import {SliderSegment} from "../../segment/imp/SliderSegment";

export class TestNodeModel extends NodeModel {

    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        typeof id === "number" ? super(id, storageId, x, y, dimensions) : super(id, storageId);
        this._name = 'Test node';

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }


    initSegments() {
        this._segments = [
            new SliderSegment(0, this, -1, 1, 1000),

        ]
    }

    loadSegments(save: NodeSave) {

    }

    getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    save(): NodeSave {
        return {} as NodeSave;
    }
}