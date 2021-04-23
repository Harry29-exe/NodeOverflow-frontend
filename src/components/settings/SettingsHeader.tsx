import React from 'react';
import {Box, Divider} from "@chakra-ui/react";

const SettingsHeader = (props: { title: string, subtitle?: boolean }) => {
    return (
        <Box w="100%" fontWeight={500} fontSize={props.subtitle ? "xl" : "2xl"}>
            {props.title}

            <Divider borderBottom={(props.subtitle ? "1px" : "2px") + " solid"}
                     borderBottomColor={props.subtitle ? "whiteAlpha.600" : "primary.200"}
                     marginTop={2} marginBottom={props.subtitle ? 2 : 0}/>
        </Box>
    );
};

export default SettingsHeader;