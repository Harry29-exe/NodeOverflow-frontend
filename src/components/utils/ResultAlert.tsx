import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton, Progress} from "@chakra-ui/react";
import {RequestResult} from "../../logic/utils/RequestResult";

type ChangeSettingsStatus = "notInitialized" | "inProgress" | "fail" | "success";

const ResultAlert = (props: {requestStatus: RequestResult, close: () => void}) => {
    let reqStatus = props.requestStatus;
    switch (reqStatus.status) {
        case "Not initialized":
            return <div/>;
        case "In progress":
            return (
                <Box
                    borderRadius={5} overflow="hidden">
                    <Progress size="md" isIndeterminate/>
                </Box>);
        case "Fail":
        case "Success":
            return (
                <Alert status={reqStatus.status === "Fail" ? "error" : "success"}
                       borderRadius={"md"} boxSizing={"border-box"} w={"100%"}>
                    <AlertIcon/>
                    <Box>
                        <AlertTitle>
                            {reqStatus.titleMessage ? reqStatus.titleMessage : reqStatus.status}
                        </AlertTitle>
                        {reqStatus.message ?
                            <AlertDescription>
                                {reqStatus.message}
                            </AlertDescription>
                            :
                            <div/>
                        }
                    </Box>
                    <CloseButton position="absolute" right="8px" top="8px"
                                 onClick={() => {props.close();} }/>
                </Alert>
            );
        default:
            return <div/>;
    }
};

export default ResultAlert;
