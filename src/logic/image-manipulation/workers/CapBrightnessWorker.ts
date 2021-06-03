import {ImageWorker} from "../ImageWorker";
import {NodeImage} from "../structs/NodeImage";
import WorkerLoader from "../WorkerLoader";

const CapBrightnessWorker = () => {
    self.addEventListener("message", (message: MessageEvent<{ imgArray: Uint8ClampedArray, capValue: number, capMax: boolean }>) => { // eslint-disable-line no-restricted-globals
        const capValue = message.data.capValue;
        const capAtMax = message.data.capMax;
        let data = message.data.imgArray;

        let j: number;
        let j3: number;
        let pxValue: number;
        let multiplayer: number;
        let newValue: number;
        for (let i = 0; i < data.length; i += 4) {
            j = i;
            j3 = j + 3;

            pxValue = Math.max(Math.max(data[i], data[i + 1]), data[i + 2]);

            if ((!capAtMax && pxValue < capValue) || (capAtMax && pxValue > capValue)) {
                if (pxValue === 0) {
                    for (j; j < j3; j++) {
                        data[j] = capValue;
                    }
                } else {
                    multiplayer = capValue / pxValue;
                    for (j; j < j3; j++) {
                        newValue = Math.floor(data[j] * multiplayer);
                        data[j] = newValue < 0 ? 0 : newValue > 255 ? 255 : newValue;
                    }
                }
            }
        }

        // @ts-ignore
        postMessage(data, [data.buffer]);
    });
}

export default CapBrightnessWorker;

export class CapBrightnessParams {
    public capValue: number;
    public capMax: boolean;

    constructor(capValue: number, capMax: boolean) {
        this.capValue = capValue;
        this.capMax = capMax;
    }
}

export class CapBrightnessImageWorker implements ImageWorker<NodeImage, CapBrightnessParams, NodeImage> {
    private params: CapBrightnessParams;
    private worker: Worker = WorkerLoader(CapBrightnessWorker);
    private _isBusy: boolean = false;

    constructor(parameters: CapBrightnessParams) {
        this.params = parameters;
    }

    isBusy(): boolean {
        return this._isBusy;
    }

    run(inputData: NodeImage): Promise<NodeImage> {
        if (this._isBusy) {
            return Promise.reject("Worker is busy");
        }
        this._isBusy = true;
        return new Promise<NodeImage>((resolve, reject) => {
            this.worker.onmessage = (message: MessageEvent<Uint8ClampedArray>) => {
                inputData.data = message.data;
                this._isBusy = false;
                resolve(inputData);
            }
            this.worker.onmessageerror = e => {
                this._isBusy = false;
                reject("Worker error");
            }
            this.worker.onerror = e => {
                this._isBusy = false;
                reject("Worker error");
            }

            this.worker.postMessage({
                imgArray: inputData.data,
                capValue: this.params.capValue,
                capMax: this.params.capMax
            }, [inputData.data.buffer]);
        });
    }

    getParams(): CapBrightnessParams {
        return this.params;
    }

    setParams(parameters: CapBrightnessParams): void {
        this.params = parameters;
    }
}
