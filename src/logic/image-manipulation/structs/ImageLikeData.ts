export enum ChanelType {
    RED = "red",
    GREEN = "green",
    BLUE = "blue",
    ALPHA = "alpha"
}

export enum ColorSpace {
    RGB,
    HSV,

}

export class ImageLikeData {
    private _numberOfChannels: number;
    private _channels: boolean[];
    private _data: Uint8ClampedArray;
    private _width: number;
    private _height: number;
    private _colorSpace: ColorSpace;

    constructor(data: Uint8ClampedArray, width: number, height: number, colorSpace?: ColorSpace, channels?: boolean[]) {
        this._channels = channels ? channels : [true, true, true, true];
        this._data = data;
        this._width = width;
        this._height = height;
        let sum = 0;
        this._channels.forEach(ch => sum = ch ? sum + 1 : sum);
        this._numberOfChannels = sum;
        this._colorSpace = colorSpace ? colorSpace : ColorSpace.RGB;
    }

    get numberOfChannels(): number {
        return this._numberOfChannels;
    }

    get channels(): boolean[] {
        return this._channels;
    }

    set channels(channels: boolean[]) {
        this._channels = channels;
        let sum = 0;
        channels.forEach(ch => sum = ch ? sum + 1 : sum);
        this._numberOfChannels = sum;
    }

    get data(): Uint8ClampedArray {
        return this._data;
    }

    set data(value: Uint8ClampedArray) {
        this._data = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get colorSpace(): ColorSpace {
        return this._colorSpace;
    }

    set colorSpace(value: ColorSpace) {
        this._colorSpace = value;
    }
}