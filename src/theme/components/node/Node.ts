const Node = {
    parts: ["header", "background", "segmentWrapper"],
    baseStyle: {
        header: {
            userSelect: 'none',
            borderRadius: 'xl',
            draggable: false,

            bg: "primary.400",
            color: "#fff",
            fontWeight: 400,
        },
        background: {
            bg: "other.100",
            borderRadius: "xl",
            opacity: 0.9,
            zIndex: -1,
            // border: '2px solid',
            // borderColor: '#3c454f',
        },
        segmentWrapper: {
            fontSize: "md",
            
        }
    }
}

export default Node;