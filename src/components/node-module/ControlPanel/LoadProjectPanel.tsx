import React from 'react';
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
import ProjectBrowser from "./project-browser/ProjectBrowser";

const LoadProjectPanel = (props: { loadProject: (projectId: number) => void, onClose: () => void }) => {
    let [value, setValue] = React.useState("")

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <Modal isOpen={true} onClose={props.onClose} size={"6xl"}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Load Project
                </ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <ProjectBrowser loadProject={props.loadProject}/>
                </ModalBody>

                <ModalFooter>
                    <Button variant={'solidPrimary'} onClick={props.onClose}>
                        Okay
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoadProjectPanel;