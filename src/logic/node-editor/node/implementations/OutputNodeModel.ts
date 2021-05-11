import {NodeModel} from "../NodeModel";
import {SegmentModel} from "../../segment/SegmentModel";
import {NodeSave} from "../NodeSave";
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

    loadNode(save: NodeSave, storageId: number): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }

}