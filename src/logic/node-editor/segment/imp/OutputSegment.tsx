import {SegmentModel} from "../SegmentModel";
import {NodeStorage} from "../../node-management/NodeStorage";
import React from "react";
import OutputSegmentView from "../../../../components/node-module/node-atomic/segments/OutputSegmentView";
import {NodeModel} from "../../node/NodeModel";

export class OutputSegment extends SegmentModel<any> {
    protected _label: string = "output";


    constructor(index: number, parent: NodeModel, changeValueListener?: (newValue: any) => void) {
        super(index, parent, undefined, false, true, changeValueListener);
    }

    createView(storage: NodeStorage): JSX.Element {
        return (<OutputSegmentView key={this.index} model={this} storage={storage}/>);
    }
}
