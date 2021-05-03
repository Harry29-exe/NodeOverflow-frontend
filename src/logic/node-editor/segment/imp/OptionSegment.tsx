import {SegmentModel} from "../SegmentModel";
import {NodeModel} from "../../node/NodeModel";
import {NodeStorage} from "../../../../components/node-module/NodeStorage";
import OptionSegmentView from "../../../../components/node-module/node-atomic/segments/OptionSegmentView";
import React from "react";

export class OptionSegment extends SegmentModel<any> {
    protected _label: string = "";
    protected _ref: React.RefObject<any> = React.createRef();

    constructor(index: number, parent: NodeModel, value: any, hasInputPort: boolean,
                hasOutputPort: boolean, changeValueListener?: (newValue: any) => void) {
        super(index, parent, value, hasInputPort, hasOutputPort, changeValueListener);
    }

    createView(storage: NodeStorage): JSX.Element {
        return (<OptionSegmentView model={this} storage={storage}/>);
    }


}