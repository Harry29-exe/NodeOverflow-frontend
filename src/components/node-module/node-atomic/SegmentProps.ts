import {ProjectStorage} from "../../../logic/node-editor/node-management/ProjectStorage";
import {SegmentModel} from "../../../logic/node-editor/segment/SegmentModel";

interface SegmentProps<SegmentType extends SegmentModel<any>> {
    model: SegmentType;
    storage: ProjectStorage;
}

export default SegmentProps;