import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import ImageSegmentView from "../../../../components/node-module/node-atomic/segments/ImageSegmentView";
import {NodeImage} from "../../../image-manipulation/structs/NodeImage";
import {NodeModel} from "../../node/NodeModel";
import {SegmentSave} from "../SegmentSave";

export class ImageSegment extends SegmentModel<NodeImage | null> {
    protected _label: string = "Image segment";

    constructor(index: number, parent: NodeModel, value: NodeImage | null, changeValueListener?: (newValue: NodeImage | null) => void) {
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


    get value(): NodeImage | null {
        let val = this._value;
        if(val === null) {
            return null;
        }

        let arrayCopy = val.data.slice(0, val.data.length);
        return new NodeImage(arrayCopy, val.width, val.height);
    }

    set value(value: NodeImage | null) {
        this._value = value;
    }
}