import {NodeModel} from "../NodeModel";
import {createNodeSave, NodeSave} from "../NodeSave";
import {NodeDimension} from "../NodeDimension";
import {InputSegment} from "../../segment/imp/InputSegment";
import {ImageLikeData} from "../../../image-manipulation/structs/ImageLikeData";


export class OutputNodeModel extends NodeModel {
    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        typeof id === "number" ? super(id, storageId, x, y, dimensions) : super(id, storageId);
        this._name = 'Output node';

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    async getOutputValue(segmentIndex: number): Promise<any> {
        let links = this.getSegmentLinks(0);
        if (links.length === 0) {
            return;
        }
        let outputSegment = links[0].outputSegment;
        let nodeInput = await outputSegment.parent.getOutputValue(outputSegment.index);
        if (nodeInput instanceof ImageData) {
            return Promise.resolve(nodeInput);
        } else if (nodeInput instanceof ImageLikeData) {
            let imageData = new ImageData(nodeInput.data, nodeInput.width, nodeInput.height);
            return Promise.resolve(imageData);
        }

        return Promise.resolve(undefined);
    }

    loadSegments(save: NodeSave): void {
        let segmentSave = save.segmentSaves.find(s => s.segmentIndex === 0);
        if (segmentSave) {
            this._segments[0].load(segmentSave);
        }
    }

    initSegments(): void {
        this._segments = [new InputSegment(0, this, () => {
        })];
    }

    save(): NodeSave {
        return createNodeSave(this);
    }

}