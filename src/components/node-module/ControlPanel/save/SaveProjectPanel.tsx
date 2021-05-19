import React, {useState} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import SaveProjectForm from "./SaveProjectForm";
import SaveTypePanel from "./SaveTypePanel";

const SaveProjectPanel = (props: { projectData: string, onClose: () => void }) => {
    const [stage, setStage] = useState<"choose" | "cloud" | "local">("choose");

    return (
        <Modal isOpen={true} onClose={props.onClose} size={"5xl"}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Load Project
                </ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    {stage === "choose" ?
                        <SaveTypePanel setSaveType={setStage}/>
                        :
                        <SaveProjectForm onSubmit={props.onClose} projectData={props.projectData}/>
                    }

                </ModalBody>

                <ModalFooter>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};

export default SaveProjectPanel;