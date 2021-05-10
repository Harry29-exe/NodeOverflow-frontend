import {NodeModel} from "../node/NodeModel";
import {NodeSave} from "../node/NodeSave";

export module GlobalNodeFactory {
    export const nodesFactoryFunctions: Map<string, NodeFactoryFunction> =
        new Map<string, NodeFactoryFunction>();

    export const createNode = (nodeName: string, storageId: number): NodeModel | null => {
        nodesFactoryFunctions.get(nodeName.toLowerCase());
        return null;
    }

    export const loadNode = (nodeSave: string): NodeModel | null => {
        return null;
    }

}

export interface NodeFactoryFunction {
    (nodeSave: NodeSave, storageId: number): NodeModel;
}