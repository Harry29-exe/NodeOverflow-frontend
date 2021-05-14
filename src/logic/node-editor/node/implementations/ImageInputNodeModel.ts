import {NodeModel} from "../NodeModel";
import {createNodeViewPropertiesDto, NodeSave} from "../NodeSave";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {OptionSegment} from "../../segment/imp/OptionSegment";
import {InputSegment} from "../../segment/imp/InputSegment";
import {SegmentSave} from "../../segment/SegmentSave";
import {NodeDimension} from "../NodeDimension";

export class ImageInputNodeModel extends NodeModel {

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
        return Promise.resolve(undefined);
    }

    loadSegments(save: NodeSave): void {
        let segments = this._segments;
        let saves = save.segmentSaves.sort((s1, s2) => s1.segmentIndex - s2.segmentIndex);
        if (saves.length !== segments.length) {
            throw new Error("Given Node save is not correct");
        }

        for (let i = 0; i < segments.length; i++) {
            segments[i].load(saves[i]);
        }
    }

    initSegments() {
        this._segments = [
            new OutputSegment(0, this, undefined),
            new OptionSegment(1, this, "val1", ["val1", "val2", "val3"], true, true),
            new InputSegment(2, this),
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
