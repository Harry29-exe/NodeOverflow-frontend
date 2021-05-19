import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import ImageSegmentView from "../../../../components/node-module/node-atomic/segments/ImageSegmentView";
import {ImageLikeData} from "../../../image-manipulation/structs/ImageLikeData";
import {NodeModel} from "../../node/NodeModel";
import {SegmentSave} from "../SegmentSave";

export class ImageSegment extends SegmentModel<ImageLikeData | null> {
    protected _label: string = "Image segment";

    constructor(index: number, parent: NodeModel, value: ImageLikeData | null, changeValueListener?: (newValue: ImageLikeData | null) => void) {
        super(index, parent, value, false, false, changeValueListener);
    }

    createView(storage: ProjectStorage): JSX.Element {
        return (
            <ImageSegmentView model={this} storage={storage} key={this._index}/>
        );
    }


    load(save: SegmentSave) {
        this._value = null;
    }

    save(): SegmentSave {
        return {segmentIndex: this._index, segmentValue: null};
    }
}