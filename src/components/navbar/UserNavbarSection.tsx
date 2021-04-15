import React, {useState} from 'react';
import {Button, ButtonGroup, Center, HTMLChakraProps} from "@chakra-ui/react";
import UserIcon from "./UserIcon";
import LoginWindow from "./LoginWindow";

export interface UserNavbarSectionProps extends HTMLChakraProps<"div"> {
}


export const UserNavbarSection = (props: UserNavbarSectionProps) => {
    let [loginWidowOpen, setLoginWindow] = useState(false);
    let logged = false;
    const onClose = (): void => {
        setLoginWindow(false);
    }

    return (
        <Center>
            {logged ?
                <UserIcon size={35}/>
                :
                <ButtonGroup variant={"primary"} size={"sm"} marginLeft={2} marginRight={2}>
                    <Button>
                        Sign up
                    </Button>
                    <Button variant={"primarySolid"} onClick={() => setLoginWindow(true)}>
                        Sign in
                    </Button>
                </ButtonGroup>
            }
            {loginWidowOpen ?
                <LoginWindow onClose={onClose}/>
                :
                <div/>
            }
        </Center>
    );
};

export default UserNavbarSection;