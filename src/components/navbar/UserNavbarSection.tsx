import React, {useState} from 'react';
import {Button, ButtonGroup, Center, HTMLChakraProps} from "@chakra-ui/react";
import UserIcon from "./UserIcon";
import LoginRegisterWindow from "./LoginRegisterWindow";

export interface UserNavbarSectionProps extends HTMLChakraProps<"div"> {
}

interface LoginRegisterWindowState {
    open: boolean;
    type: "login" | "register";
}

export const UserNavbarSection = (props: UserNavbarSectionProps) => {
    let [loginRegisterWidowState, setWindowState] = useState<LoginRegisterWindowState>({
        open: false, type: "login"
    });
    let logged = false;
    const onClose = (): void => {
        setWindowState({open: false, type: "login"});
    }

    return (
        <Center>
            {logged ?
                <UserIcon size={35}/>
                :
                <ButtonGroup variant={"primary"} size={"sm"} marginLeft={2} marginRight={2}>
                    <Button onClick={() => setWindowState({open: true, type: "register"})}>
                        Sign up
                    </Button>
                    <Button onClick={() => setWindowState({open: true, type: "login"})} variant={"primarySolid"}>
                        Sign in
                    </Button>
                </ButtonGroup>
            }
            {loginRegisterWidowState.open ?
                <LoginRegisterWindow onClose={onClose} type={loginRegisterWidowState.type}/>
                :
                <div/>
            }
        </Center>
    );
};

export default UserNavbarSection;