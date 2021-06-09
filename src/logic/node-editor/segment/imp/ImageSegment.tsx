import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import ImageSegmentView from "../../../../components/node-module/node-atomic/segments/ImageSegmentView";
import {AppImage} from "../../../image-manipulation/structs/AppImage";
import {NodeModel} from "../../node/NodeModel";
import {SegmentSave} from "../SegmentSave";

export class ImageSegment extends SegmentModel<AppImage | null> {
    protected _label: string = "Image segment";

    constructor(index: number, parent: NodeModel, value: AppImage | null, changeValueListener?: (newValue: AppImage | null) => void) {
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


    get value(): AppImage | null {
        let val = this._value;
        if(val === null) {
            return null;
        }

        let arrayCopy = val.data.slice(0, val.data.length);
        return new AppImage(arrayCopy, val.width, val.height);
    }

    set value(value: AppImage | null) {
        this._value = value;
    }
}