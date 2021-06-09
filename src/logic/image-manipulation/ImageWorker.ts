export interface ImageWorker<Input, Params, Output> {
    isBusy(): boolean;

    run(inputData: Input, parameters?: Params): Promise<Output>;

    getParams(): Params;

    setParams(parameters: Params): void;
}