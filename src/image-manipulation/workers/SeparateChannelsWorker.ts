export default () => {
    self.addEventListener("message", (message: MessageEvent<{ imageData: ImageData, channelId: number }>) => { // eslint-disable-line no-restricted-globals
        let imgData = message.data.imageData;
        let data = imgData.data;
        let channelId = message.data.channelId;
        let length = imgData.width * imgData.height;
        let imageChannel = new Uint8ClampedArray(length);
        for (let i = 0; i < length; i++) {
            imageChannel[i] = data[i * 4 + channelId];
        }

        // @ts-ignore
        postMessage({channelData: imageChannel}, [imageChannel.buffer]);
    });
}

export const createWorkerMessage = (imageData: ImageData, channelId: number) => {
    return {imageData: imageData, channelId: channelId};
}

export interface WorkerReturnType {
    channelData: Uint8ClampedArray;
}