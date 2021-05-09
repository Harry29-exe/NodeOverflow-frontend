import {extendTheme} from "@chakra-ui/react";
import colors from "./Colors";
import Input from "./Input";
import Button from "./components/default/Button";
import Menu from "./components/default/Menu";
import Node from "./components/node/Node";
import Segment from "./components/node/Segment";
import {styles} from "./Styles";
import {breakpoints} from "./Breakpoints";

export default extendTheme(
    {
        styles,
        breakpoints,
        config: {
            initialColorMode: "dark",
            useSystemColorMode: false,
        },
        colors,
        components: {
            Button,
            Menu,
            Input,
            // FormControl,
            Node,
            Segment,
        },
    });