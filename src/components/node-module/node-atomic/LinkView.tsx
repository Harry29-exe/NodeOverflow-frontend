import React, {useState} from 'react';
import {LinkModel} from "../../../logic/node-editor/LinkModel";
import {Box, useBoolean} from "@chakra-ui/react";

const createSVGStyle = () => {
    return {
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "visible",
        width: "5px",
        height: "5px",
        // zIndex: 10,
        userSelect: "none"
    } as React.CSSProperties
};

const handleClick = (event: any) => {
    event.preventDefault();
};

const LinkView = (props: { link: LinkModel, top: number, scale: number }) => {
    const [state, update] = useBoolean(false);
    const [lastScale, updateScale] = useState({s: 0});
    props.link.update = update.toggle;

    if (lastScale.s !== props.scale) {
        lastScale.s = props.scale;
        setTimeout(update.toggle, 3);
        return <div/>;
    }

    let outputElem: any = null;
    let inputElem: any = null;
    outputElem = document.getElementById(props.link.outputPortDomId);
    inputElem = document.getElementById(props.link.inputPortDomId);

    if (!outputElem || !inputElem) {
        setTimeout(update.toggle, 10);
        return <div/>;
    }

    let outBox = outputElem.getBoundingClientRect();
    let inBox = inputElem.getBoundingClientRect();

    let outputX = outBox.left + outBox.width / 2;
    let outputY = outBox.top - props.top + outBox.height / 2;
    let inputX = inBox.left + outBox.width / 2;
    let inputY = inBox.top - props.top + outBox.height / 2;

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