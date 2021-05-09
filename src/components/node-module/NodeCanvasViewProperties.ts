export class NodeCanvasViewProperties {
    public scale: number;
    public shiftTop: number;
    public shiftLeft: number;

    constructor(scale: number, shiftTop: number, shiftLeft: number) {
        this.scale = scale;
        this.shiftTop = shiftTop;
        this.shiftLeft = shiftLeft;
    }
}