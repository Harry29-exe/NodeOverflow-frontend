import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Center, HTMLChakraProps, useBoolean} from "@chakra-ui/react";
import LoginRegisterWindow from "./LoginRegisterWindow";
import {AuthChangeListener, AuthContext} from "../../logic/auth/AuthContext";
import UserMenu from "./UserMenu";

export interface UserNavbarSectionProps extends HTMLChakraProps<"div"> {
}

interface LoginRegisterWindowState {
    open: boolean;
    type: "login" | "register";
}

export const UserNavbarSection = (props: UserNavbarSectionProps) => {
    const [loginRegisterWidowState, setWindowState] = useState<LoginRegisterWindowState>({open: false, type: "login"});
    let authContext = useContext(AuthContext);
    let [logged, setLogged] = useBoolean(authContext.isLogged);

    const onClose = (): void => {
        setWindowState({open: false, type: "login"});
    }

    useEffect(() => {
        const authListener: AuthChangeListener = (auth) => {
            if (auth) {
                setLogged.on()
            } else {
                setLogged.off();
            }
        }
        authContext.addListener(authListener);
        return () => authContext.removeListener(authListener);
    }, [])

    return (
        <Center>
            {logged ?
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