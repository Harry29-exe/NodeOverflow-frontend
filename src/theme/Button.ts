import colors from "./Colors";

const Button = {
    baseStyle: {
        size: "md",
    },

    variants: {
        // 4. We can override existing variants
        solid: (props: any) => ({
            bg: props.colorMode === "dark" ? "primary.300" : "primary.500",
            // boxShadow: "0 0 3px 5px primary.600",
        }),
        primary: (props: any) => ({
            _focus: {boxShadow: "none"},
            border: "3px solid" + colors.primary["400"],
            bg: "transparent",
            _hover: {
                boxShadow: "0 0 3px 3px " + colors.primary["400"],
                bg: "rgba( 0, 0, 0, 0.2)",
            },
            transition: "box-shadow 0.3s 0s, background 0.3s 0s",
        }),
    },
}

export default Button;