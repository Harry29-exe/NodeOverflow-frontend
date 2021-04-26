import React, {useContext} from 'react';
import {Box, Center, Flex, VStack} from "@chakra-ui/react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import AccountSettings from "./settings-subpages/AccountSettings";
import SettingsNavbar from "./SettingsNavbar";
import ProjectSettings from "./settings-subpages/ProjectSettings";
import VeryLongSettings from "./VeryLongSettings";
import {AuthContext} from "../../logic/auth/AuthContext";

const pathWithNames = [
    ['/settings/account', 'Account'],
    ['/settings/profile', 'Profile'],
    ['/settings/projects', 'Account settings'],
    ['/settings/test', 'test']
]

const SettingsPage = () => {
    let {path, url} = useRouteMatch();
    let authContext = useContext(AuthContext);

    if (!authContext.authInfo) {
        return (
            <Center fontSize={"2xl"} fontWeight={700}>To access this page you need to log in</Center>
        );
    }
    return (
        <VStack w="100%" h="100%">
            <Flex w="80%" h={"92%"} overflow="auto" marginTop="4%"
                  alignItems={["flex-start", "flex-start", "flex-start"]}
                  justifyContent={["center", null, "flex-start"]}
                  alignContent="flex-start"
                  flexFlow={["row wrap", null, "row nowrap"]}>

                <SettingsNavbar pathsWithNames={pathWithNames}/>

                <Box minW={"150px"} flexGrow={1}
                     marginLeft={["0", null, "16px"]}
                     marginTop={["30px", null, "0"]}>
                    <Switch>
                        <Route exact path={"/settings"}>
                            <AccountSettings/>
                        </Route>

                        <Route path={`${path}/account`}>
                            <AccountSettings/>
                        </Route>

                        <Route path={`${path}/profile`}>
                            <ProjectSettings/>
                        </Route>

                        <Route path={`${path}/test`}>
                            <VeryLongSettings/>
                        </Route>
                    </Switch>
                </Box>
            </Flex>
        </VStack>
    );
};

export default SettingsPage;