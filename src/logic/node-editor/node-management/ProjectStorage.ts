import {NodeModel} from "../node/NodeModel";
import {SegmentModel} from "../segment/SegmentModel";
import {LinkModel} from "../LinkModel";
import ProjectSave from "../ProjectSave";
import {ProjectViewProperties} from "./ProjectViewProperties";

export interface NodeStorageListener {
    (nodes: NodeModel[], links: LinkModel[]): void;
}

export interface ProjectStorage {
    storageId: number;
    storageDomId: string;
    projectViewProps: ProjectViewProperties;
    projectId?: number;
    stateHash: number;

    load(save: ProjectSave, projectId: number): void;

    save(): ProjectSave;

    //this returns listenerId
    addUpdateListener(listener: NodeStorageListener): number;

    removeUpdateListener(listenerId: number): void;

    setHoveredPort(portsSegment: SegmentModel<any>, portType: "in" | "out"): void;

    clearHoveredPort(): void;

    handleAttemptToAddLink(outputSegment: SegmentModel<any>): LinkModel | null;

    handleAddLink(link: LinkModel): void;

    handleAddNode(node: NodeModel): void;

    handleUpdateNode(node: NodeModel): void;

    handleRemoveLink(link: LinkModel): void;

    handleRemoveLinks(parent: SegmentModel<any>, portType: "in" | "out"): void;

    handleRemoveNode(node: NodeModel): void;

    handleRemoveNode(nodeId: number): void;

    getNextNodeId(): number;

    useNextNodeId(): number;

    getNodes(): NodeModel[];

    getLinks(): LinkModel[];
}

