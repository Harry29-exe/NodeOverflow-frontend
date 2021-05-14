import {SegmentModel} from "../SegmentModel";
import {NodeStorage} from "../../node-management/NodeStorage";
import InputSegmentView from "../../../../components/node-module/node-atomic/segments/InputSegmentView";
import {NodeModel} from "../../node/NodeModel";

export class InputSegment extends SegmentModel<any> {
    protected _label: string = 'input';


    constructor(index: number, parent: NodeModel, changeValueListener?: (newValue: any) => void) {
        super(index, parent, undefined, true, false, changeValueListener);
    }

    createView(storage: NodeStorage): JSX.Element {
        return (<InputSegmentView model={this} storage={storage} key={this._index}/>);
    }

}