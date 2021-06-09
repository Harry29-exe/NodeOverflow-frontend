import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {NodeDimension} from "../NodeDimension";
import {SliderSegment} from "../../segment/imp/SliderSegment";
import {OptionSegment} from "../../segment/imp/OptionSegment";

export class TestNode extends NodeModel {

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
            new OptionSegment(1, this, "val1", ["val1", "val2", "val3"], false, false),

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