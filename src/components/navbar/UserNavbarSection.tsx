import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Center, HTMLChakraProps} from "@chakra-ui/react";
import LoginRegisterWindow from "./LoginRegisterWindow";
import {AuthContext} from "../../logic/auth/AuthContext";
import UserMenu from "./UserMenu";

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
    let authContext = useContext(AuthContext);
    const onClose = (): void => {
        setWindowState({open: false, type: "login"});
    }

    return (
        <Center>
            {authContext.isLogged ?
                <UserMenu size={35}/>
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