export class Color {
    private _red: number;
    private _green: number;
    private _blue: number;
    private _alpha: number;

    constructor(red: number, green: number, blue: number, alpha?: number) {
        this._red = red;
        this._green = green;
        this._blue = blue;
        this._alpha = alpha ? alpha : 0;
    }

    get red(): number {
        return this._red;
    }

    set red(value: number) {
        this._red = value > 255 ? 255 : value < 0 ? 0 : value;
    }

    get green(): number {
        return this._green;
    }

    set green(value: number) {
        this._green = value > 255 ? 255 : value < 0 ? 0 : value;
    }

    get blue(): number {
        return this._blue;
    }

    set blue(value: number) {
        this._blue = value > 255 ? 255 : value < 0 ? 0 : value;
    }

    get alpha(): number {
        return this._alpha;
    }

    set alpha(value: number) {
        this._alpha = value > 255 ? 255 : value < 0 ? 0 : value;
    }
}