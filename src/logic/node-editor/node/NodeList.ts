import {NodeCreateFunction, NodeLoadFunction} from "../node-management/GlobalNodeFactory";
import {InputNodeModel} from "./implementations/InputNodeModel";
import {createCreateFunction, createLoadFunction, NodeModelConstructor, NodeModelLoader} from "./NodeModelUtils";
import {OutputNodeModel} from "./implementations/OutputNodeModel";

const nodesWithDefaultFactoryFunctions: [name: string, provider: NodeModelConstructor & NodeModelLoader][] = [
    ['Input node', InputNodeModel],
    ['Output node', OutputNodeModel]
]

const nodeList: [name: string, create: NodeCreateFunction, load: NodeLoadFunction][] = []

nodesWithDefaultFactoryFunctions.forEach(n => nodeList.push([n[0], createCreateFunction(n[1]), createLoadFunction(n[1])]))


export default nodeList;