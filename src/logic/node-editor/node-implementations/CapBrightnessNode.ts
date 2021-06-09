import {NodeModel} from "../node/NodeModel";
import {createNodeViewPropertiesDto, NodeSave} from "../node/NodeSave";
import {NodeDimension} from "../node/NodeDimension";
import {ContrastWorker} from "../../image-manipulation/workers/ContrastWorker";
import {OutputSegment} from "../segment/imp/OutputSegment";
import {SliderSegment} from "../segment/imp/SliderSegment";
import {InputSegment} from "../segment/imp/InputSegment";
import {SegmentSave} from "../segment/SegmentSave";
import {CapBrightnessParams, CapBrightnessWorker} from "../../image-manipulation/workers/CapBrightnessWorker";
import {OptionSegment} from "../segment/imp/OptionSegment";

export class CapBrightnessNode extends NodeModel {
    private capBrightnessWorker;

    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        if (typeof id === "number") {
            super(id, storageId, x, y, dimensions)
        } else {
            super(id, storageId);
        }

        this._name = 'Cap Brightness Node';
        this.capBrightnessWorker = new CapBrightnessWorker();

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    initSegments() {
        this._segments = [
            new OutputSegment(0, this),
            new SliderSegment(1, this, 0, 255, 1, 255),
            new OptionSegment(2, this, "max", ["max", "min"], false, false),
            new InputSegment(3,this)
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
        let val = this._segments[1].value;
        let capAtMax = this._segments[2].value === "max";
        this.capBrightnessWorker.setParams(new CapBrightnessParams(val, capAtMax));

        let nodeImage = await this._segments[3].value
        let output = await this.capBrightnessWorker.run(nodeImage);
        return Promise.resolve(output);
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