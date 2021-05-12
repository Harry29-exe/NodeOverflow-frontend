import {NodeCreateFunction, NodeLoadFunction} from "./node-management/GlobalNodeFactory";
import {InputNodeModel} from "./node/implementations/InputNodeModel";
import {createCreateFunction, createLoadFunction, NodeModelConstructor, NodeModelLoader} from "./node/NodeModelUtils";
import {OutputNodeModel} from "./node/implementations/OutputNodeModel";

const nodesWithDefaultFactoryFunctions: [name: string, provider: NodeModelConstructor & NodeModelLoader][] = [
    ['Input node', InputNodeModel],
    ['Output node', OutputNodeModel],
    ['Input2 node', InputNodeModel],
    ['Output2 node', OutputNodeModel],
    ['Input3 node', InputNodeModel],
    ['Output3 node', OutputNodeModel],
    ['Input4 node', InputNodeModel],
    ['Output4 node', OutputNodeModel],
    ['Input5 node', InputNodeModel],
    ['Output5 node', OutputNodeModel]
]

const nodeList: [name: string, create: NodeCreateFunction, load: NodeLoadFunction][] = []

nodesWithDefaultFactoryFunctions.forEach(n => nodeList.push([n[0], createCreateFunction(n[1]), createLoadFunction(n[1])]))


export default nodeList;