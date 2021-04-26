import React, {Component} from 'react';
import Port from "./Port";
import {NodeStorage} from "../NodeStorage";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {NodeDimension, NodeModel, SegmentStyle} from "../../../logic/node-editor/NodeModel";

export enum PortType {
    INPUT,
    OUTPUT,
    NO_PORT
}

export class SegmentProps<T> {
    public segment: SegmentModel<T>;
    public storage: NodeStorage;
    public currentScale: NodeCanvasViewProperties;

    constructor(segment: SegmentModel<T>, storage: NodeStorage, currentScale: NodeCanvasViewProperties) {
        this.segment = segment;
        this.storage = storage;
        this.currentScale = currentScale;
    }
}

export abstract class Segment<Type, Props extends SegmentProps<Type>, State> extends Component<Props, State> {
    protected topPosition: number;
    protected segmentStyle = SegmentStyle;

    constructor(props: Props) {
        super(props);
        this.topPosition = this.props.segment.index * this.props.segment.parentDimensions.segmentHeight + this.props.segment.parentDimensions.headHeight;
        this.segmentStyle = SegmentStyle;
    }

    protected createOutputLabelStyle(): React.CSSProperties {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            pointerEvents: "none",
            textAlign: "right",
            top: this.topPosition,
            marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,
            height: dim.segmentHeight - 2 * this.segmentStyle.percentageOffsetTop * dim.segmentHeight,
            width: dim.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft) - 6,
            left: "-3px",
            marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,
            padding: 0,

            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",

            fontFamily: "Ubuntu",
            fontWeight: 400,
            fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight,
            color: "#fff",
            userSelect: "none"

        } as React.CSSProperties
    }

    protected createInputLabelStyle(): React.CSSProperties {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            pointerEvents: "none",
            textAlign: "left",
            top: this.topPosition,
            marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,
            height: dim.segmentHeight - 2 * this.segmentStyle.percentageOffsetTop * dim.segmentHeight,
            width: dim.width * (1 - 1.25 * this.segmentStyle.percentageOffsetLeft) - 6,
            left: "6px",
            marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,
            padding: 0,

            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",

            fontFamily: "Ubuntu",
            fontWeight: 400,
            fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight,
            color: "#fff",
            userSelect: "none"

        } as React.CSSProperties
    }

    protected createLabelStyle() {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            padding: 0,
            paddingLeft: "6px",
            top: this.topPosition,
            marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,
            height: dim.segmentHeight * (1 - 2 * this.segmentStyle.percentageOffsetTop),
            width: dim.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft) - 6,
            marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,

            overflow: "hidden",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",

            fontFamily: "Ubuntu",
            fontWeight: 400,
            color: "#fff",
            userSelect: "none",
            pointerEvents: "none",
            fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight,
            whiteSpace: "nowrap"
        } as React.CSSProperties
    }

    protected createPort(): JSX.Element {
        return this.props.segment.portType !== PortType.NO_PORT ? (
                <Port parent={this.props.segment} topPosition={this.topPosition}
                      storage={this.props.storage} currentScale={this.props.currentScale}/>)
            : <div/>;
    }

    get width(): number {
        return this.props.segment.parentDimensions.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft);
    }

    get height(): number {
        return this.props.segment.parentDimensions.segmentHeight * (1 - 2 * this.segmentStyle.percentageOffsetTop);
    }

    get offsetLeft(): number {
        return this.props.segment.parentDimensions.width * this.segmentStyle.percentageOffsetLeft;
    }

    get offsetTop(): number {
        return this.props.segment.parentDimensions.segmentHeight * this.segmentStyle.percentageOffsetTop;
    }
}

export abstract class SegmentModel<Type> {
    protected _parent: NodeModel | null = null;
    protected _index: number | null = null;
    protected _parentDimensions: NodeDimension | null = null;
    protected _value: Type;
    protected _portType: PortType;
    protected _label: string;
    protected readonly _spacesOccupied: number;

    protected constructor(label: string, value: Type, portType: PortType, spacesOccupied?: number) {
        this._value = value;
        this._portType = portType;
        this._label = label;
        this._spacesOccupied = spacesOccupied ? spacesOccupied : 1;
    }

    abstract createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element;

    initialize(parent: NodeModel, index: number, dimensions: NodeDimension) {
        this.parent = parent;
        this._index = index;
        this._parentDimensions = dimensions;
    }

    calcPortTopOffsetToCenter(): number {
        if (this._parentDimensions == null || this._index == null || this._parent == null) {
            throw new Error();
        }
        let dim = this._parentDimensions;
        return this._parent.y + dim.headHeight + dim.segmentHeight * (this._index + 0.5);
    }

    calcPortLeftOffsetToCenter(): number {
        if (this._parentDimensions == null || this._index == null || this._parent == null) {
            throw new Error();
        }
        switch (this.portType) {
            case PortType.INPUT:
                return this._parent.x;
            case PortType.OUTPUT:
                return this._parent.x + this._parentDimensions.width;
            case PortType.NO_PORT:
                return this._parent.x;
        }
    }

    get isInitialized(): boolean {
        return !(this._parent == null || this._index == null || this._parentDimensions == null);
    }

    get parent(): NodeModel {
        if (this._parent == null) {
            throw new Error("Segment is not initialized by node");
        } else {
            return this._parent;
        }
    }

    set parent(value: NodeModel) {
        this._parent = value;
    }

    get value(): Type {
        return this._value;
    }

    set value(value: Type) {
        this._value = value;
    }

    get index(): number {
        if (this._index == null) {
            throw new Error("Segment is not initialized by node");
        } else {
            return this._index;
        }
    }

    get portType(): PortType {
        return this._portType;
    }

    get parentDimensions(): NodeDimension {
        if (this._parentDimensions == null) {
            throw new Error("Segment is not initialized by node");
        } else {
            return this._parentDimensions;
        }
    }

    get label(): string {
        return this._label;
    }

    get spacesOccupied(): number {
        return this._spacesOccupied;
    }
}

export default Segment;