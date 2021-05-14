import {NodeModel} from "../node/NodeModel";
import {NodeSave} from "../node/NodeSave";
import {NodeDimension} from "../node/NodeDimension";
import nodeList from "../NodeList";

export module GlobalNodeFactory {
    export const nodeCreateFunctions: Map<string, NodeCreateFunction> =
        new Map<string, NodeCreateFunction>(nodeList.map(n => [n[0], n[1]]));
    export const nodeLoadFunctions: Map<string, NodeLoadFunction> =
        new Map<string, NodeLoadFunction>(nodeList.map(n => [n[0], n[2]]));

    export const createNode = (nodeName: string, nodeId: number, storageId: number, x?: number, y?: number): NodeModel | null => {
        let factoryFun = nodeCreateFunctions.get(nodeName.toLowerCase());
        if (!factoryFun) {
            return null;
        }

        return factoryFun(nodeId, storageId, x ? x : 0, y ? y : 0);
    }

    export const loadNode = (nodeSave: NodeSave, storageId: number): NodeModel | null => {
        let factoryFun = nodeLoadFunctions.get(nodeSave.name);
        if (!factoryFun) {
            return null;
        }

        return factoryFun(nodeSave, storageId);
    }

}

export interface NodeLoadFunction {
    (nodeSave: NodeSave, storageId: number): NodeModel;
}

export interface NodeCreateFunction {
    (id: number, storage: number, x?: number, y?: number, dimensions?: NodeDimension): NodeModel;
}
