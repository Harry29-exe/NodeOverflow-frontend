import {SegmentModel} from "../SegmentModel";
import {NodeModel} from "../../node/NodeModel";
import {NodeStorage} from "../../node-management/NodeStorage";
import OptionSegmentView from "../../../../components/node-module/node-atomic/segments/OptionSegmentView";
import React from "react";
import {SegmentSave} from "../SegmentSave";

export class OptionSegment<T> extends SegmentModel<T> {
    protected _label: string = "";
    private readonly _possibleValues: any[];

    constructor(index: number, parent: NodeModel, value: any, possibleValues: any[],
                hasInputPort: boolean, hasOutputPort: boolean,
                changeValueListener?: (newValue: any) => void) {
        super(index, parent, value, hasInputPort, hasOutputPort, changeValueListener);
        this._possibleValues = possibleValues;
    }

    createView(storage: NodeStorage): JSX.Element {
        return (<OptionSegmentView key={this.index} model={this} storage={storage}/>);
    }

    load(save: SegmentSave) {

    }

    get possibleValues(): any[] {
        return this._possibleValues;
    }
}