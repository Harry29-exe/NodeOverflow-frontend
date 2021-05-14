import React, {useEffect, useState} from 'react';
import {LinkModel} from "../../../logic/node-editor/LinkModel";
import {Box} from "@chakra-ui/react";
import colors from "../../../theme/Colors";

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

class LinkState {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    sc: number;

    constructor(x1: number, x2: number, y1: number, y2: number, sc: number) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.sc = sc;
    }
}

//TODO Clean up
const LinkView = (props: { link: LinkModel, scale: number, canvasDomId: string }) => {
    const [shouldUpdate, update] = useState({shouldUpdate: true});
    const [cords, updateCords] = useState<LinkState>(new LinkState(0, 0, 0, 0, 1));
    useEffect(() => {
        props.link.setUpdate(() => update({shouldUpdate: true}));
        return () => props.link.setUpdate(null)
    })


    let outputElem = document.getElementById(props.link.outputPortDomId);
    let inputElem = document.getElementById(props.link.inputPortDomId);
    let canvasElem = document.getElementById(props.canvasDomId);

    if (!outputElem || !inputElem || !canvasElem) {
        // console.log('not rendered')
        setTimeout(() => update({shouldUpdate: true}), 10);
        return <div/>;
    }

    let outBox = outputElem.getBoundingClientRect();
    let inBox = inputElem.getBoundingClientRect();
    let canvasBox = canvasElem.getBoundingClientRect();


    if (shouldUpdate.shouldUpdate) {
        let sc = props.scale;
        cords.x1 = (outBox.left - canvasBox.left + outBox.width / 2) / sc;
        cords.y1 = (outBox.top - canvasBox.top + outBox.height / 2) / sc;
        cords.x2 = (inBox.left - canvasBox.left + outBox.width / 2) / sc;
        cords.y2 = (inBox.top - canvasBox.top + outBox.height / 2) / sc;
        shouldUpdate.shouldUpdate = false;
    } else {
        cords.sc = props.scale;
    }

    let outputX = cords.x1;
    let outputY = cords.y1;
    let inputX = cords.x2;
    let inputY = cords.y2;

    return (
        <Box color={shouldUpdate.shouldUpdate ? '#fff' : '#ffe'}>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke={'#333'} strokeWidth={`${6}px`} fill="transparent"/>
            </svg>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke={colors.other["100"]} strokeWidth={`${4.5}px`} fill="transparent"/>
            </svg>
        </Box>
    );
}

export default LinkView;