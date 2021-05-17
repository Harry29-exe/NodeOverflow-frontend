import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import InputSegmentView from "../../../../components/node-module/node-atomic/segments/InputSegmentView";
import {NodeModel} from "../../node/NodeModel";

export class InputSegment extends SegmentModel<any> {
    protected _label: string = 'input';


    constructor(index: number, parent: NodeModel, changeValueListener?: (newValue: any) => void) {
        super(index, parent, undefined, true, false, changeValueListener);
    }

    createView(storage: ProjectStorage): JSX.Element {
        return (<InputSegmentView model={this} storage={storage} key={this._index}/>);
    }

}