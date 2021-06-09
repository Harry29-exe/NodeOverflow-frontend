import {ImageWorker} from "../ImageWorker";
import {AppImage} from "../structs/AppImage";
import WorkerLoader from "../WorkerLoader";

export const InvertWorker = () => {
    self.addEventListener // eslint-disable-line no-restricted-globals
        ("message", (message: MessageEvent<{ imgData: Uint8ClampedArray, hasAlpha: boolean }>) => {

            let data = message.data.imgData;
            let hasAlpha = message.data.hasAlpha;
            let temp: number;

            if (!hasAlpha) {
                for (let i = 0; i < data.length; i++) {
                    temp = 255 - data[i];
                    data[i] = temp > 255 ? 255 : temp > 0 ? temp : 0;
                }
            } else {
                for (let i = 0; i < data.length; i++) {
                    if ((i + 1) % 4 === 0) {
                        continue;
                    }
                    temp = 255 - data[i];
                    data[i] = temp > 255 ? 255 : temp > 0 ? temp : 0;
                }
            }

            // @ts-ignore
            postMessage(data, [data.buffer]);
        })
}

export class InvertImageWorker implements ImageWorker<AppImage, void, AppImage> {
    private worker = WorkerLoader(InvertWorker);

    isBusy(): boolean {
        return false;
    }

    run(inputData: AppImage): Promise<AppImage> {
        return new Promise<AppImage>((resolve, reject) => {
            this.worker.onmessage = (message: MessageEvent<Uint8ClampedArray>) => {
                inputData.data = message.data;
                resolve(inputData);
            }

            this.worker.postMessage(this.createMessage(inputData), [inputData.data.buffer]);
        })
    }

    private createMessage = (inputData: AppImage) => {
        return {imgData: inputData.data, hasAlpha: inputData.numberOfChannels === 4}
    }

    setParams(parameters: void): void {
    }

    getParams(): void {
        return undefined;
    }
}