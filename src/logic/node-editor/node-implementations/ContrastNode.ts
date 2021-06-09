import {NodeModel} from "../node/NodeModel";
import {createNodeViewPropertiesDto, NodeSave} from "../node/NodeSave";
import {OutputSegment} from "../segment/imp/OutputSegment";
import {SegmentModel} from "../segment/SegmentModel";
import {SliderSegment} from "../segment/imp/SliderSegment";
import {InputSegment} from "../segment/imp/InputSegment";
import {ContrastWorker} from "../../image-manipulation/workers/ContrastWorker";
import {SegmentSave} from "../segment/SegmentSave";
import {NodeDimension} from "../node/NodeDimension";

export class ContrastNode extends NodeModel {
    private contrastWorker;

    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        if (typeof id === "number") {
            super(id, storageId, x, y, dimensions)
        } else {
            super(id, storageId);
        }

        this._name = 'Contrast Node';
        this.contrastWorker = new ContrastWorker();

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    initSegments() {
        this._segments = [
            new OutputSegment(0, this),
            new SliderSegment(1, this, -1, 1, 100, 0),
            new InputSegment(2, this)
        ]
    }

    loadSegments(save: NodeSave) {
        let segments = this._segments;
        let saves = save.segmentSaves.sort((s1, s2) => s1.segmentIndex - s2.segmentIndex);
        if (saves.length !== segments.length) {
            throw new Error("Given Node save-load is not correct");
        }

        for (let i = 0; i < segments.length; i++) {
            segments[i].load(saves[i]);
        }
    }


    async getOutputValue(segmentIndex: number): Promise<any> {
        this.contrastWorker.setParams(this._segments[1].value);
        let input = await this._segments[2].value;
        return this.contrastWorker.run(input);
    }

    save(): NodeSave {
        let segmentSaves: SegmentSave[] = [];
        this._segments.forEach(s => segmentSaves.push(s.save()));
        return {
            name: this._name,
            id: this.id,
            nodeViewProps: createNodeViewPropertiesDto(this.viewProperties),
            segmentSaves: segmentSaves
        };
    }

}