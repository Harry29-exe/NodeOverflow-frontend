import React, {useContext} from 'react';
import {Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import UserIcon from "./UserIcon";
import {Link as RouterLink} from "react-router-dom";
import {AuthContext} from "../../logic/auth/AuthContext";

interface UserMenuProps {
    size: number;
}

const UserMenu = (props: UserMenuProps) => {
    let authContext = useContext(AuthContext);
    return (
        <Menu>
            <MenuButton as={Button} variant="ghost"
                        minW={0}
                        w={props.size} h={props.size}
                        padding={0} marginRight={props.size * 0.1}>
                <UserIcon size={props.size}/>
            </MenuButton>

            <MenuList fontSize={"lg"} fontWeight="bold">
                <MenuItem>
                    we
                </MenuItem>

                <MenuItem as={RouterLink} to="/settings"
                    // fontSize={"lg"} fontWeight="bold"
                >
                    Settings

                </MenuItem>

                <MenuItem
                    // fontSize={"lg"} fontWeight="bold"
                >
                    Item2
                </MenuItem>

                <MenuDivider/>

                <MenuItem onClick={() => authContext.logout()}
                    // fontSize={"lg"} fontWeight="bold"
                >
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;