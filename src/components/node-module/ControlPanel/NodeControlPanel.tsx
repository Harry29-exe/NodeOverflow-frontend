import React, {useContext, useRef, useState} from 'react';
import {Button, ButtonGroup, HStack, useBoolean, useToast} from "@chakra-ui/react";
import {NodeCanvasViewProperties} from "../NodeCanvasViewProperties";
import {ProjectStorage} from "../../../logic/node-editor/node-management/ProjectStorage";
import NodeSelector from "./NodeSelector";
import {NodeCreateFunction} from "../../../logic/node-editor/node-management/GlobalNodeFactory";
import LoadProjectPanel from "./load/LoadProjectPanel";
import SaveProjectPanel from "./save/SaveProjectPanel";
import {loadProjectRequest, overwriteProjectDataRequest} from "../../../logic/projects/SaveProject";
import {AuthContext} from "../../../logic/auth/AuthContext";

type saveLoadState = "loadWindow" | "saveWindow" | "saveAsWindow" | "saving" | "none";

const NodeControlPanel = (props: { storage: ProjectStorage; viewProps: NodeCanvasViewProperties }) => {
    const [nodeSelectorOpen, toggleSelector] = useBoolean(false);
    const [saveLoadState, setSaveLoadState] = useState<saveLoadState>("none")
    const authContext = useContext(AuthContext);
    const panelRef = useRef<HTMLDivElement>(null);
    const toast = useToast();

    const getTopDist = (): number => {
        let top = panelRef.current?.getBoundingClientRect().top;
        let height = panelRef.current?.getBoundingClientRect().height;
        return top !== undefined && height !== undefined ? top + height : 0;
    }

    const handleNodeAdd = (screenX: number, screenY: number, createFun: NodeCreateFunction) => {
        let canvasElem = document.getElementById(props.storage.storageDomId + 'c');
        if (canvasElem === null) {
            return;
        }
        let canvasBox = canvasElem.getBoundingClientRect();
        let sc = props.viewProps.scale;
        let x = (screenX - canvasBox.left) / sc;
        let y = (screenY - canvasBox.top) / sc;

        let storage = props.storage;
        let node = createFun(storage.useNextNodeId(), storage.storageId);
        node.x = x - node.dimensions.width / 2;
        node.y = y - node.dimensions.headHeight / 2;
        storage.handleAddNode(node);
    }

    const handleProjectLoad = async (projectId: number) => {
        setSaveLoadState("none");
        let data = await loadProjectRequest(authContext, projectId);
        let saveString = (JSON.parse(data)).projectData;
        let save = JSON.parse(saveString);
        console.log(save)

        props.storage.load(save, projectId);

    }

    const handleQuickSave = async () => {
        let storage = props.storage;
        console.log(storage.projectId)

        if (storage.projectId !== undefined) {
            setSaveLoadState("saving");
            overwriteProjectDataRequest(authContext, storage.projectId, storage.save())
                .then(
                    value => {
                        toast({
                            title: value === 200 ? "Project saved" : "Something went wrong",
                            description: value === 200 ? "Project has been saved successfully" : "We could not save your project try again later",
                            status: value === 200 ? "success" : "error",
                            duration: 2000,
                            isClosable: true
                        })
                        setSaveLoadState("none");
                    },
                    reason => {
                        toast({
                            title: "Something went wrong",
                            description: "We could not save your project try again later",
                            status: "error",
                            duration: 2000,
                            isClosable: true
                        })
                        setSaveLoadState("none")
                    }
                );
        } else {
            setSaveLoadState("saveWindow");
        }
    }

    const renderOpenedWindow = () => {
        switch (saveLoadState) {
            case "none":
                return <div/>;
            case "loadWindow":
                return <LoadProjectPanel loadProject={handleProjectLoad} onClose={() => setSaveLoadState("none")}/>
            case "saveWindow":
                return <SaveProjectPanel projectData={JSON.stringify(props.storage.save())}
                                         onClose={() => setSaveLoadState("none")}/>
            case "saveAsWindow":
                return <SaveProjectPanel projectData={JSON.stringify(props.storage.save())}
                                         onClose={() => setSaveLoadState("none")}/>;
            default:
                return;
        }
    }

    return (
        <>
            <HStack ref={panelRef} w='100%' h='100%' bg={'gray.750'} borderBottom={'2px solid'}
                    borderColor={'primary.500'} zIndex={100}>
                <ButtonGroup variant='ghost' size='sm'>
                    <Button onClick={toggleSelector.toggle}>add node</Button>
                    <Button
                        onClick={() => setSaveLoadState(saveLoadState === "loadWindow" ? "none" : "loadWindow")}>load</Button>
                    <Button onClick={handleQuickSave} isLoading={saveLoadState === "saving"}>save</Button>
                    <Button
                        onClick={() => setSaveLoadState(saveLoadState === "saveAsWindow" ? "none" : "saveAsWindow")}>save
                        as</Button>

                </ButtonGroup>
            </HStack>

            <NodeSelector isOpen={nodeSelectorOpen} nodeDropped={handleNodeAdd}
                          distanceFromPageTop={getTopDist()}/>

            {
                renderOpenedWindow()
            }
        </>
    );
};

export default NodeControlPanel;

//
// import React, {PureComponent} from 'react';
// import {mainColors} from "../../App";
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