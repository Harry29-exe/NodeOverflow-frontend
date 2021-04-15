export interface ImageWorker<Input, Params, Output> {
    isBusy(): boolean;

    run(inputData: Input): Promise<Output>;

    getParams(): Params;

    setParams(parameters: Params): void;
}