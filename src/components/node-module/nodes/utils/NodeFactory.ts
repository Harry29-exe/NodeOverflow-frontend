import {NodeDimension, NodeModel} from "../../../../logic/node-editor/NodeModel";
import {NodeSave} from "./NodeSave";
import {CapBrightnessNFF} from "../CapBrightnessNode";
import {ContrastNFF} from "../ContrastNode";
import {OutputNFF} from "../OutputNode";
import {ImageInputNFF} from "../ImageInputNode";

export interface CreateNode {
    (id: number, x?: number, y?: number): NodeModel;
}

export class CompleteNode {
    name: string;
    createNode: CreateNode;


    constructor(name: string, createNode: CreateNode) {
        this.name = name;
        this.createNode = createNode;
    }
}

export interface NodeFactoryFunction<Save extends NodeSave> {
    readonly nodeName: string;
    readonly defaultDimensions: NodeDimension;

    createNewNode(id: number, x?: number, y?: number): NodeModel;

    loadNode(id: number, save: Save): NodeModel;

    createNodeSave(nodeModel: NodeModel): Save;
}

export const NodeFactory = (nodeName: string): NodeFactoryFunction<any> => {
    let nodeFactoryFun = NodeFactoryFunctionMap.get(nodeName);
    if (nodeFactoryFun) {
        return nodeFactoryFun;
    } else {
        throw new Error();
    }
}

export const NodeFactoryFunctionMap = new Map<string, NodeFactoryFunction<any>>();
const addNFF = (...nFFs: NodeFactoryFunction<any>[]) => {
    nFFs.forEach(nFF =>
        NodeFactoryFunctionMap.set(nFF.nodeName, nFF)
    )
}
addNFF(
    new CapBrightnessNFF(),
    new ContrastNFF(),
    new OutputNFF(),
    new ImageInputNFF()
);

