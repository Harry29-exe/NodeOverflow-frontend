import React from 'react';

const NodeControlPanel = () => {
    return (
        <div>

        </div>
    );
};

export default NodeControlPanel;
//
// import React, {PureComponent} from 'react';
// import {mainColors} from "../../App";
// import "./NodeControlPanel.css"
// import {Button, ButtonContent} from "../Button";
// import {UnfoldingButton} from "../UnfoldingButton";
// import {NodeStorage} from "./NodeStorage";
// import {NodeCanvasViewProperties} from "./NodeCanvasViewProperties";
// import {NodeFactoryFunction, NodeFactoryFunctionMap} from "./nodes/utils/NodeFactory";
//
// export class NodeControlPanel extends PureComponent<{ storage: NodeStorage, viewProps: NodeCanvasViewProperties }, any> {
//     private ref = React.createRef<HTMLDivElement>();
//     protected buttonsContent: ButtonContent[];
//
//
//     constructor(props: { storage: NodeStorage; viewProps: NodeCanvasViewProperties }) {
//         super(props);
//         this.buttonsContent = this.createButtonProps()
//     }
//
//     createBreakElement(): JSX.Element {
//         return <div style={{
//             borderLeft: "2px dotted " + mainColors.headerColor, height: "85%",
//             marginTop: "auto", marginBottom: "auto", marginLeft: "2px", marginRight: 0, padding: 0, width: 0
//         }}/>
//     }
//
//     createAddNodeEvent = (nodeCreateFunction: NodeFactoryFunction<any>) => {
//         return (event: any) => {
//             if (!this.ref.current) {
//                 throw new Error();
//             }
//             let storage = this.props.storage;
//             let newNode = nodeCreateFunction.createNewNode(storage.getNextNodeId());
//             let panelBox = this.ref.current.getBoundingClientRect();
//
//             let viewProps = this.props.viewProps
//             let nodeX = (event.clientX - panelBox.left - viewProps.width / 2) / viewProps.scale - viewProps.shiftLeft - newNode.dimensions.width / 2;
//             let nodeY = (event.clientY - (panelBox.top + panelBox.height) - viewProps.height / 2) / viewProps.scale - viewProps.shiftTop - newNode.dimensions.headHeight / 2;
//
//             newNode.x = nodeX;
//             newNode.y = nodeY;
//             storage.handleAddNode(newNode);
//             document.body.style.cursor = "auto";
//         }
//     }
//
//     createButtonProps = (): ButtonContent[] => {
//         let buttonPropsList: ButtonContent[] = [];
//         NodeFactoryFunctionMap.forEach(
//             nodeFF => buttonPropsList.push(new ButtonContent(nodeFF.nodeName, this.createAddNodeEvent(nodeFF)))
//         );
//         return buttonPropsList;
//     }
//
//     render() {
//         return (
//             <div ref={this.ref} style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "98.5%",
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "flex-start",
//                 paddingLeft: "1.5%",
//                 backgroundColor: mainColors.segmentColor,
//                 fontWeight: 400,
//                 boxShadow: "0 3px 3px 1px " + mainColors.borderColor,
//                 zIndex: 10
//             }}>
//
//                 {this.createBreakElement()}
//
//                 <UnfoldingButton label={"Add new node"}
//                                  unfocusedOnClick={true}
//                                  subButtonsContent={this.createButtonProps()}/>
//
//                 {this.createBreakElement()}
//
//                 <Button label={"label"} onClick={(event) => console.log(event)}/>
//
//                 {this.createBreakElement()}
//
//                 <Button label={"label"} onClick={(event) => console.log(event)}/>
//
//                 {this.createBreakElement()}
//
//             </div>
//         );
//     }
// }
//
//
// export default NodeControlPanel;