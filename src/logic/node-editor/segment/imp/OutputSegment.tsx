import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import React from "react";
import OutputSegmentView from "../../../../components/node-module/node-atomic/segments/OutputSegmentView";
import {NodeModel} from "../../node/NodeModel";

export class OutputSegment extends SegmentModel<any> {
    protected _label: string = "output";


    constructor(index: number, parent: NodeModel, label?: string, changeValueListener?: (newValue: any) => void) {
        super(index, parent, undefined, false, true, changeValueListener);
        if(label) {
            this._label = label;
        }
    }

    createView(storage: ProjectStorage): JSX.Element {
        return (<OutputSegmentView key={this.index} model={this} storage={storage}/>);
    }
}
