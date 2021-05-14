import {NodeModel} from "../NodeModel";
import {SegmentModel} from "../../segment/SegmentModel";
import {createNodeSave, NodeSave} from "../NodeSave";
import {OutputSegment} from "../../segment/imp/OutputSegment";


export class OutputNodeModel extends NodeModel {
    protected _segments: SegmentModel<any>[] = [
        new OutputSegment(0, this, () => {
        })
    ];
    readonly name: string = 'Output node';


    getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    load(save: NodeSave): void {
        let segmentSave = save.segmentSaves.find(s => s.segmentIndex === 0);
        if (segmentSave) {
            this._segments[0].load(segmentSave);
        }
    }

    save(): NodeSave {
        return createNodeSave(this);
    }

}