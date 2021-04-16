import {mode} from "@chakra-ui/theme-tools";

export const styles = {
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
};