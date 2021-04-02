import {ImageLikeData} from "../structs/ImageLikeData";
import {ImageWorker} from "../ImageWorker";
import WorkerLoader from "../WorkerLoader";

const ContrastWorker = () => {

    self.addEventListener // eslint-disable-line no-restricted-globals
        ("message", (message: MessageEvent<{ imageData: Uint8ClampedArray, contrast: number }>) => {
            let data: Uint8ClampedArray = message.data.imageData;
            let contrast: number = message.data.contrast;
            let contrastFactor: number = (259 * (contrast + 255)) / (255 * (259 - contrast));
            console.log(contrast);
            console.log(contrastFactor);

            let length = data.length;
            let temp: number;

            //red
            for (let i = 0; i < length; i += 4) {
                temp = contrastFactor * (data[i] - 128) + 128
                data[i] = Math.floor(temp > 255 ? 255 : temp > 0 ? temp : 0);
            }

            //green
            for (let i = 1; i < length; i += 4) {
                temp = contrastFactor * (data[i] - 128) + 128
                data[i] = Math.floor(temp > 255 ? 255 : temp > 0 ? temp : 0);
            }

            //blue
            for (let i = 2; i < length; i += 4) {
                temp = contrastFactor * (data[i] - 128) + 128
                data[i] = Math.floor(temp > 255 ? 255 : temp > 0 ? temp : 0);
            }


            // @ts-ignore
            postMessage(data, [data.buffer]);
        });
}

export default ContrastWorker;

export class ContrastImageWorker implements ImageWorker<ImageLikeData, number, ImageLikeData> {
    private worker = WorkerLoader(ContrastWorker);
    private _isBusy = false;
    private contrast: number = 0;

    isBusy(): boolean {
        return this._isBusy;
    }

    run(inputData: ImageLikeData): Promise<ImageLikeData> {
        if (this._isBusy) {
            throw new Error("Worker is busy");
        }

        return new Promise<ImageLikeData>((resolve, reject) => {
            this.worker.onmessage = (message: MessageEvent<Uint8ClampedArray>) => {
                inputData.data = message.data;
                resolve(inputData);
            }

            this.worker.postMessage(this.createMessage(inputData), [inputData.data.buffer]);
        });
    }

    private createMessage(data: ImageLikeData) {
        return {imageData: data.data, hasAlpha: data.numberOfChannels === 4, contrast: this.contrast * 255}
    }

    setParams(parameters: number): void {
        this.contrast = parameters;
    }

    getParams(): number {
        return this.contrast;
    }

}