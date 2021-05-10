import {NodeModel} from "../node/NodeModel";

interface NodeFactory {
    createNode(nodeName: string): NodeModel;

    loadNode(nodeSave: string): NodeModel;
}


export default NodeFactory;