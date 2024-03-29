import {SegmentModel} from "./segment/SegmentModel";
import {UniqueDomId} from "./UniqueDomId";

export class LinkModel implements UniqueDomId {
    private _outputSegment: SegmentModel<any>;
    private _inputSegment: SegmentModel<any>;
    public readonly domId: string;
    public readonly inputPortDomId: string;
    public readonly outputPortDomId: string;
    private _update: (() => void) | null = null;

    constructor(outputSegment: SegmentModel<any>, inputSegment: SegmentModel<any>) {
        this.domId = `${outputSegment.domId}-${inputSegment.domId}`;
        this.outputPortDomId = `${outputSegment.domId}out`;
        this.inputPortDomId = `${inputSegment.domId}in`;
        this._outputSegment = outputSegment;
        this._inputSegment = inputSegment;
    }

    equals(link: LinkModel): boolean {
        return this._outputSegment.index === link.outputSegment.index &&
            this._outputSegment.parent.id === link.outputSegment.parent.id &&
            this._inputSegment.index === link.inputSegment.index &&
            this._inputSegment.parent.id === link.inputSegment.parent.id;
    }

    get update(): () => void {
        if (!this._update) {
            throw new Error("Link not mounted")
        }
        return this._update;
    }

    setUpdate(value: (() => void) | null) {
        this._update = value;
    }

    get outputSegment(): SegmentModel<any> {
        return this._outputSegment;
    }

    get inputSegment(): SegmentModel<any> {
        return this._inputSegment;
    }
}