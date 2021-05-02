import {SegmentModel} from "./segment/SegmentModel";
import React from "react";

export class LinkModel {
    private _outputSegment: SegmentModel<any>;
    private _inputSegment: SegmentModel<any>;
    private _update: () => void = () => {
    };

    constructor(outputSegment: SegmentModel<any>, inputSegment: SegmentModel<any>) {
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
        return this._update;
    }

    set update(value: () => void) {
        this._update = value;
    }

    get outputSegment(): SegmentModel<any> {
        return this._outputSegment;
    }

    get inputSegment(): SegmentModel<any> {
        return this._inputSegment;
    }
}