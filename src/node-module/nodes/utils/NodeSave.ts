import {FileToLoad} from "./FileToLoad";
import {NodeDimension, NodeModel} from "../../node-atomic/NodeModel";

export class NodeSave {
    public readonly id: number;
    public readonly selected: boolean;
    public readonly rolledUp: boolean;
    public readonly nodeDimensions: NodeDimension | null;
    public readonly x: number;
    public readonly y: number;
    public readonly fileToLoadList: FileToLoad[] = [];

    constructor(nodeModel: NodeModel, nodeDefaultDim: NodeDimension) {
        this.id = nodeModel.id;
        this.selected = nodeModel.viewProperties.selected;
        this.rolledUp = nodeModel.viewProperties.rolledUp;
        this.x = nodeModel.x;
        this.y = nodeModel.y;
        if (!nodeDefaultDim.equals(nodeModel.dimensions)) {
            let dim = nodeModel.dimensions;
            this.nodeDimensions = new NodeDimension(
                dim.width, dim.headHeight, dim.segmentHeight, dim.footerHeight
            );
        } else {
            this.nodeDimensions = null;
        }
    }
}