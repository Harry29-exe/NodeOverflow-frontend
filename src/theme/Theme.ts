import {extendTheme} from "@chakra-ui/react";
import colors from "./Colors";

const styles =
    // extendTheme(
    {
    // styles: {
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
    // }
}
// )
;

const theme = {
    styles,
    colors
};

export default extendTheme(theme);