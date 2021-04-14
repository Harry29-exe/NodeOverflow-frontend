import React from 'react';
import Segment, {PortType, SegmentModel, SegmentProps} from "../Segment";
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";

class PlaceholderSegment extends Segment<null, SegmentProps<null>, any> {
    render() {
        return (
            <div/>
        );
    }
}

export class PlaceholderSegmentModel extends SegmentModel<null> {

    constructor() {
        super("", null, PortType.NO_PORT);
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <PlaceholderSegment key={this.index} storage={storage} currentScale={currentScale} segment={this}/>;
    }

}

export default PlaceholderSegment;