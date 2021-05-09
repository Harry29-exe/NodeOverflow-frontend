import {NodeDimension} from "./NodeDimension";

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