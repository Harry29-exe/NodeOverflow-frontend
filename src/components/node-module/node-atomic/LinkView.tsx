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


    let outputElem = document.getElementById(props.link.outputPortDomId);
    let inputElem = document.getElementById(props.link.inputPortDomId);
    let canvasElem = document.getElementById('s0c');

    if (!outputElem || !inputElem || !canvasElem) {
        setTimeout(update.toggle, 10);
        return <div/>;
    }

    let outBox = outputElem.getBoundingClientRect();
    let inBox = inputElem.getBoundingClientRect();
    let canvasBox = canvasElem.getBoundingClientRect();


    let sc = props.scale;
    let outputX = (outBox.left - canvasBox.left + outBox.width / 2) / sc;
    let outputY = (outBox.top - canvasBox.top + outBox.height / 2) / sc;
    let inputX = (inBox.left - canvasBox.left + outBox.width / 2) / sc;
    let inputY = (inBox.top - canvasBox.top + outBox.height / 2) / sc;

    return (
        <Box color={state ? '#fff' : '#ffe'}>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#334447" strokeWidth={`${6}px`} fill="transparent"/>
            </svg>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#586673" strokeWidth={`${4.5}px`} fill="transparent"/>
            </svg>
        </Box>
    );
}

export default LinkView;