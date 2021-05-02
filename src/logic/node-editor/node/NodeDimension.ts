export class NodeDimension {
    private _width: number;
    private _headHeight: number;
    private _segmentHeight: number;
    private _footerHeight: number;

    constructor(width: number, headHeight: number, segmentHeight: number, stopperHeight: number) {
        this._width = width;
        this._headHeight = headHeight;
        this._segmentHeight = segmentHeight;
        this._footerHeight = stopperHeight;
    }

    public equals(nodeDim: NodeDimension): boolean {
        return this._width === nodeDim.width && this._headHeight === nodeDim.headHeight
            && this._segmentHeight === nodeDim.segmentHeight && this._footerHeight === nodeDim.footerHeight;
    }

    public clone(): NodeDimension {
        return new NodeDimension(this._width, this._headHeight, this._segmentHeight, this._footerHeight);
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get headHeight(): number {
        return this._headHeight;
    }

    set headHeight(value: number) {
        this._headHeight = value;
    }

    get segmentHeight(): number {
        return this._segmentHeight;
    }

    set segmentHeight(value: number) {
        this._segmentHeight = value;
    }

    get footerHeight(): number {
        return this._footerHeight;
    }

    set footerHeight(value: number) {
        this._footerHeight = value;
    }
}