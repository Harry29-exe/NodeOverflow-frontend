import React, {useState} from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Box, ChakraProvider} from "@chakra-ui/react";
import MainPage from "./components/main-page/MainPage";
import EditorPage from "./components/node-module/EditorPage";
import Navbar from "./components/navbar/Navbar";
import theme from "./theme/theme";
import {FullScreenContext} from './logic/contexts/FullScreenContext';
import {initGlobalKeyListener} from "./logic/contexts/GlobalKeyListener";
import {JwtAuthContext} from "./logic/auth/JwtAuthContext";
import {AuthContext} from './logic/auth/AuthContext';
import SettingsPage from "./components/settings/SettingsPage";
import ProjectPage from "./components/projects/ProjectPage";
import ExamplesPageView from "./components/examples/View/ExamplesPageView";


export const mainColors = {
    backgroundColor: "#54606d",
    headerColor: "#299b91",
    borderColor: "#334447",
    segmentColor: "#3c454f",
    color: "#f7f7f7",
}

function App() {
    let [onFullscreen, setFullscreen] = useState(false);
    initGlobalKeyListener();

    return (
        <ChakraProvider theme={theme}>
            <FullScreenContext.Provider value={{onFullscreen: onFullscreen, toggleFullscreen: setFullscreen}}>
                <AuthContext.Provider
                    value={new JwtAuthContext()}>
                    <Router>
                        {!onFullscreen &&
                        <Navbar height={"50px"}/>
                        }

                        <Box pos={"absolute"} left={0} w={"100vw"}
                             style={{background: "linear-gradient(135deg, #2c7399, #1c665f)"}}
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
                                    <ExamplesPageView/>
                                </Route>

                                <Route path={"/settings"}>
                                    <SettingsPage/>
                                </Route>

                                <Route path={"/projects"}>
                                    <ProjectPage/>
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
