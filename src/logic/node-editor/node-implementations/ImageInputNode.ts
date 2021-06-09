import {NodeModel} from "../node/NodeModel";
import {createNodeViewPropertiesDto, NodeSave} from "../node/NodeSave";
import {OutputSegment} from "../segment/imp/OutputSegment";
import {SegmentSave} from "../segment/SegmentSave";
import {NodeDimension} from "../node/NodeDimension";
import {ImageSegment} from "../segment/imp/ImageSegment";

export class ImageInputNode extends NodeModel {

    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        typeof id === "number" ? super(id, storageId, x, y, dimensions) : super(id, storageId);
        this._name = 'Image input';

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    async getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(this._segments[1].value);
    }

    loadSegments(save: NodeSave): void {
        let segments = this._segments;
        let saves = save.segmentSaves.sort((s1, s2) => s1.segmentIndex - s2.segmentIndex);
        if (saves.length !== segments.length) {
            throw new Error("Given Node save-load is not correct");
        }

        for (let i = 0; i < segments.length; i++) {
            segments[i].load(saves[i]);
        }
    }

    initSegments() {
        this._segments = [
            new OutputSegment(0, this),
            new ImageSegment(1, this, null)
        ];
    }

    save(): NodeSave {
        let segmentSaves: SegmentSave[] = [];
        this._segments.forEach(s => segmentSaves.push(s.save()));
        return {
            name: this.name,
            id: this.id,
            nodeViewProps: createNodeViewPropertiesDto(this.viewProperties),
            segmentSaves: segmentSaves
        };
    }
}
