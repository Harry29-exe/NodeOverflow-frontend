import {LinkModel} from "./LinkModel";
import {NodeModel} from "./node/NodeModel";
import {SegmentModel} from "./segment/SegmentModel";
import {NodeStorage, NodeStorageListener} from "./NodeStorage";
import {Storages} from "./Storages";

export class DefaultNodeStorage implements NodeStorage {
    private readonly _storageId: number;
    private nextNodeId = 0;
    private hoveredPort?: { segment: SegmentModel<any>, portType: "in" | "out" };
    private links: LinkModel[];
    private nodes: NodeModel[];
    private readonly listeners: NodeStorageListener[];

    constructor(nodes?: NodeModel[], links?: LinkModel[], listeners?: NodeStorageListener[]) {
        this._storageId = Storages.nextId;
        if (nodes) {
            this.nodes = nodes;
            let biggestNodeId = 0;
            nodes.forEach(n => biggestNodeId = biggestNodeId > n.id ? biggestNodeId : n.id);
            this.nextNodeId = biggestNodeId + 1;
        } else {
            this.nodes = [];
        }

        if (links) {
            this.links = links;
            links.forEach(link => {
                link.outputSegment.parent.addLink(link);
                link.inputSegment.parent.addLink(link);
            })
        } else {
            this.links = [];
        }
        this.listeners = listeners ? listeners : [];
    }

    getLinks(): LinkModel[] {
        return this.links;
    }

    getNodes(): NodeModel[] {
        return this.nodes;
    }

    addUpdateListener(listener: NodeStorageListener): number {
        return this.listeners.push(listener);
    }

    removeUpdateListener(listenerId: number): void {
        delete this.listeners[listenerId];
    }

    handleAddLink(link: LinkModel): void {
        let newLinkList = [link];
        this.links = newLinkList.concat(this.links);
        this.callListeners();
    }

    handleAttemptToAddLink(outputSegment: SegmentModel<any>): LinkModel | null {
        console.log("attempt to add link")
        if (this.hoveredPort && this.hoveredPort.portType === "in") {
            console.log("conditions fulfilled");
            let link = new LinkModel(outputSegment, this.hoveredPort.segment);
            this.links.push(link);
            link.outputSegment.parent.addLink(link);
            link.inputSegment.parent.addLink(link);
            this.callListeners();
            return link;
        }
        return null;
    }

    setHoveredPort(portsSegment: SegmentModel<any>, portType: "in" | "out"): void {
        this.hoveredPort = {segment: portsSegment, portType: portType};
        console.log("port added " + portsSegment.index)
    }

    clearHoveredPort(): void {
        console.log("port cleared " + this.hoveredPort?.segment.index)
        this.hoveredPort = undefined;
    }

    handleAddNode(node: NodeModel): void {
        if (node.id === this.nextNodeId) {
            let newNodeList = [node];
            this.nodes = newNodeList.concat(this.nodes);
            this.nextNodeId++;
            this.callListeners();
        } else {
            let nodeIdExist: boolean = false;
            this.nodes.forEach(n => nodeIdExist = nodeIdExist ? nodeIdExist : n.id === node.id);
            if (nodeIdExist) {
                throw new Error("Can not add node with id with is already assigned");
            } else {
                let newNodeList = [node];
                this.nodes = newNodeList.concat(this.nodes);
                this.nextNodeId = this.nextNodeId > node.id ? this.nextNodeId : node.id + 1;
                this.callListeners();
            }
        }
    }

