import {extendTheme} from "@chakra-ui/react";
import colors from "./Colors";
import Button from "./Button";
import {styles} from "./Styles";

export default extendTheme(
    {
        styles,
        config: {
            initialColorMode: "dark",
            useSystemColorMode: false,
        },
        colors,
        components: {
            Button,
        },
    });