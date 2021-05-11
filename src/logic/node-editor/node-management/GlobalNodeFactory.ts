import {NodeModel} from "../node/NodeModel";
import {NodeSave} from "../node/NodeSave";

export module GlobalNodeFactory {
    export const nodesFactoryFunctions: Map<string, NodeFactoryFunctions> =
        new Map<string, NodeFactoryFunctions>();

    export const createNode = (nodeName: string, nodeId: number, storageId: number, x?: number, y?: number): NodeModel | null => {
        let factoryFun = nodesFactoryFunctions.get(nodeName.toLowerCase());
        if (!factoryFun) {
            return null;
        }

        return factoryFun.createFunction(nodeId, storageId, x ? x : 0, y ? y : 0);
    }

    export const loadNode = (nodeSave: NodeSave, storageId: number): NodeModel | null => {
        let factoryFun = nodesFactoryFunctions.get(nodeSave.name.toLowerCase());
        if (!factoryFun) {
            return null;
        }

        return factoryFun.loadFunction(nodeSave, storageId);
    }

}

export interface NodeFactoryFunctions {
    loadFunction(nodeSave: NodeSave, storageId: number): NodeModel;

    createFunction(id: number, storage: number, x?: number, y?: number): NodeModel;
}
