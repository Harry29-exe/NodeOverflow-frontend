import {ImageWorker} from "../ImageWorker";
import {AppImage} from "../structs/AppImage";
import WorkerLoader from "../WorkerLoader";
import {workers} from "cluster";

const SeparateChannelsWebWorker = () => {
    self.addEventListener("message", (message: MessageEvent<{ imageData: Uint8ClampedArray, channels: number, hasAlpha: boolean, channelId: number }>) => { // eslint-disable-line no-restricted-globals
        let data = message.data.imageData;
        let channelId = message.data.channelId;
        let channels = message.data.channels;

        let imageChannel = new Uint8ClampedArray(data.length);
        let channelsToPaint = channels - (message.data.hasAlpha? 1: 0);
        for (let i = channelId; i < data.length ; i = i + channels) {
            for(let j = i - channelId; j < i + channelsToPaint; j++) {
                imageChannel[j] = data[i];
            }
        }

        if(message.data.hasAlpha) {
            for (let i = channels - 1; i < data.length ; i = i + channels) {
                imageChannel[i] = 255;
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
                hasAlpha: inputData.channels[3],
                channels: inputData.numberOfChannels,
                channelId: parameters? parameters.channelToSeparateId: this.params.channelToSeparateId }
                , [inputData.data.buffer]);
        });
    }

    setParams(parameters: SeparateChannelsParams): void {
        this.params = parameters;
    }



}