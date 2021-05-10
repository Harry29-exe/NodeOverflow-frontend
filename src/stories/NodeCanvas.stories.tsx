import NodeCanvas, {NodeCanvasProps} from "../components/node-module/NodeCanvas";
import {NodeCanvasViewProperties} from "../components/node-module/NodeCanvasViewProperties";
import {Story} from "@storybook/react/types-6-0";
import {DefaultNodeStorage} from "../logic/node-editor/node-management/DefaultNodeStorage";

export default {
    title: "Node/Wrappers/Node Canvas",
    component: NodeCanvas,

    argTypes: {
        storage: {
            //TODO
            description: "storage - place where nods find home",
            table: {
                type: {
                    summary: "NodeStorage",
                    detail: "Object implementing NodeStorage interface usually DefaultNodeStorage"
                }
            },
            control: {
                type: null
            }
        },

        viewProps: {
            description: "It is basically state of NodeCanvas wrapped into object contain all transforms." +
                " It needs to be passed by parent component because other component perform actions " +
                "based on it's values, e.g. NodeControlPanel adds new nodes to canvas in the" +
                " way that they appearing on canvas in cursor position.",
            table: {
                type: {
                    summary: "NodeCanvasViewProperties",
                    detail: "Information about canvas transforms"
                }
            },
            control: {
                type: null
            }
        }
    },

    docs: {}
}

const nodeCanvasTemplate: Story<NodeCanvasProps> = (args) =>
    <div style={{width: "80vw", height: "80vh", margin: 0, padding: 0,}}>
        <NodeCanvas {...args}/>;
    </div>

export const NodeCanvasExample = nodeCanvasTemplate.bind({});

NodeCanvasExample.args = {
    storage: new DefaultNodeStorage(),
    viewProps: new NodeCanvasViewProperties(1, 0, 0),

}
