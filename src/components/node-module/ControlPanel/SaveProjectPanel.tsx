import React, {useContext} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea
} from "@chakra-ui/react";
import {AuthContext} from "../../../logic/auth/AuthContext";
import {saveProjectRequest} from "../../../logic/node-editor/save-load/SaveProject";

const SaveProjectPanel = (props: { projectData: string, onClose: () => void }) => {
    const authContext = useContext(AuthContext);

    return (
        <Modal isOpen={true} onClose={props.onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Load Project
                </ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <Textarea value={props.projectData}
                              placeholder="Here is a sample placeholder"
                              size="sm"/>
                </ModalBody>

                <ModalFooter>
                    <Button variant={'primarySolid'} onClick={() => saveProjectRequest(authContext, props.projectData)}>
                        Save
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};

export default SaveProjectPanel;