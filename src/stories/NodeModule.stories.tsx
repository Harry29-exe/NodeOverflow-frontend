import NodeModule from "../node-module/NodeModule";
import {CreateImageInputNode} from "../node-module/nodes/ImageInputNode";
import {Meta, Story} from "@storybook/react/types-6-0";
import {CreateOutputNode} from "../node-module/nodes/OutputNode";
import {LinkModel} from "../node-module/node-atomic/Link";
import {CreateImageMixNode} from "../node-module/nodes/to-update/ImageMixNode";
import {NodeModel} from "../node-module/node-atomic/NodeModel";

export default {
    title: "Node/Wrappers/Node Module",
    component: NodeModule,

    argTypes: {
        nodes: {
            description: "List of NodeModel objects representing nodes which " +
                "NodeModule should contain at it's launch",
            table: {
                summary: "NodeModel[]",
                detail: "List of NodeModel objects "
            },
            control: {
                type: null
            },
            defaultValue: []
        },
        links: {
            description: "List of LinkModel objects representing nodes which " +
                "NodeModule should contain at it's launch",
            table: {
                summary: "LinkModel[]",
                detail: "List of LinkModel objects"
            },
            control: {
                type: null
            },
            defaultValue: []

        }
    },
    parameters: {
        docs: {
            //Prevents from circle JSON parsing
            source: {
                type: 'code'
            }
        }
    }
} as Meta

const exampleNodeList = [CreateImageInputNode(1, -360, 100),
    CreateImageInputNode(2, -360, -60),
    CreateOutputNode(3, 220, 80),
    CreateImageMixNode(4, 0, 0),
]

// const exampleLinkList = [
//     new LinkModel()
// ]

const NodeModuleTemplate: Story<{ nodes?: NodeModel[], links?: LinkModel[] }> = (args) =>
    <div style={{width: "70vw", height: "80vh", margin: 0, padding: 0, backgroundColor: "darkgray"}}>
        <NodeModule {...args}/>
    </div>

export const Primary = NodeModuleTemplate.bind({});
Primary.args = {
    nodes: exampleNodeList,
    links: []
}

export const Empty = NodeModuleTemplate.bind({});

export const BasicInputOutput = NodeModuleTemplate.bind({});
BasicInputOutput.args = {
    nodes: [CreateImageInputNode(0, -150, 0), CreateOutputNode(1, 100, 0)]
}


