import {SegmentModel} from "../SegmentModel";
import {NodeModel} from "../../node/NodeModel";
import {NodeStorage} from "../../../../components/node-module/NodeStorage";
import OptionSegmentView from "../../../../components/node-module/node-atomic/segments/OptionSegmentView";
import React from "react";

export class OptionSegment<T> extends SegmentModel<T> {
    protected _label: string = "";
    protected _ref: React.RefObject<any> = React.createRef();
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


    get possibleValues(): any[] {
        return this._possibleValues;
    }
}