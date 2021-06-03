import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {SegmentModel} from "../../segment/SegmentModel";
import {SliderSegment} from "../../segment/imp/SliderSegment";
import {InputSegment} from "../../segment/imp/InputSegment";
import {ContrastWorker} from "../../../image-manipulation/workers/ContrastWorker";

export class ContrastNode extends NodeModel {
    protected _name = 'Contrast Node'
    protected _segments: SegmentModel<any>[] = [
        new OutputSegment(0, this),
        new SliderSegment(1, this, -1, 1, 100, 0),
        new InputSegment(2, this)
    ]

    private contrastWorker = new ContrastWorker();


    async getOutputValue(segmentIndex: number): Promise<any> {
        this.contrastWorker.setParams(this._segments[1].value);
        let input = await this._segments[2].value;
        return this.contrastWorker.run(input);
    }

    save(): NodeSave {
        return {} as NodeSave;
    }

}