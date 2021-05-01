import React, {useContext} from 'react';
import {VStack} from "@chakra-ui/react";
import SettingsHeader from '../../SettingsHeader';
import {AuthContext} from "../../../../logic/auth/AuthContext";
import {GeneralSettings} from "./GeneralSettings";
import {PasswordSettings} from "./PasswordSettings";

const AccountSettings = () => {
    let authContext = useContext(AuthContext);

    return (
        <VStack w={"100%"} spacing={4}>
            <SettingsHeader title={"Account settings"}/>

            <GeneralSettings authContext={authContext}/>

            <PasswordSettings authContext={authContext}/>
        </VStack>
    );
};

export default AccountSettings;