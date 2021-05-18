import React, {useContext} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {AuthContext} from "../../../logic/auth/AuthContext";
import {saveProjectRequest} from "../../../logic/projects/SaveProject";
import SaveProjectForm from "./SaveProjectForm";

const SaveProjectPanel = (props: { projectData: string, onClose: () => void }) => {
    const authContext = useContext(AuthContext);

    return (
        <Modal isOpen={true} onClose={props.onClose} size={"5xl"}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Load Project
                </ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <SaveProjectForm/>
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