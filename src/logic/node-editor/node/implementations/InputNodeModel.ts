import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {SegmentModel} from "../../segment/SegmentModel";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {OptionSegment} from "../../segment/imp/OptionSegment";

export class InputNodeModel extends NodeModel {
    readonly name: string = 'Image input';
    protected _segments: SegmentModel<any>[] = [
        new OutputSegment(0, this, undefined),
        new OptionSegment(1, this, "val1", ["val1", "val2", "val3"], true, true),
        new OptionSegment(2, this, "val1", ["val1", "val2", "val3"], true, false),
    ];

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadNode(save: NodeSave, storageId: number): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }
}
