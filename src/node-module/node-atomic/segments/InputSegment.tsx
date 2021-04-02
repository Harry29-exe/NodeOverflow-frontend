import React from 'react';
import Segment, {PortType, SegmentModel, SegmentProps} from "../Segment";
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";

class InputSegment extends Segment<null, SegmentProps<null>, any> {

    render() {
        return (
            <div>
                <div draggable={"false"} style={this.createInputLabelStyle()}>{this.props.segment.label}</div>
                {this.createPort()}
            </div>
        );
    }
}

export default InputSegment;

export class InputSegmentModel extends SegmentModel<null> {

    constructor(label: string) {
        super(label, null, PortType.INPUT);
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <InputSegment storage={storage} segment={this} currentScale={currentScale} key={this.index}/>
    }
}