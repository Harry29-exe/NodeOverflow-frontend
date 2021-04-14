import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools"
import colors from "./Colors";
import Button from "./Button";

const styles = {
    global: (props: any) => ({
        "html, body": {
            bg: "#54606d",
            fontFamily: "Ubuntu",
            fontWeight: 300,
            color: mode("black", "white")(props),
        },
        "*, *::before, &after": {
            boxSizing: "content-box"
        }
    }),
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = {
    styles,
    colors,

    components: {
        Button,
    },
};

export default extendTheme(theme);