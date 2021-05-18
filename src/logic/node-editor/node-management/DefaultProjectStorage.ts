import {LinkModel} from "../LinkModel";
import {NodeModel} from "../node/NodeModel";
import {SegmentModel} from "../segment/SegmentModel";
import {NodeStorageListener, ProjectStorage} from "./ProjectStorage";
import {Storages} from "./Storages";
import ProjectSave from "../ProjectSave";
import {GlobalNodeFactory} from "./GlobalNodeFactory";
import {createLinkSave} from "../LinkSave";
import {ProjectViewProperties} from "./ProjectViewProperties";
import {NodeCanvasViewProperties} from "../../../components/node-module/NodeCanvasViewProperties";

export class DefaultProjectStorage implements ProjectStorage {
    public readonly storageDomId: string;
    private readonly _storageId: number;
    private readonly listeners: NodeStorageListener[];
    private _projectId?: number = undefined
    private nextNodeId = 0;
    private hoveredPort?: { segment: SegmentModel<any>, portType: "in" | "out" };
    private links: LinkModel[];
    private nodes: NodeModel[];
    private _projectViewProps: ProjectViewProperties;


    constructor(projectViewProps?: ProjectViewProperties, nodes?: NodeModel[], links?: LinkModel[], listeners?: NodeStorageListener[]) {
        let id = Storages.nextId;
        this._storageId = id;
        this.storageDomId = `s${id}`;
        if (projectViewProps) {
            this._projectViewProps = projectViewProps;
        } else {
            this._projectViewProps = {
                canvasViewProps: new NodeCanvasViewProperties(1, 0, 0),
                editorSplitRatio: 0.6,
                nodeSelectorWidth: 214
            }
        }

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

    load(save: ProjectSave, projectId: number): void {
        this.nodes = [];
        this.links = [];
        this.callListeners();

        this._projectId = projectId;
        let nodes: NodeModel[] = [];
        let links: LinkModel[] = [];
        save.nodes.forEach(n => {
            let newNode = GlobalNodeFactory.loadNode(n, this.storageId);
            if (newNode) nodes.push(newNode)
        });
        let highestNodeId = 0;
        nodes.forEach(n => highestNodeId = n.id > highestNodeId ? n.id : highestNodeId);
        this.nextNodeId = highestNodeId + 1;

        save.links.forEach(l => {
            let inNode = nodes.find(n => n.id === l.inputNodeId);
            let outNode = nodes.find(n => n.id === l.outputNodeId);
            if (inNode && outNode) {
                let newLink = new LinkModel(
                    outNode.segments[l.outputSegmentIndex],
                    inNode.segments[l.inputSegmentIndex]);

                inNode.addLink(newLink);
                outNode.addLink(newLink);
                links.push(newLink);
            }
        });
        this.links = links;
        this.nodes = nodes;
        this._projectViewProps = save.viewProperties;

        this.callListeners();
    }

    save(): ProjectSave {
        let projectSave: ProjectSave = {
            viewProperties: this._projectViewProps,
            nodes: [],
            links: []
        }
        this.nodes.forEach(n => projectSave.nodes.push(n.save()));
        this.links.forEach(l => projectSave.links.push(createLinkSave(l)));

        return projectSave;
    }

    addUpdateListener(listener: NodeStorageListener): number {
        return this.listeners.push(listener);
    }

    removeUpdateListener(listenerId: number): void {
        delete this.listeners[listenerId];
    }

    handleAddLink(link: LinkModel): void {
        this.links.push(link);
        if (!link.inputSegment.parent.links.find(l => l.domId === link.domId)) {
            link.inputSegment.parent.addLink(link);
        }
        if (!link.outputSegment.parent.links.find(l => l.domId === link.domId)) {
            link.outputSegment.parent.addLink(link);
        }
        this.callListeners();
    }

    handleAttemptToAddLink(outputSegment: SegmentModel<any>): LinkModel | null {
        if (!this.hoveredPort || this.hoveredPort.portType !== "in" ||
            this.hoveredPort.segment.parent.id === outputSegment.parent.id) {
            return null;
        }

        let inputSegment = this.hoveredPort.segment;
        let link = new LinkModel(outputSegment, inputSegment);

        let segmentInputLink = inputSegment.parent.getSegmentLinks(inputSegment.index)
            .filter(l => l.inputSegment.parent.id === inputSegment.parent.id);
        if (segmentInputLink.length !== 0) {
            let linkToDelete = segmentInputLink[0];
            this.links = this.links.filter((l => !l.equals(linkToDelete)));
            linkToDelete.inputSegment.parent.removeLink(linkToDelete);
            linkToDelete.outputSegment.parent.removeLink(linkToDelete);
        }

        this.links.push(link);
        link.outputSegment.parent.addLink(link);
        link.inputSegment.parent.addLink(link);
        this.callListeners();
        return link;
    }

    setHoveredPort(portsSegment: SegmentModel<any>, portType: "in" | "out"): void {
        this.hoveredPort = {segment: portsSegment, portType: portType};
    }

    clearHoveredPort(): void {
        this.hoveredPort = undefined;
    }

    handleAddNode(node: NodeModel): void {
        if (node.id === this.nextNodeId) {
            this.nodes.push(node);
            this.nextNodeId += 1;
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

    handleRemoveLinks(parent: SegmentModel<any>, portType: "in" | "out"): void {
        let links = this.links.filter(e => e !== null);

        if (portType === "in") {
            for (let i = 0; i < links.length; i++) {
                let l = links[i];
                if (l.inputSegment.index === parent.index && l.inputSegment.parent.id === parent.parent.id) {
                    l.outputSegment.parent.removeLink(l);
                    l.inputSegment.parent.removeLink(l);
                    delete links[i];
                }
            }
        } else {
            for (let i = 0; i < links.length; i++) {
                let l = links[i];
                if (l.outputSegment.index === parent.index && l.outputSegment.parent.id === parent.parent.id) {
                    l.outputSegment.parent.removeLink(l);
                    l.inputSegment.parent.removeLink(l);
                    delete links[i];
                }
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

    useNextNodeId(): number {
        return this.nextNodeId++;
    }

    getLinks(): LinkModel[] {
        return this.links;
    }

    getNodes(): NodeModel[] {
        return this.nodes;
    }

    get projectId(): number | undefined {
        return this._projectId;
    }

    get projectViewProps(): ProjectViewProperties {
        return this._projectViewProps;
    }

    get storageId(): number {
        return this._storageId;
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
        this.links = links.filter(l => l !== null && l !== undefined);
    }
}