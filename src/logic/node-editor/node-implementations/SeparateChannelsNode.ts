import {NodeModel} from "../node/NodeModel";
import {createNodeSave, NodeSave} from "../node/NodeSave";
import {NodeDimension} from "../node/NodeDimension";
import {ContrastWorker} from "../../image-manipulation/workers/ContrastWorker";
import {SeparateChannelsWorker} from "../../image-manipulation/workers/SeparateChannelsWorker";
import {OutputSegment} from "../segment/imp/OutputSegment";
import {InputSegment} from "../segment/imp/InputSegment";
import {AppImage} from "../../image-manipulation/structs/AppImage";

export class SeparateChannelsNode extends NodeModel {
    private separateChannelsWorker;
    
    constructor(save: NodeSave, storageId: number);
    constructor(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension);
    constructor(id: number | NodeSave, storageId: number, x?: number, y?: number, dimensions?: NodeDimension) {
        if (typeof id === "number") {
            super(id, storageId, x, y, dimensions? dimensions: new NodeDimension(160, 50,22,22))
        } else {
            super(id, storageId);
        }

        this._name = 'Separate Channels Node';
        this.separateChannelsWorker = new SeparateChannelsWorker();

        this.initSegments();
        if (typeof id !== "number") {
            this.loadSegments(id);
        }
    }

    initSegments() {
        this._segments = [
            new OutputSegment(0, this, "red"),
            new OutputSegment(1, this, "green"),
            new OutputSegment(2, this, "blue"),
            new InputSegment(3, this)
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
    
    async getOutputValue(segmentIndex: number): Promise<AppImage> {
        let inputImage = await this._segments[3].value;
        return this.separateChannelsWorker.run(inputImage, {channelToSeparateId: segmentIndex});
    }

    save(): NodeSave {
        return createNodeSave(this);
    }
    
    
}