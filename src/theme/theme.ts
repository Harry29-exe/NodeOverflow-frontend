import {extendTheme} from "@chakra-ui/react";
import colors from "./Colors";
import Button from "./Button";
import Menu from "./Menu";
import Input from "./Input";
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
        },
    });