import React, {useContext, useState} from 'react';
import {
    Button,
    ButtonGroup,
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
} from "@chakra-ui/react";
import {AuthContext, LoginStatus} from "../../logic/auth/AuthContext";
import {register} from "../../logic/auth/Register";

export interface LoginRegisterWindowProps {
    onClose: () => void;
    type: "login" | "register";
}

const LoginRegisterWindow = (props: LoginRegisterWindowProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure({defaultIsOpen: true, onClose: props.onClose});
    const [typeEqLogin, changeType] = useState(props.type === 'login');
    const [error, setError] = useState<String | null>(null);
    const authContext = useContext(AuthContext);
    let username = '';
    let email = '';
    let password = '';

    const attemptToLogin = () => {
        authContext.login(username, password, true)
            .then(
                value => {
                    if (value === LoginStatus.OK) {
                        onClose();
                    }
                }
            )
    }

    const attemptToRegister = async () => {
        let status = await register({username: username, email: email, password: password});
        if (status === 200) {
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{typeEqLogin ? 'Login' : 'Register'}</ModalHeader>
                <ModalCloseButton/>
                <Divider w="100%"/>

                <ModalBody>
                    <Stack spacing={3} w={"100%"}>
                        <Text fontSize="lg" fontWeight="bold">Username</Text>
                        <Input placeholder="Username" size="lg" maxW={"100%"}
                               boxSizing="border-box" onChange={(e: any) => username = e.target.value}/>
                        {!typeEqLogin &&
                        <>
                            <Text fontSize="lg" fontWeight="bold">Email</Text>
                            <Input placeholder="Username" size="lg" maxW={"100%"}
                                   boxSizing="border-box" onChange={(e: any) => username = e.target.value}/>
                        </>
                        }
                        <Text fontSize="lg" fontWeight="bold">Password</Text>
                        <Input placeholder="Password" size="lg" maxW={"100%"}
                               boxSizing="border-box" onChange={(e: any) => password = e.target.value}/>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Center w="100%">
                        <ButtonGroup size={"lg"} spacing={4}>
                            <Button variant={"primary"}
                                    onClick={() => changeType(!typeEqLogin)}>
                                {typeEqLogin ? "Register" : "Login"}
                            </Button>
                            <Button variant={"primarySolid"}
                                    onClick={typeEqLogin ? attemptToLogin : attemptToRegister}>
                                {typeEqLogin ? "Login" : "Register"}
                            </Button>
                        </ButtonGroup>
                    </Center>
                </ModalFooter>

            </ModalContent>
        </Modal>
    );
};

export default LoginRegisterWindow;