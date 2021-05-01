import {AbstractAuthContext} from "../../../../logic/auth/AuthContext";
import React, {useState} from "react";
import {BasicRequestResult, notInitialized, RequestResult, RequestStatus} from "../../../../logic/utils/RequestResult";
import {changePassword} from "../../../../logic/change-settings/EditAccount";
import {Button, ButtonGroup, FormControl, FormHelperText, FormLabel, HStack, Input, VStack} from "@chakra-ui/react";
import SettingsHeader from "../../SettingsHeader";
import ResultAlert from "../../../utils/ResultAlert";

export const PasswordSettings = (props: { authContext: AbstractAuthContext<any> }) => {
    let [reqStatus, setReqStatus] = useState<RequestResult>(new BasicRequestResult(RequestStatus.NOT_INIT));
    const updatePassword = () => {
        debugger;
        let oldPassword = (document.getElementById("oldPassword") as HTMLInputElement).value;
        let newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
        let repeatedNewPassword = (document.getElementById("repeatedNewPassword") as HTMLInputElement).value;
        if (newPassword != repeatedNewPassword) {
            return;
        }

        setReqStatus({status: RequestStatus.IN_PROGRESS});
        changePassword(props.authContext, oldPassword, newPassword).then(
            value => setReqStatus(value)
        );
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

            <ResultAlert requestStatus={reqStatus} close={() => setReqStatus(notInitialized())}/>

            <HStack w={"100%"} justifyContent="flex-start" alignContent={"center"}>
                <ButtonGroup marginTop={4} size={"sm"}>
                    <Button variant={"primarySolid"} onClick={() => updatePassword()}>
                        Apply changes
                    </Button>

                    <Button variant={"primary"}>
                        Discard changes
                    </Button>
                </ButtonGroup>
            </HStack>
        </VStack>
    )
}