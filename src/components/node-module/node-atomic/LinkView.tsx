import React, {useContext} from 'react';
import {LinkModel} from "../../../logic/node-editor/LinkModel";
import CanvasContext from "../../../logic/contexts/CanvasContext";

const LinkView = (props: { link: LinkModel }) => {

    const handleClick = (event: any) => {
        event.preventDefault();
    };

    const createSVGStyle = () => {
        return {
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible",
            width: "100px",
            height: "100px",
            zIndex: -10,
            pointerEvents: "none"
        } as React.CSSProperties
    };

    const canvasContext = useContext(CanvasContext);

    let outputSegment = props.link.outputSegment;
    let inputSegment = props.link.inputSegment;
    //
    // if (!outputSegment.outputRef.current || !inputSegment.inputRef.current) {
    //     throw new Error();
    // }

    // let outputBox = outputSegment.outputRef.current.getBoundingClientRect();
    // let inputBox = inputSegment.inputRef.current.getBoundingClientRect();
    // let outputX = outputBox.left;
    // let outputY = outputBox.top;
    // let inputX = inputBox.left;
    // let inputY = inputBox.top;
    let outputX = 0;
    let outputY = 0;
    let inputX = 0;
    let inputY = 0;

    return (
        <div style={{width: 0, height: 0}}>
            <svg
                style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#334447" strokeWidth="6px" fill="transparent"/>
            </svg>
            <svg style={createSVGStyle()}>
                <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}

                      onMouseDown={handleClick} onClick={event => event.preventDefault()}
                      stroke="#586673" strokeWidth="4.5px" fill="transparent"/>
            </svg>
        </div>
    );
}

export default LinkView;