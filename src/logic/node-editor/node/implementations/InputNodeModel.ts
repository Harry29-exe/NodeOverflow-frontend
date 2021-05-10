import {NodeModel} from "../NodeModel";
import {NodeSave} from "../NodeSave";
import {SegmentModel} from "../../segment/SegmentModel";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {OptionSegment} from "../../segment/imp/OptionSegment";
import {GlobalNodeFactory} from "../../node-management/GlobalNodeFactory";
import {NodeDimension} from "../NodeDimension";

export class InputNodeModel extends NodeModel {
    readonly name: string;
    protected _segments: SegmentModel<any>[];


    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x: number, y: number, dimensions: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        if (typeof id === "number" && x && y && dimensions) {
            super(id, storageId, x, y, dimensions);
        } else if (typeof id !== 'number') {
            super(id, storageId)
        } else {
            throw new Error();
        }

        this.name = 'Image input';
        this._segments = [
            new OutputSegment(0, this, undefined),
            new OptionSegment(1, this, "val1", ["val1", "val2", "val3"], true, true),
            new OptionSegment(2, this, "val1", ["val1", "val2", "val3"], true, false),
        ];
    }

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadNode(save: NodeSave): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }
}

const nFF = GlobalNodeFactory.nodesFactoryFunctions.set("Image input",
    (nodeSave, storageId) => new
    InputNodeModel(nodeSave, storageId));
