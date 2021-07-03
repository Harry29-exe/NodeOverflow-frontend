import {ImageWorker} from "../ImageWorker";
import {AppImage} from "../structs/AppImage";
import WorkerLoader from "../WorkerLoader";

const CombineChannelsWebWorker = () => {
    self.addEventListener(
        "message",
        (message: MessageEvent<WebWorkerProps>) => {

        })
}

interface WebWorkerProps {
    red: Uint8ClampedArray,
    green: Uint8ClampedArray,
    blue: Uint8ClampedArray,
    alpha?: Uint8ClampedArray,
    width: number,
    height: number
}

export class CombineChannelsWorker implements ImageWorker<AppImage[], void, AppImage> {
    getParams(): void {
        return undefined;
    }

    isBusy(): boolean {
        return false;
    }

    async run(inputData: AppImage[], parameters?: void): Promise<AppImage> {
        if( inputData.length !== 3 && inputData.length !== 4) {
            return Promise.reject("Input data array should have 3 or 4 elements but has " + inputData.length);
        }

        let worker = WorkerLoader(CombineChannelsWebWorker);
        return new Promise<AppImage>((resolve, reject) => {
            worker.onmessage = (message: MessageEvent<Uint8ClampedArray>) => {
                let output = new AppImage(message.data, inputData[0].width, inputData[1].height);
                resolve(output);
                worker.terminate();
            }

            worker.postMessage(this.createWorkersProps(inputData), [inputData[0].data.buffer, inputData[1].data.buffer, inputData[2].data.buffer]);
        });
    }

    createWorkersProps(input: AppImage[]): WebWorkerProps {

        return {
            red: input[0].data,
            green: input[1].data,
            blue: input[2].data,
            alpha: input[3]? input[3].data: undefined,
            width: input[3].width,
            height: input[3].height
        }
    }

    setParams(parameters: void): void {
    }

}