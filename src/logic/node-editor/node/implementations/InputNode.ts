import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {SegmentModel} from "../../segment/SegmentModel";

export class InputNode extends NodeModel {
    readonly name: string = 'Image input';
    protected _segments: SegmentModel<any>[] = [];

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadNode(save: NodeSave): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }
}
