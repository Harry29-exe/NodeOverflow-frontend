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
                <MenuItem as={RouterLink} to="/settings">
                    Settings
                </MenuItem>

                <MenuItem as={RouterLink} to="/projects">
                    Projects
                </MenuItem>

                <MenuItem as={RouterLink} to="/settings/user-settings">
                    Account settings
                </MenuItem>

                <MenuDivider/>

                <MenuItem onClick={() => authContext.logout()}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;