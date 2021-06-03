import {NodeCreateFunction, NodeLoadFunction} from "./node-management/GlobalNodeFactory";
import {ImageInputNodeModel} from "./node/implementations/ImageInputNodeModel";
import {createCreateFunction, createLoadFunction, NodeModelConstructor, NodeModelLoader} from "./node/NodeModelUtils";
import {OutputNodeModel} from "./node/implementations/OutputNodeModel";
import {TestNodeModel} from "./node/implementations/TestNodeModel";
import {ContrastNode} from "./node/implementations/ContrastNode";

const nodesWithDefaultFactoryFunctions: [name: string, provider: NodeModelConstructor & NodeModelLoader][] = [
    ['Image input', ImageInputNodeModel],
    ['Output node', OutputNodeModel],
    ['Test node', TestNodeModel],
    ['Contrast node', ContrastNode],

]

const nodeList: [name: string, create: NodeCreateFunction, load: NodeLoadFunction][] = []

nodesWithDefaultFactoryFunctions.forEach(n => nodeList.push([n[0], createCreateFunction(n[1]), createLoadFunction(n[1])]))


export default nodeList;