import React from 'react';
import {ChangeSettingsStatus} from "../../logic/change-settings/ChangeSettingsStatus";
import {Alert, AlertIcon, Progress} from "@chakra-ui/react";

const ResultAlert = (props: { status: ChangeSettingsStatus, message?: string }) => {
    switch (props.status) {
        case "notInitialized":
            return <div/>;
        case "inProgress":
            return <Progress size={"xl"} isIndeterminate maxW={"100%"}/>;
        case "fail":
            return (
                <Alert status={"error"} boxSizing={"border-box"}>
                    <AlertIcon/>
                    {props.message ? props.message : "Something went wrong"}
                </Alert>
            );
        case "success":
            return (
                <Alert status={"success"} boxSizing={"border-box"}>
                    <AlertIcon/>
                    {props.message ? props.message : "Settings has been successfully edited."}
                </Alert>
            );
    }
};

export default ResultAlert;