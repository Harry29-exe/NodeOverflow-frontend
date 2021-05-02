import {NodeViewProperties} from "./NodeViewProperties";
import {NodeDimension} from "./NodeDimension";
import {NodeSave} from "./NodeSave";
import {SegmentModel} from "../segment/SegmentModel";
import {LinkModel} from "../LinkModel";

export const SegmentStyle = {
    percentageOffsetTop: 0.15,
    percentageOffsetLeft: 0.08,
    fontSizeToSegmentHeight: 0.55,
}

export abstract class NodeModel {
    public readonly id: number;
    public abstract readonly name: string;
    private readonly _viewProperties: NodeViewProperties;
    protected abstract _segments: SegmentModel<any>[];
    private _links: LinkModel[] = [];

    constructor(save: NodeSave)
    constructor(id: number, x: number, y: number, dimensions: NodeDimension)
    constructor(saveOrId: number | NodeSave, x?: number, y?: number, dimensions?: NodeDimension) {
        if (typeof saveOrId === "number") {
            if (x === undefined || y === undefined || dimensions === undefined) {
                throw new Error("Illegal constructor");
            }
            this.id = saveOrId;
            this._viewProperties = new NodeViewProperties(dimensions, x, y);
        } else {
            this.id = saveOrId.id;
            this._viewProperties = saveOrId.nodeViewProps;
        }
    }

    abstract getOutputValue(segmentIndex: number): Promise<any>;

    abstract loadNode(save: NodeSave): void;

    abstract save(): NodeSave;

    addLink(link: LinkModel) {
        this._links.push(link);
    }

    removeLink(link: LinkModel) {
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

    getSegmentLinks(segmentIndex: number): LinkModel[] {
        return this._links.filter(link =>
            (link.inputSegment.parent.id == this.id && link.inputSegment.index === segmentIndex) ||
            (link.outputSegment.parent.id == this.id && link.outputSegment.index === segmentIndex)
        );
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
