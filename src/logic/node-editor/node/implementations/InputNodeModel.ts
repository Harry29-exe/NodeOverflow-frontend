import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {SegmentModel} from "../../segment/SegmentModel";
import {OutputSegment} from "../../segment/imp/OutputSegment";

export class InputNodeModel extends NodeModel {
    readonly name: string = 'Image input';
    protected _segments: SegmentModel<any>[] = [new OutputSegment(0, this, undefined, true, true)];

    // constructor(save: NodeSave)
    // constructor(id: number, x: number, y: number, dimensions: NodeDimension)
    // constructor(saveOrId: number | NodeSave, x?: number, y?: number, dimensions?: NodeDimension) {
    //     super(saveOrId)
    // }

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadNode(save: NodeSave): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }
}
