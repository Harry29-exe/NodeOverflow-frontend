import React from 'react';
import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";

class PlaceholderSegment extends SegmentViewWrapper<null, SegmentProps<null>, any> {
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