    // handleAttemptToAddLink(outputSegment: SegmentModel<any>, targetX: number, targetY: number): LinkModel | null {
    //     let inputSegment: SegmentModel<any> | null = null;
    //     let nodes = this.nodes;
    //     let i = 0;
    //     while (i < nodes.length && inputSegment == null) {
    //         for (let j = 0; j < nodes[i].segments.length; j++) {
    //             //TODO
    //             // if (nodes[i].segments[j].portType !== PortType.INPUT) {
    //             //     continue;
    //             // }
    //             let portSize = nodes[i].dimensions.segmentHeight;
    //             //TODO
    //             // let xMin = nodes[i].segments[j].calcPortLeftOffsetToCenter() - portSize / 2;
    //             // let xMax = xMin + portSize;
    //             // let yMin = nodes[i].segments[j].calcPortTopOffsetToCenter() - portSize / 2;
    //             // let yMax = yMin + portSize;
    //             // if (targetX >= xMin && targetX <= xMax &&
    //             //     targetY >= yMin && targetY <= yMax) {
    //             //     inputSegment = nodes[i].segments[j];
    //             //     break;
    //             // }
    //         }
    //         i++;
    //     }
    //
    //     if (inputSegment != null) {
    //         this.handleRemoveLinks(inputSegment);
    //         let newLink = new LinkModel(outputSegment, inputSegment);
    //         outputSegment.parent.addLink(newLink);
    //         inputSegment.parent.addLink(newLink);
    //         this.links.push(newLink);
    //
    //         this.callListeners();
    //         return newLink;
    //     } else {
    //         return null;
    //     }
    // }

    handleRemoveLink(link: LinkModel): void {
        let links = this.links.filter(e => e !== null);
        for (let i = 0; i < links.length; i++) {
            let l = links[i];
            if (l.equals(link)) {
                l.outputSegment.parent.removeLink(l);
                l.inputSegment.parent.removeLink(l);
                delete links[i];
                break;
            }
        }
        this.links = links.filter(l => l !== null && l !== undefined);
        this.callListeners();
    }

    handleRemoveLinks(parent: SegmentModel<any>): void {
        let links = this.links.filter(e => e !== null);
        for (let i = 0; i < links.length; i++) {
            let l = links[i];
            if ((l.inputSegment.index === parent.index && l.inputSegment.parent.id === parent.parent.id) ||
                (l.outputSegment.index === parent.index && l.outputSegment.parent.id === parent.parent.id)) {
                l.outputSegment.parent.removeLink(l);
                l.inputSegment.parent.removeLink(l);
                delete links[i];
            }
        }
        this.links = links.filter(l => l !== null && l !== undefined);
        this.callListeners();
    }

    handleRemoveNode(node: NodeModel): void;
    handleRemoveNode(nodeId: number): void;
    handleRemoveNode(node: NodeModel | number): void {
        let nodeId: number = 0;
        if (typeof node == "number") {
            nodeId = node;
        } else {
            nodeId = node.id;
        }

        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === nodeId) {
                this.removeLinks(this.nodes[i].links);
                delete this.nodes[i];
                break;
            }
        }
        this.nodes = this.nodes.filter(n => n !== null && n !== undefined);
        this.callListeners();
    }

    handleUpdateNode(updatedNode: NodeModel): void {
        let nodes = this.nodes;
        let nodeIndex = 0;
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id === updatedNode.id) {
                nodeIndex = i;
                break;
            }
        }

        for (nodeIndex; nodeIndex < nodes.length - 1; nodeIndex++) {
            nodes[nodeIndex] = nodes[nodeIndex + 1];
        }
        nodes[nodes.length - 1] = updatedNode;
        this.callListeners();
    }

    getNextNodeId(): number {
        return this.nextNodeId;
    }

    private callListeners() {
        this.listeners.forEach(l => l(this.nodes, this.links));
    }

    private removeLinks(linksToRemove: LinkModel[]) {
        let links = this.links;
        let tempLink: LinkModel;
        for (let i = 0; i < links.length; i++) {
            tempLink = links[i];
            for (let j = 0; j < linksToRemove.length; j++) {
                if (linksToRemove[j] !== undefined && tempLink.equals(linksToRemove[j])) {
                    tempLink.inputSegment.parent.removeLink(tempLink);
                    tempLink.outputSegment.parent.removeLink(tempLink);
                    delete links[i];
                    delete linksToRemove[j];
                    break;
                }
            }
        }
        this.links = links.filter(l => l !== null && l != undefined);
    }


    get storageId(): number {
        return this._storageId;
    }
}