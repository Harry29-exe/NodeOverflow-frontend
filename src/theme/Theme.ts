import {extendTheme} from "@chakra-ui/react";
import colors from "./Colors";
import Button from "./Button";

const styles = {
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
};

const theme = {
    styles,
    colors,

    components: {
        Button,
    },
};

export default extendTheme(theme);