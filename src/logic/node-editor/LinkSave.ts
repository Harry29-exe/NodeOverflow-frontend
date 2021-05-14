import {LinkModel} from "./LinkModel";

interface LinkSave {
    inputNodeId: number;
    inputSegmentIndex: number;
    outputNodeId: number;
    outputSegmentIndex: number;
}

export const createLinkSave = (link: LinkModel): LinkSave => {
    return {
        inputNodeId: link.inputSegment.parent.id,
        inputSegmentIndex: link.inputSegment.index,
        outputNodeId: link.outputSegment.parent.id,
        outputSegmentIndex: link.outputSegment.index,

    }
}

export default LinkSave;