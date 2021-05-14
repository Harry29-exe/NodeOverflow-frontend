import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {SegmentModel} from "../../segment/SegmentModel";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {OptionSegment} from "../../segment/imp/OptionSegment";
import {InputSegment} from "../../segment/imp/InputSegment";
import {SegmentSave} from "../../segment/SegmentSave";

export class InputNodeModel extends NodeModel {
    readonly name: string = 'Image input';
    protected _segments: SegmentModel<any>[] = [
        new OutputSegment(0, this, undefined),
        new OptionSegment(1, this, "val1", ["val1", "val2", "val3"], true, true),
        new InputSegment(2, this),
    ];

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    load(save: NodeSave): void {
        let segments = this._segments;
        let saves = save.segmentSaves.sort((s1, s2) => s1.segmentIndex - s2.segmentIndex);
        if (saves.length !== segments.length) {
            throw new Error("Given Node save is not correct");
        }

        for (let i = 0; i < segments.length; i++) {
            segments[i].load(saves[i]);
        }
    }

    save(): NodeSave {
        let segmentSaves: SegmentSave[] = [];
        this._segments.forEach(s => segmentSaves.push(s.save()));
        return {
            name: this.name,
            id: this.id,
            nodeViewProps: this.viewProperties,
            segmentSaves: segmentSaves
        };
    }
}
