import React from 'react';
import Segment, {PortType, SegmentModel, SegmentProps} from "../Segment";
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";

class OutputSegment extends Segment<null, SegmentProps<null>, any> {

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