import React from 'react';
import './App.css';
import NodeModule from "./node-module/NodeModule";
import Navbar from "./components/navbar/Navbar";
import {CreateImageInputNode} from "./node-module/nodes/ImageInputNode";
import {CreateOutputNode} from "./node-module/nodes/OutputNode";
import {NodeModel} from "./node-module/node-atomic/NodeModel";
import {CreateClampImageNode} from "./node-module/nodes/CapBrightnessNode";
import {CreateContrastNode} from "./node-module/nodes/ContrastNode";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import ExamplesPage from "./pages/ExamplesPage";
import MainPage from "./pages/MainPage";

export const PressedKeys: { keys: string[] } = {
    keys: []
}

export const Icons = {
    image: '\uF1C5',
    maximize: '\uE800',
    minimize: '\uE801',
    arrowDown: '\uE802',
    arrowUp: '\uE805',
    arrowLeft: '\uE803',
    arrowRight: '\uE804',
    doAgain: '\uE806',
    loading: '\uE807'

}

export const mainColors = {
    backgroundColor: "#54606d",
    headerColor: "#299b91",
    borderColor: "#334447",
    segmentColor: "#3c454f",
    color: "#f7f7f7",
}

const testNodes: NodeModel[] = [
    CreateImageInputNode(1, -360, -60),
    CreateOutputNode(2, 220, 80),
    CreateClampImageNode(3, 0, 0),
    CreateContrastNode(4, 100, 0)
]

const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                bg: "#54606d",
                fontFamily: "Ubuntu",
                fontWeight: 300
            },
            "*, *::before, &after": {
                boxSizing: "content-box"
            }
        }
    }
})

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
        <ChakraProvider theme={theme}>
            <Router>
                <div style={{
                    position: "absolute", top: 0, height: "7vh",
                    width: "100vw", margin: 0, padding: 0
                }}>
                    <Navbar/>
                </div>

                <Switch>
                    <Route exact path={"/"}>
                        <MainPage/>
                    </Route>

                    <Route path={"/editor"}>
                        <div style={{
                            position: "absolute", margin: 0, marginTop: "7vh", height: "93vh",
                            width: "100vw", padding: 0
                        }}>
                            <NodeModule nodes={testNodes}/>
                        </div>
                    </Route>

                    <Route path={"/examples"}>
                        <div style={{
                            position: "absolute", margin: 0, marginTop: "7vh", height: "93vh",
                            width: "100vw", padding: 0
                        }}>
                            <ExamplesPage/>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
