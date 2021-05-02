const Node = {
    parts: ["header", "background", "segmentWrapper"],
    baseStyle: {
        header: {
            pos: "absolute",
            left: "0",
            top: "0",
            userSelect: 'none',

            bg: "primary.400",
            color: "white",
            fontWeight: 400,
        },
        background: {
            pos: "absolute",
            left: "0",
            top: "0",
            overflow: "hidden",

            bg: "other.100",
            borderRadius: "2xl",
            opacity: 0.9,
            zIndex: -1,
            ml: '-1px',
            mt: '-1px',
            border: '2px solid',
            borderColor: '#3c454f',
        },
        segmentWrapper: {
            fontSize: "md",
            
        }
    }
}

export default Node;