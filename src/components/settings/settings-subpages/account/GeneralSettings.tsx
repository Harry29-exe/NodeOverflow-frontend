import {AbstractAuthContext} from "../../../../logic/auth/AuthContext";
import React, {useState} from "react";
import {BasicRequestResult, notInitialized, RequestResult, RequestStatus} from "../../../../logic/utils/RequestResult";
import {changeEmail} from "../../../../logic/change-settings/EditAccount";
import {Button, ButtonGroup, FormControl, FormHelperText, FormLabel, HStack, Input, VStack} from "@chakra-ui/react";
import SettingsHeader from "../../SettingsHeader";
import ResultAlert from "../../../utils/ResultAlert";

export const GeneralSettings = (props: { authContext: AbstractAuthContext<any> }) => {
    let [reqStatus, setReqStatus] = useState<RequestResult>(new BasicRequestResult(RequestStatus.NOT_INIT));
    const updateGeneralSettings = () => {
        let emailElement = document.getElementById("email");
        let newEmail: string;
        if (emailElement instanceof HTMLInputElement) {
            newEmail = emailElement.value;
        } else {
            return;
        }

        setReqStatus({status: RequestStatus.IN_PROGRESS});
        changeEmail(props.authContext, newEmail).then(
            value => setReqStatus(value)
        );
    }

    return (
        <VStack w={"100%"}>
            <SettingsHeader title={"General"} subtitle/>

            <FormControl id="email" w="100%">
                <FormLabel>Email</FormLabel>
                <Input placeholder="email" type="email" maxW="80%"/>
                <FormHelperText>Enter your new email</FormHelperText>
            </FormControl>

            <ResultAlert requestStatus={reqStatus} close={() => setReqStatus(notInitialized())}/>

            <HStack w={"100%"} justifyContent="flex-start" alignContent={"center"}>
                <ButtonGroup marginTop={4} size={"sm"}>
                    <Button variant={"primarySolid"} onClick={() => updateGeneralSettings()}>Apply changes</Button>
                    <Button variant={"primary"}>Discard changes</Button>
                </ButtonGroup>
            </HStack>
        </VStack>
    )
}