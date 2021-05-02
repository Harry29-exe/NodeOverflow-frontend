import React, {Component} from 'react';
import {LinkModel} from "../../../logic/node-editor/LinkModel";

class Link extends Component<{ link: LinkModel }> {

    handleClick = (event: any) => {
        event.preventDefault();
    }

    createSVGStyle() {
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
    }

    render() {
        let outputSegment = this.props.link.outputSegment;
        let inputSegment = this.props.link.inputSegment;
        // @ts-ignore
        if (!outputSegment.ref.current || !inputSegment.ref.current) {
            throw new Error();
        }
        let outputX =
            let
        outputY = this.props.link.outputSegment.calcPortTopOffsetToCenter();
        let inputX = this.props.link.inputSegment.calcPortLeftOffsetToCenter();
        let inputY = this.props.link.inputSegment.calcPortTopOffsetToCenter();
        return (
            <div style={{width: 0, height: 0}}>
                <svg
                    style={this.createSVGStyle()}>
                    <path d={`M ${outputX}
                                ${outputY}
                                
                                C ${(outputX + inputX) / 2} ${outputY} 
                                ${(outputX + inputX) / 2} ${inputY} 
                                
                                ${inputX} ${inputY}`}

                          onMouseDown={this.handleClick} onClick={event => event.preventDefault()}
                          stroke="#334447" strokeWidth="6px" fill="transparent"/>
                </svg>
                <svg style={this.createSVGStyle()}>
                    <path d={`M ${outputX}
                                ${outputY}
                                
                                C ${(outputX + inputX) / 2} ${outputY} 
                                ${(outputX + inputX) / 2} ${inputY} 
                                
                                ${inputX} ${inputY}`}

                          onMouseDown={this.handleClick} onClick={event => event.preventDefault()}
                          stroke="#586673" strokeWidth="4.5px" fill="transparent"/>
                </svg>
            </div>
        );
    }
}

export default Link;