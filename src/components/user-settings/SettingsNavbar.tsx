import React, {PropsWithChildren, useState} from 'react';
import {Box, Link, StackDivider, VStack} from "@chakra-ui/react";
import {Link as RouterLink, useRouteMatch} from "react-router-dom";

const SettingsNavbar = () => {
    let {path, url} = useRouteMatch();
    let [newPath, changePath] = useState<string>(path);

    return (
        <VStack pos={["relative", null, "sticky"]} top="0"
                minW={["250px", "480px", "200px", "250px"]}
                borderRadius="lg" border="2px solid" borderColor={"gray.500"}
                divider={<StackDivider borderColor={"gray.500"}/>}
                fontSize="lg" fontWeight={500} align={"left"} overflow="auto" spacing={0}
        >

            <SettingsSection>Settings</SettingsSection>


            <Box m={0} w={"100%"} borderTop={"1px solid"} borderColor="inherit"/>

            <SettingsLink to={"/settings/user-settings"}
                          currentPath={newPath} changePath={changePath}>
                Account settings
            </SettingsLink>

            <SettingsLink to="/settings/project-settings"
                          currentPath={newPath} changePath={changePath}>
                Project settings

            </SettingsLink>

        </VStack>
    );
};

interface SettingsLinkProps {
    to: string,
    currentPath: string,
    changePath: (newPath: string) => void
}

const SettingsLink = (props: PropsWithChildren<SettingsLinkProps>) => {
    return (
        <Link as={RouterLink} to={props.to} _hover={{fontStyle: "normal"}}
              onClick={() => props.changePath(props.to)}>
            <Box padding={2}
                 borderLeft={props.currentPath === props.to ? "4px solid" : ""}
                 borderColor={"primary.400"}
                 _hover={{
                     bg: "gray.750", cursor: "pointer",
                     borderLeft: "4px solid", borderLeftColor: "primary.400"
                 }}
                 boxSizing="border-box">

                {props.children}

            </Box>
        </Link>
    )
}

const SettingsSection = (props: PropsWithChildren<any>) => {
    return (
        <Box p={2} bg={"gray.750"} color={"whiteAlpha.800"}>
            {props.children}
        </Box>
    )
}


export default SettingsNavbar;