import {NodeStorage} from "../../../logic/node-editor/node-management/NodeStorage";
import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";

interface SegmentProps<SegmentType extends SegmentModel<any>> {
    model: SegmentType;
    storage: NodeStorage;
}

export default SegmentProps;