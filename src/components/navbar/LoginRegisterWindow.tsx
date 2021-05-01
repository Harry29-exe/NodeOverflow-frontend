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
import ResultAlert from "../utils/ResultAlert";
import {notInitialized, RequestResult, RequestStatus} from "../../logic/utils/RequestResult";

export interface LoginRegisterWindowProps {
    onClose: () => void;
    type: "login" | "register";
}

const vars = {
    username: '',
    email: '',
    password: ''
}

const createRequestResult = (loginStatus: LoginStatus): RequestResult => {
    switch (loginStatus) {
        case LoginStatus.OK:
            return {status: RequestStatus.SUCCESS}
        case LoginStatus.FAIL:
            return {status: RequestStatus.FAIL}
        case LoginStatus.BAD_CREDENTIALS:
            return {status: RequestStatus.FAIL}
    }

}

const LoginRegisterWindow = (props: LoginRegisterWindowProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure({defaultIsOpen: true, onClose: props.onClose});
    const [typeEqLogin, changeType] = useState(props.type === 'login');
    const [reqResult, setReqStatus] = useState<RequestResult>(notInitialized());
    const authContext = useContext(AuthContext);

    const attemptToLogin = () => {
        setReqStatus({status: RequestStatus.IN_PROGRESS});
        authContext.login(vars.username, vars.password, true)
            .then(value => {
                if (value === LoginStatus.OK) onClose();
                else setReqStatus(createRequestResult(value));
            });
    }

    const attemptToRegister = async () => {
        let status = await register({username: vars.username, email: vars.email, password: vars.password});
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
                               boxSizing="border-box" onChange={(e: any) => vars.username = e.target.value}/>
                        {!typeEqLogin &&
                        <>
                            <Text fontSize="lg" fontWeight="bold">Email</Text>
                            <Input placeholder="Email" size="lg" maxW={"100%"}
                                   boxSizing="border-box" onChange={(e: any) => vars.email = e.target.value}/>
                        </>
                        }
                        <Text fontSize="lg" fontWeight="bold">Password</Text>
                        <Input placeholder="Password" size="lg" maxW={"100%"} type="password"
                               boxSizing="border-box" onChange={(e: any) => vars.password = e.target.value}/>

                        <ResultAlert requestStatus={reqResult}
                                     close={() => setReqStatus(notInitialized())}/>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Center w="100%">
                        <ButtonGroup size={"lg"} spacing={4}>
                            <Button variant={"primary"} onClick={() => changeType(!typeEqLogin)}>
                                {typeEqLogin ? "Register" : "Login"}
                            </Button>
                            <Button variant={"primarySolid"} onClick={typeEqLogin ? attemptToLogin : attemptToRegister}>
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