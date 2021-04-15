import {
    Button,
    Center,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';

export interface LoginWindowProps {
    onClose: () => void;
}

const LoginWindow = (props: LoginWindowProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure({defaultIsOpen: true, onClose: props.onClose});

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton/>
                <Divider w="100%"/>

                <ModalBody>

                    <Stack spacing={3} w={"100%"}>
                        <Text fontSize="lg" fontWeight="bold">Username</Text>
                        <Input placeholder="Username" size="lg" maxW={"100%"} boxSizing="border-box"/>
                        <Text fontSize="lg" fontWeight="bold">Password</Text>
                        <Input placeholder="Password" size="lg" maxW={"100%"} boxSizing="border-box"/>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Center w="100%">
                        <Button variant={"primarySolid"} size={"lg"}>Login</Button>
                    </Center>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};

export default LoginWindow;