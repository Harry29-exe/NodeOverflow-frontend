import {ImageLikeData} from "../structs/ImageLikeData";

export const ChannelToImageWorker = () => {
    self.addEventListener("message", (message: MessageEvent<{ channelData: Uint8ClampedArray, width: number, height: number }>) => { // eslint-disable-line no-restricted-globals
        let data = message.data;
        let channelData = data.channelData;
        let dataLength = data.width * data.height;
        let imageData = new ImageData(data.width, data.height);
        let imageDataArray = imageData.data;

        let startIndex: number;
        let stopIndex: number;
        for (let i = 0; i < dataLength; i++) {
            startIndex = i * 4;
            stopIndex = startIndex + 3;
            for (startIndex; startIndex < stopIndex; startIndex++) {
                imageDataArray[startIndex] = channelData[i];
            }
        }

        // @ts-ignore
        postMessage(imageData, [imageData.data.buffer]);
    })
}

export default ChannelToImageWorker;

export const createWorkerMessage = (channelData: ImageLikeData) => {
    return {channelData: channelData.data, width: channelData.width, height: channelData.height};
}

export type WorkerReturnType = ImageData

