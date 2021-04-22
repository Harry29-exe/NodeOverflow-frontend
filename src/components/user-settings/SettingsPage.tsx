import React from 'react';
import {Center, Flex, VStack} from "@chakra-ui/react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import UserSettings from "./UserSettings";
import SettingsNavbar from "./SettingsNavbar";
import ProjectSettings from "./ProjectSettings";

const SettingsPage = () => {
    let {path, url} = useRouteMatch();

    return (
        <VStack w="100%" h="100%">
            <Flex w="80%" h={"92%"} overflow="auto"
                  alignItems="flex-start" justifyContent={["center", null, "flex-start"]} marginTop="4%"
                  flexFlow={["row wrap", null, "row nowrap"]}>
                <SettingsNavbar/>

                <Center marginLeft={4} marginTop={[6, 0]}>
                    <Switch>
                        <Route exact path={"/settings"}>
                            <UserSettings/>
                        </Route>

                        <Route path={`${path}/user-settings`}>
                            <UserSettings/>
                        </Route>

                        <Route path={`${path}/project-settings`}>
                            <ProjectSettings/>
                        </Route>
                    </Switch>
                </Center>
            </Flex>
        </VStack>
    );
};

export default SettingsPage;