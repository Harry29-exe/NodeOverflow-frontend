import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Box, ChakraProvider} from "@chakra-ui/react";
import ExamplesPage from "./components/examples/ExamplesPage";
import MainPage from "./components/main-page/MainPage";
import EditorPage from "./components/node-module/EditorPage";
import Navbar from "./components/navbar/Navbar";
import theme from "./theme/theme";
import {FullScreenContext} from './logic/FullScreenContext';
import {initGlobalKeyListener} from "./logic/GlobalKeyListener";
import {JwtAuthContext, JwtToken} from "./logic/auth/JwtAuthContext";
import {AuthContext, AuthState} from './logic/auth/AuthContext';
import SettingsPage from "./components/settings/SettingsPage";


export const mainColors = {
    backgroundColor: "#54606d",
    headerColor: "#299b91",
    borderColor: "#334447",
    segmentColor: "#3c454f",
    color: "#f7f7f7",
}

const providers = (props: React.PropsWithChildren<any>) => {

}

function App() {
    let [onFullscreen, setFullscreen] = useState(false);
    let [authentication, updateAuthentication] = useState<JwtToken | undefined>(undefined);
    initGlobalKeyListener();

    return (
        <ChakraProvider theme={theme}>
            <FullScreenContext.Provider value={{onFullscreen: onFullscreen, toggleFullscreen: setFullscreen}}>
                <AuthContext.Provider
                    value={new JwtAuthContext(new AuthState<JwtToken>(updateAuthentication, authentication))}>
                    <Router>
                        {!onFullscreen &&
                        <Navbar height={"50px"}/>
                        }

                        <Box pos={"absolute"} left={0} w={"100vw"}
                             h={onFullscreen ? "100vh" : "calc(100vh - 50px)"}
                             top={onFullscreen ? 0 : "50px"}>
                            <Switch>
                                <Route exact path={"/"}>
                                    <MainPage/>
                                </Route>

                                <Route path={"/editor"}>
                                    <EditorPage/>
                                </Route>

                                <Route path={"/examples"}>
                                    <ExamplesPage/>
                                </Route>

                                <Route path={"/settings"}>
                                    <SettingsPage/>
                                </Route>
                            </Switch>
                        </Box>
                    </Router>

                </AuthContext.Provider>
            </FullScreenContext.Provider>
        </ChakraProvider>
    );
}

export default App;
