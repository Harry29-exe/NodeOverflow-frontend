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

const LoadProjectPanel = (props: { onLoadRequest: (projectData: string) => void, onClose: () => void }) => {
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
                    {/*<Textarea value={value}*/}
                    {/*          onChange={handleInputChange}*/}
                    {/*          placeholder="Here is a sample placeholder"*/}
                    {/*          size="sm"/>*/}
                    <ProjectBrowser/>
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