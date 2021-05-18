import {NodeModel} from "../NodeModel";
import {createNodeSave, NodeSave} from "../NodeSave";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {NodeDimension} from "../NodeDimension";


export class OutputNodeModel extends NodeModel {
    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        typeof id === "number" ? super(id, storageId, x, y, dimensions) : super(id, storageId);
        this._name = 'Output node';

        console.log("output node constructor")
        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadSegments(save: NodeSave): void {
        let segmentSave = save.segmentSaves.find(s => s.segmentIndex === 0);
        if (segmentSave) {
            this._segments[0].load(segmentSave);
        }
    }

    initSegments(): void {
        this._segments = [new OutputSegment(0, this, () => {
        })];
    }

    save(): NodeSave {
        return createNodeSave(this);
    }

}