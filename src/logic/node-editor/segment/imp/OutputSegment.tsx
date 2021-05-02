import {SegmentModel} from "../SegmentModel";
import {NodeStorage} from "../../../../components/node-module/NodeStorage";
import {NodeCanvasViewProperties} from "../../../../components/node-module/NodeCanvasViewProperties";
import React from "react";
import OutputSegmentView from "../../../../components/node-module/node-atomic/segments/OutputSegmentView";

export class OutputSegment extends SegmentModel<any> {
    protected _label: string = "output";
    protected _ref: React.RefObject<any> = React.createRef();


    // constructor(index: number, parent: NodeModel, value: any, hasInputPort: boolean, hasOutputPort: boolean, changeValueListener?: (newValue: any) => void) {
    //     super(index, parent, value, hasInputPort, hasOutputPort, changeValueListener);
    // }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return (<OutputSegmentView model={this}/>);
    }
}