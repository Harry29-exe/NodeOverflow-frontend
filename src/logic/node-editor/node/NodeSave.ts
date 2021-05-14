import {SegmentSave} from "../segment/SegmentSave";
import {NodeModel} from "./NodeModel";

export interface NodeSave {
    name: string,
    id: number,
    nodeViewProps: NodeViewPropertiesDto,
    segmentSaves: SegmentSave[],
    additionInfo?: any;
}

export const createNodeSave = (node: NodeModel, additionalInfo?: any, segmentSaves?: SegmentSave[]): NodeSave => {
    let saves: SegmentSave[] = [];
    if (!segmentSaves) {
        node.segments.forEach(s => saves.push(s.save()));
    }

    return {
        name: node.name,
        id: node.id,
        nodeViewProps: createNodeViewPropertiesDto(node.viewProperties),
        segmentSaves: segmentSaves ? segmentSaves : saves,
        additionInfo: additionalInfo
    }
}

export interface NodeViewPropertiesDto {
    dimensions: {
        width: number,
        headHeight: number,
        segmentHeight: number,
        footerHeight: number
    }
    x: number,
    y: number
}

export const createNodeViewPropertiesDto = (viewProps: NodeViewPropertiesDto): NodeViewPropertiesDto => {
    let dim = viewProps.dimensions;
    return {
        dimensions: {
            width: dim.width,
            headHeight: dim.headHeight,
            segmentHeight: dim.segmentHeight,
            footerHeight: dim.footerHeight
        },
        x: viewProps.x,
        y: viewProps.y,
    }
}