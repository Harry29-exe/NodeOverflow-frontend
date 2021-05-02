import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, BoxProps, CloseButton, Progress} from "@chakra-ui/react";
import {RequestResult} from "../../logic/utils/RequestResult";

type ChangeSettingsStatus = "notInitialized" | "inProgress" | "fail" | "success";

type ResultAlertProps = BoxProps & { requestStatus: RequestResult, close: () => void };

// const ResultAlert = (props: ResultAlertProps) => {
//     let notInitialized = props.requestStatus.status === RequestStatus.NOT_INIT;
//
//     return (
//         // <Box w="100%" overflow="hidden">
//         // <Box w="100%" transform={notInitialized? "translate(-100%, 0)": ""}
//         //      transition="transform 2s 0.2s">
//
//             <ResultAlertInside {...props}/>
//
//     );
// }

const ResultAlert = (props: ResultAlertProps) => {
    let {requestStatus, close, ...rest} = props;
    switch (requestStatus.status) {
        case "Not initialized":
            return <div/>;
        case "In progress":
            return (
                <Box w={"100%"} {...rest} borderRadius={5}
                     overflow="hidden">
                    <Progress size="sm" isIndeterminate/>
                </Box>);
        case "Fail":
        case "Success":
            return (
                <Alert status={requestStatus.status === "Fail" ? "error" : "success"}
                       borderRadius={"md"} boxSizing={"border-box"}
                    // w={props.width? props.width: "100%"}
                       {...rest}
                >
                    <AlertIcon/>
                    <Box>
                        <AlertTitle>
                            {requestStatus.titleMessage ?
                                requestStatus.titleMessage
                                : requestStatus.status
                            }
                        </AlertTitle>
                        {requestStatus.message ?
                            <AlertDescription>
                                {requestStatus.message}
                            </AlertDescription>
                            :
                            <div/>
                        }
                    </Box>
                    <CloseButton position="absolute" right="8px" top="8px"
                                 onClick={() => {
                                     close();
                                 }}/>
                </Alert>
            );
        default:
            return <div/>;
    }
};

export default ResultAlert;
