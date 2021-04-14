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
            border: "3px solid" + colors.primary["400"],
            bg: "transparent",
            _hover: {
                bg: colors.primary["400"] + "44",
            },
            _focus: {
                boxShadow: "none",
            },
            _active: {
                bg: colors.primary["400"] + "88",
            },
            transition: "background 0.3s 0s",
        }),
        primarySolid: (props: any) => ({
            border: "3px solid" + colors.primary["400"],
            bg: colors.primary["400"],
            _hover: {
                bg: colors.primary["500"],
            },
            _focus: {
                boxShadow: "none",
            },
            _active: {
                bg: colors.primary["600"],
            },
            transition: "background 0.3s 0s",
        }),
    },
}

export default Button;