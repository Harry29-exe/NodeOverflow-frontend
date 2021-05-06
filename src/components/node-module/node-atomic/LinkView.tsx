import React, {useContext} from 'react';
import {LinkModel} from "../../../logic/node-editor/LinkModel";
import CanvasContext from "../../../logic/contexts/CanvasContext";
import {Box, useBoolean} from "@chakra-ui/react";

const LinkView = (props: { link: LinkModel, top: number, scale: number }) => {
    const [state, update] = useBoolean(false);
    props.link.update = update.toggle;

    const handleClick = (event: any) => {
        event.preventDefault();
    };

    const createSVGStyle = () => {
        return {
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            width: "5px",
            height: "5px",
            zIndex: 10,
            pointerEvents: "none"
        } as React.CSSProperties
    };

    const canvasContext = useContext(CanvasContext);

    let outputElem = document.getElementById(props.link.outputPortDomId);
    let inputElem = document.getElementById(props.link.inputPortDomId);

    if (!outputElem || !inputElem) {
        console.log("not elems")
        setTimeout(update.toggle, 10);
        return <div/>;
    }
    // console.log("elems")
    let outBox = outputElem.getBoundingClientRect();
    let inBox = inputElem.getBoundingClientRect();
    let sc = canvasContext.scale;
    let outputX = outBox.left;
    // (outBox.left - canvasContext.left - canvasContext.shiftLeft) / canvasContext.scale;
    let outputY = outBox.top - props.top;
    // (outBox.top - canvasContext.top - canvasContext.shiftTop) / canvasContext.scale;
    let inputX = inBox.left;
    // (inBox.left - canvasContext.left - canvasContext.shiftLeft) / canvasContext.scale;
    let inputY = (inBox.top - (50 + 43));
    // (inBox.top - canvasContext.top- canvasContext.shiftTop) / canvasContext.scale;

    return (
        <Box color={state ? '#fff' : '#ffe'}>
            <svg
                style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#334447" strokeWidth={`${6 * props.scale}px`} fill="transparent"/>
            </svg>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#586673" strokeWidth={`${4.5 * props.scale}px`} fill="transparent"/>
            </svg>
        </Box>
    );
}

export default LinkView;