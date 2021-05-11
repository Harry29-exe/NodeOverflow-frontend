import {NodeCreateFunction, NodeLoadFunction} from "../node-management/GlobalNodeFactory";
import {NodeSave} from "./NodeSave";
import {NodeDimension} from "./NodeDimension";
import {NodeModel} from "./NodeModel";

export interface NodeModelConstructor {
    new(save: NodeSave, storageId: number): NodeModel,
}

export interface NodeModelLoader {
    new(id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension): NodeModel,
}

export const createFactoryFunctions =
    (creator: NodeModelConstructor & NodeModelLoader): [NodeCreateFunction, NodeLoadFunction] =>
        [createCreateFunction(creator), createLoadFunction(creator)]

export const createLoadFunction = (creator: NodeModelConstructor): NodeLoadFunction =>
    (save: NodeSave, storageId: number): NodeModel =>
        new creator(save, storageId);
export const createCreateFunction = (loader: NodeModelLoader): NodeCreateFunction =>
    (id: number, storageId: number, x?: number, y?: number, dimensions?: NodeDimension): NodeModel =>
        new loader(id, storageId, x, y, dimensions);