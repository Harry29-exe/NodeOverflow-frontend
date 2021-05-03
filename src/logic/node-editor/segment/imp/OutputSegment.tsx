import {SegmentModel} from "../SegmentModel";
import {NodeStorage} from "../../../../components/node-module/NodeStorage";
import React from "react";
import OutputSegmentView from "../../../../components/node-module/node-atomic/segments/OutputSegmentView";

export class OutputSegment extends SegmentModel<any> {
    protected _label: string = "output";
    protected _ref: React.RefObject<any> = React.createRef();

    createView(storage: NodeStorage): JSX.Element {
        return (<OutputSegmentView key={this.index} model={this} storage={storage}/>);
    }
}
