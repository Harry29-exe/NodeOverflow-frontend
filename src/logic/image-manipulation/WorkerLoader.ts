export const WebWorkerCreator = (worker: any): Worker => {
    const code = worker.toString();
    const blob = new Blob(['(' + code + ')()']);
    return new Worker(URL.createObjectURL(blob));
}

export default WebWorkerCreator;