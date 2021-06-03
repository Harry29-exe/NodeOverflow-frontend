import {SegmentModel} from "../SegmentModel";
import {ProjectStorage} from "../../node-management/ProjectStorage";
import InputSegmentView from "../../../../components/node-module/node-atomic/segments/InputSegmentView";
import {NodeModel} from "../../node/NodeModel";

export class InputSegment extends SegmentModel<Promise<any>> {
    protected _label: string = 'input';


    constructor(index: number, parent: NodeModel, changeValueListener?: (newValue: any) => void) {
        super(index, parent, {} as Promise<any>, true, false, changeValueListener);
    }

    createView(storage: ProjectStorage): JSX.Element {
        return (<InputSegmentView model={this} storage={storage} key={this._index}/>);
    }

    get value(): Promise<any> {
        let links = this._parent.getSegmentLinks(this._index);
        if(links.length < 1) {
            return Promise.reject("No links connected to segment");
        }
        let outputSegment = links[0].outputSegment;
        return outputSegment.parent.getOutputValue(outputSegment.index);
    }
}