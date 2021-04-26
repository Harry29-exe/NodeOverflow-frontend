import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, FormControl, FormHelperText, FormLabel, HStack, Input, VStack} from "@chakra-ui/react";
import SettingsHeader from '../SettingsHeader';
import {AbstractAuthContext, AuthContext} from "../../../logic/auth/AuthContext";
import {changeEmail, changePassword} from "../../../logic/change-settings/EditAccount";
import {ChangeSettingsResponse} from "../../../logic/change-settings/ChangeSettingsResponse";
import ResultAlert from "../ResultAlert";

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

const GeneralSettings = (props: { authContext: AbstractAuthContext<any> }) => {
    let [result, setResult] = useState<ChangeSettingsResponse>({status: "notInitialized", message: ""});
    const updateGeneralSettings = () => {
        let emailElement = document.getElementById("email");
        let newEmail: string;
        if (emailElement instanceof HTMLInputElement) {
            newEmail = emailElement.value;
        } else {
            newEmail = "";
        }
        changeEmail(props.authContext, newEmail, setResult);
    }

    return (
        <VStack w={"100%"}>
            <SettingsHeader title={"General"} subtitle/>

            <FormControl id="email" w="100%">
                <FormLabel>Email</FormLabel>
                <Input placeholder="email" type="email" maxW="80%"/>
                <FormHelperText>Enter your new email</FormHelperText>
            </FormControl>

            <HStack w={"100%"} justifyContent="flex-start" alignContent={"center"}>
                <ButtonGroup marginTop={4} size={"sm"}>
                    <Button variant={"primarySolid"} onClick={() => updateGeneralSettings()}>Apply changes</Button>
                    <Button variant={"primary"}>Discard changes</Button>
                </ButtonGroup>
            </HStack>

            <ResultAlert status={result.status} message={result.message}/>
        </VStack>
    )
}

const PasswordSettings = (props: { authContext: AbstractAuthContext<any> }) => {
    let [result, setResult] = useState<ChangeSettingsResponse>({status: "notInitialized", message: ""});
    const updatePassword = () => {
        debugger;
        let oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
        let newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
        let repeatedNewPassword = (document.getElementById("repeatedNewPassword") as HTMLInputElement).value;
        if (newPassword != repeatedNewPassword) {
            return;
        }

        changePassword(props.authContext, oldPassword, newPassword, (val: any) => {
        });
    }
    return (
        <VStack w={"100%"}>
            <SettingsHeader title={"Change password"} subtitle/>
            <FormControl id="oldPassword" w="100%">
                <FormLabel>Old password</FormLabel>
                <Input placeholder="Enter you current password" type="password" maxW="80%"/>
                <FormHelperText>Enter your current username</FormHelperText>
            </FormControl>
            <FormControl id="newPassword" w="100%">
                <FormLabel>New password</FormLabel>
                <Input placeholder="Enter new password" type="password" maxW="80%"/>
                <FormHelperText>Enter your new password</FormHelperText>
            </FormControl>
            <FormControl id="repeatedNewPassword" w="100%">
                <FormLabel>Repeat new password</FormLabel>
                <Input placeholder="Repeat new password" type="password" maxW="80%"/>
                <FormHelperText>Repeat your new password</FormHelperText>
            </FormControl>

            <HStack w={"100%"} justifyContent="flex-start" alignContent={"center"}>
                <ButtonGroup marginTop={4} size={"sm"}>
                    <Button variant={"primarySolid"}>Apply changes</Button>
                    <Button variant={"primary"} onClick={() => updatePassword()}>Discard changes</Button>
                </ButtonGroup>
            </HStack>
        </VStack>
    )
}

export default AccountSettings;