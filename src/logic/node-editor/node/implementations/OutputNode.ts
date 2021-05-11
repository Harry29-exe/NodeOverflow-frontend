import {NodeModel} from "../NodeModel";
import {SegmentModel} from "../../segment/SegmentModel";
import {NodeSave} from "../NodeSave";
import {OutputSegment} from "../../segment/imp/OutputSegment";
import {GlobalNodeFactory} from "../../node-management/GlobalNodeFactory";
import {NodeDimension} from "../NodeDimension";

class OutputNode extends NodeModel {
    protected _segments: SegmentModel<any>[] = [
        new OutputSegment(0, this, () => {
        })
    ];
    readonly name: string = 'Output node';

    static nff = GlobalNodeFactory.nodesFactoryFunctions.set('Output node',
        {
            loadFunction: (nodeSave: NodeSave, storageId: number): NodeModel =>
                new OutputNode(nodeSave, storageId),
            createFunction: (id: number, storage: number, x?: number, y?: number): NodeModel =>
                new OutputNode(id, storage, x ? x : 0, y ? y : 0,
                    new NodeDimension(160, 26, 22, 22))
        })

    getOutputValue(segmentIndex: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    loadNode(save: NodeSave): void {
    }

    save(): NodeSave {
        return {} as NodeSave;
    }

}

// export const nff = GlobalNodeFactory.nodesFactoryFunctions.set('Output node',
//     {
//         loadFunction: (nodeSave: NodeSave, storageId: number): NodeModel =>
//             new OutputNode(nodeSave, storageId),
//         createFunction: (id: number, storage: number, x?: number, y?: number): NodeModel =>
//             new OutputNode(id, storage, x ? x : 0, y ? y : 0,
//                 new NodeDimension(160, 26, 22, 22))
//     })