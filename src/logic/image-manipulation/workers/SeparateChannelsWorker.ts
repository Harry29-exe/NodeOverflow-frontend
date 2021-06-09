import {ImageWorker} from "../ImageWorker";
import {AppImage} from "../structs/AppImage";
import WorkerLoader from "../WorkerLoader";
import {workers} from "cluster";

const SeparateChannelsWebWorker = () => {
    self.addEventListener("message", (message: MessageEvent<{ imageData: Uint8ClampedArray, channels: number, channelId: number }>) => { // eslint-disable-line no-restricted-globals
        let data = message.data.imageData;
        let channelId = message.data.channelId;
        let channels = message.data.channels;

        let imageChannel = new Uint8ClampedArray(data.length);
        for (let i = channelId; i < data.length ; i = i + channels) {
            for(let j = i - channelId; j < i + channels; j++) {
                imageChannel[j] = data[i];
            }
        }

        // @ts-ignore
        postMessage(imageChannel, [imageChannel.buffer]);
    });
}

export interface SeparateChannelsParams {
    channelToSeparateId: number
}

export class SeparateChannelsWorker implements ImageWorker<AppImage, SeparateChannelsParams, AppImage> {
    private params: SeparateChannelsParams;


    constructor() {
        this.params = {channelToSeparateId: 0}
    }

    getParams(): SeparateChannelsParams {
        return this.params;
    }

    isBusy(): boolean {
        return false;
    }

    run(inputData: AppImage, parameters?: SeparateChannelsParams): Promise<AppImage> {
        let worker  = WorkerLoader(SeparateChannelsWebWorker);
        return new Promise<AppImage>((resolve, reject) => {
            worker.onmessage = (message: MessageEvent<Uint8ClampedArray>) => {
                inputData.data = message.data;
                resolve(inputData);
                worker.terminate();
            }

            worker.postMessage({
                imageData: inputData.data,
                channels: inputData.numberOfChannels,
                channelId: parameters? parameters.channelToSeparateId: this.params.channelToSeparateId }
                , [inputData.data.buffer]);
        });
    }

    setParams(parameters: SeparateChannelsParams): void {
        this.params = parameters;
    }



}