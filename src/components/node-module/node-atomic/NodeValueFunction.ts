import {NodeModel} from "../../../logic/node-editor/NodeModel";

export interface NodeValueFunction<T> {
    getNodeValue(node: NodeModel, segmentIndex: number): Promise<T>;
}

export class DummyValueFunction implements NodeValueFunction<any> {
    getNodeValue(node: NodeModel, segmentIndex: number): any {
        return undefined;
    }
}