export class NodeCanvasViewProperties {
    public scale: number;
    public shiftTop: number;
    public shiftLeft: number;
    public width: number;
    public height: number;

    constructor(scale: number, shiftTop: number, shiftLeft: number, width: number, height: number) {
        this.scale = scale;
        this.shiftTop = shiftTop;
        this.shiftLeft = shiftLeft;
        this.width = width;
        this.height = height;
    }
}