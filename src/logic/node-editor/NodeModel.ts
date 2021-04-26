import {NodeValueFunction} from "../../components/node-module/node-atomic/NodeValueFunction";
import {PortType, SegmentModel} from "../../components/node-module/node-atomic/Segment";
import {LinkModel} from "../../components/node-module/node-atomic/Link";
import {PlaceholderSegmentModel} from "../../components/node-module/node-atomic/segments/PlaceholderSegment";

export const SegmentStyle = {
    percentageOffsetTop: 0.15,
    percentageOffsetLeft: 0.08,
    fontSizeToSegmentHeight: 0.55,
}

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

export class NodeViewProperties {
    private _selected: boolean = false;
    private _rolledUp: boolean = false;
    private readonly _dimensions: NodeDimension;
    private _x: number;
    private _y: number;


    constructor(dimensions: NodeDimension, x: number, y: number) {
        this._dimensions = dimensions;
        this._x = x;
        this._y = y;
    }

    get dimensions(): NodeDimension {
        return this._dimensions;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get rolledUp(): boolean {
        return this._rolledUp;
    }

    set rolledUp(value: boolean) {
        this._rolledUp = value;
    }
}

export class NodeModel {
    public readonly id: number;
    public readonly name: string;
    private readonly _valueFunction: NodeValueFunction<any>;
    private readonly _viewProperties: NodeViewProperties;
    private _segments: SegmentModel<any>[] = [];
    private _links: LinkModel[] = [];

    constructor(id: number, name: string,
                x: number, y: number,
                dimensions: NodeDimension,
                valueFunction: NodeValueFunction<any>,
                segments?: SegmentModel<any>[],) {
        this.id = id;
        this.name = name;

        this._valueFunction = valueFunction;
        this._viewProperties = new NodeViewProperties(
            dimensions, x, y);

        if (segments != null) {
            segments.forEach(s => this.addSegment(s));
        }
    }

    addSegment(segment: SegmentModel<any>) {
        if (!segment.isInitialized) {
            segment.initialize(this, this._segments.length, this.dimensions);
            this._segments.push(segment);
            if (segment.spacesOccupied > 1) {
                for (let i = 0; i < segment.spacesOccupied - 1; i++) {
                    let temp = new PlaceholderSegmentModel();
                    temp.initialize(this, this._segments.length, this.dimensions);
                    this._segments.push(temp);
                }
            }
        } else {
            throw new Error("Segment can belong only to one Node");
        }
    }

    addLink(link: LinkModel) {
        this._links.push(link);
    }

    removeLink(link: LinkModel) {
        // debugger;
        let links = this.links.filter(e => e !== null);
        for (let i = 0; i < links.length; i++) {
            if (links[i].equals(link)) {
                delete links[i];
                break;
            }
        }
        links = links.filter(e => e !== null && e !== undefined);
        this._links = links;
    }

    getNodeValue(outputIndex: number): Promise<any> {
        return this._valueFunction.getNodeValue(this, outputIndex);
    }

    getSegmentLinks(segmentIndex: number): LinkModel[] {
        let segmentLinks: LinkModel[] = [];
        if (this._segments[segmentIndex].portType === PortType.OUTPUT) {
            this._links.forEach(l => {
                if (l.outputSegment.index === segmentIndex &&
                    l.outputSegment.parent.id === this.id) {
                    segmentLinks.push(l);
                }
            });
        } else if (this._segments[segmentIndex].portType === PortType.INPUT) {
            this._links.forEach(l => {
                if (l.inputSegment.index === segmentIndex &&
                    l.inputSegment.parent.id === this.id) {
                    segmentLinks.push(l);
                }
            });
        }

        return segmentLinks
    }

    checkIfPointInsideNode(x: number, y: number): boolean {
        let viewProps = this._viewProperties;
        let dim = this._viewProperties.dimensions;
        return x > viewProps.x && x < viewProps.x + dim.width &&
            y > viewProps.y && y < viewProps.y + this.height;
    }

    get outputLinkNumber(): number {
        let i = 0;
        this._links.forEach(l => i = l.outputSegment.parent.id === this.id ? i + 1 : i);
        return i;
    }

    get links(): LinkModel[] {
        return this._links;
    }

    get x(): number {
        return this._viewProperties.x;
    }

    set x(value: number) {
        this._viewProperties.x = value;
    }

    get y(): number {
        return this._viewProperties.y;
    }

    set y(value: number) {
        this._viewProperties.y = value;
    }

    get dimensions(): NodeDimension {
        return this._viewProperties.dimensions;
    }

    get height(): number {
        let dim = this._viewProperties.dimensions;
        return dim.headHeight + dim.footerHeight +
            this.segments.length * dim.segmentHeight;
    }

    get segments(): SegmentModel<any>[] {
        return this._segments;
    }

    get viewProperties(): NodeViewProperties {
        return this._viewProperties;
    }
}
