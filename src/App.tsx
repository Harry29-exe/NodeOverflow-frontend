import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import ExamplesPage from "./components/examples/ExamplesPage";
import MainPage from "./components/main-page/MainPage";
import Theme from "./theme/Theme";
import EditorPage from "./components/node-module/EditorPage";

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
            <Router>
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
            </Router>
        </ChakraProvider>
    );
}

export default App;
