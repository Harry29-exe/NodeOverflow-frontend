import {NodeCreateFunction, NodeLoadFunction} from "./node-management/GlobalNodeFactory";
import {ImageInputNode} from "./node/implementations/ImageInputNode";
import {createCreateFunction, createLoadFunction, NodeModelConstructor, NodeModelLoader} from "./node/NodeModelUtils";
import {OutputNode} from "./node/implementations/OutputNode";
import {TestNode} from "./node/implementations/TestNode";
import {ContrastNode} from "./node/implementations/ContrastNode";
import {CapBrightnessNode} from "./node/implementations/CapBrightnessNode";

const nodesWithDefaultFactoryFunctions: [name: string, provider: NodeModelConstructor & NodeModelLoader][] = [
    ['Image input', ImageInputNode],
    ['Output node', OutputNode],
    ['Test node', TestNode],
    ['Contrast Node', ContrastNode],
    ['Cap Brightness Node', CapBrightnessNode],

]

const nodeList: [name: string, create: NodeCreateFunction, load: NodeLoadFunction][] = []

nodesWithDefaultFactoryFunctions.forEach(n => nodeList.push([n[0], createCreateFunction(n[1]), createLoadFunction(n[1])]))


export default nodeList;