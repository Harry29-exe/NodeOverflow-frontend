import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import CanvasContext from "../../../logic/contexts/CanvasContext";
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

const LinkTemporary = (props: { portDomId: string, mouseX: number, mouseY: number }) => {
    const canvasViewProps = useContext(CanvasContext);

    let outputElem = document.getElementById(props.portDomId);
    let canvasElem = document.getElementById(props.portDomId.split('n')[0] + 'c');
    console.log(props.portDomId.split('n')[0] + 'c');

    if (!outputElem || !canvasElem) {
        return <div/>;
    }

    let canvasBox = canvasElem.getBoundingClientRect();
    let outBox = outputElem.getBoundingClientRect();

    let sc = canvasViewProps.scale;
    let outputX = (outBox.left - canvasBox.left + outBox.width / 2) / sc;
    let outputY = (outBox.top - canvasBox.top + outBox.height / 2) / sc;
    let inputX = (props.mouseX - canvasBox.left) / sc;
    let inputY = (props.mouseY - canvasBox.top) / sc;

    return ReactDOM.createPortal(
        (
            <div style={{position: 'absolute', left: 0, top: 0, userSelect: 'none', pointerEvents: 'none'}}>
                <svg style={createSVGStyle()}>
                    <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                        // onMouseDown={handleClick} onClick={event => event.preventDefault()}
                          stroke={'#333'} strokeWidth={`${6}px`} fill="transparent"
                          stroke-linecap="round"/>
                </svg>
                <svg style={createSVGStyle()}>
                    <path d={`M ${outputX}
                                ${outputY}
                                
                                C ${(outputX + inputX) / 2} ${outputY} 
                                ${(outputX + inputX) / 2} ${inputY} 
                                
                                ${inputX} ${inputY}`}

                        // onMouseDown={handleClick} onClick={event => event.preventDefault()}
                          stroke={colors.other["100"]} strokeWidth={`${4.5}px`} fill="transparent"
                          stroke-linecap="round"/>
                </svg>
            </div>
        ), canvasElem);
}

export default LinkTemporary;