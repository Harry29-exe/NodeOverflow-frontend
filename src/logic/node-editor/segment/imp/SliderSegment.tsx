import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import SliderSegmentView from "../../../../components/node-module/node-atomic/segments/SliderSegmentView";
import {NodeModel} from "../../node/NodeModel";
import {SegmentSave} from "../SegmentSave";

export class SliderSegment extends SegmentModel<number> {
    protected _label: string = "value:";
    private _minValue: number;
    private _maxValue: number;
    private _precision: number;

    constructor(index: number, parent: NodeModel, minValue: number, maxValue: number, precision: number, value?: number, changeValueListener?: (newValue: number) => void) {
        super(index, parent, value? value: (minValue + maxValue)/2, true, false, changeValueListener);
        this._minValue = minValue;
        this._maxValue = maxValue;
        this._precision = precision;
    }

    load(save: SegmentSave) {
        let val = save.segmentValue;
        this._precision = val.precision;
        this._minValue = val.minVal;
        this._maxValue = val.maxVal;
        this._value = val.value;
    }

    save(): SegmentSave {
        let value = {
            minVal: this._minValue,
            maxVal: this._maxValue,
            precision: this._precision,
            value: this._value
        };

        return {
            segmentValue: value,
            segmentIndex: this._index
        };
    }

    createView(storage: ProjectStorage): JSX.Element {
        return <SliderSegmentView model={this} storage={storage} key={this._index}/>;
    }


    get minValue(): number {
        return this._minValue;
    }

    get maxValue(): number {
        return this._maxValue;
    }

    get precision(): number {
        return this._precision;
    }
}