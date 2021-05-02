import React from 'react';
import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";

class OutputSegment extends SegmentViewWrapper<null, SegmentProps<null>, any> {

    render() {
        return (
            <div>
                <div draggable={"false"} style={this.createOutputLabelStyle()}>{this.props.segment.label}</div>
                {this.createPort()}
            </div>
        );
    }
}

export default OutputSegment;

export class OutputSegmentModel extends SegmentModel<null> {

    constructor(label: string) {
        super(label, null, PortType.OUTPUT);
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <OutputSegment storage={storage} segment={this} currentScale={currentScale} key={this.index}/>
    }
}