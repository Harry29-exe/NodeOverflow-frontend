import React from 'react';
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

const LoadProjectPanel = (props: { onClose: (projectData: string) => void }) => {
    let [value, setValue] = React.useState("")

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }

    return (
        <Modal isOpen={true} onClose={() => props.onClose(value)}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    Load Project
                </ModalHeader>
                <ModalCloseButton/>

                <ModalBody>
                    <Textarea value={value}
                              onChange={handleInputChange}
                              placeholder="Here is a sample placeholder"
                              size="sm"/>
                </ModalBody>

                <ModalFooter>
                    <Button variant={'solidPrimary'} onClick={() => props.onClose(value)}>
                        Okay
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoadProjectPanel;