import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Box, ChakraProvider} from "@chakra-ui/react";
import ExamplesPage from "./components/examples/ExamplesPage";
import MainPage from "./components/main-page/MainPage";
import Theme from "./theme/Theme";
import EditorPage from "./components/node-module/EditorPage";
import {AuthContext} from "./logic/auth/AuthContext";
import {JwtToken} from "./logic/auth/JwtToken";
import Navbar from "./components/navbar/Navbar";

export const PressedKeys: { keys: string[] } = {
    keys: []
}

export const mainColors = {
    backgroundColor: "#54606d",
    headerColor: "#299b91",
    borderColor: "#334447",
    segmentColor: "#3c454f",
    color: "#f7f7f7",
}

const navbarSize = "50px";

function App() {

    let handleKeyDown = (event: any) => {
        console.log("key down " + event.code);
        if (!PressedKeys.keys.includes(event.code)) {
            PressedKeys.keys.push(event.code);
        }
    }

    let handleKeyUp = (event: any) => {
        PressedKeys.keys = PressedKeys.keys.filter(k => k !== event.code);
    }
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return (
        <ChakraProvider theme={Theme}>
            <AuthContext.Provider value={new JwtToken("")}>

                <Router>
                    <Navbar height={"50px"}/>
                    <Box pos={"absolute"} top={"50px"} left={0}
                         w={"100vw"} h={"calc(100vh - 50px)"}>
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
                        </Switch>
                    </Box>
                </Router>

            </AuthContext.Provider>
        </ChakraProvider>
    );
}

export default App;
