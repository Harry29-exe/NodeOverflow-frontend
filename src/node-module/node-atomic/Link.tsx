import React, {Component} from 'react';
import {PortType, SegmentModel} from "./Segment";

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
        let outputX = this.props.link.outputSegment.calcPortLeftOffsetToCenter();
        let outputY = this.props.link.outputSegment.calcPortTopOffsetToCenter();
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

export class LinkModel {
    private _outputSegment: SegmentModel<any>;
    private _inputSegment: SegmentModel<any>;

    constructor(outputSegment: SegmentModel<any>, inputSegment: SegmentModel<any>) {
        if (outputSegment.portType === PortType.OUTPUT &&
            inputSegment.portType === PortType.INPUT) {
            this._outputSegment = outputSegment;
            this._inputSegment = inputSegment;
        } else {
            throw new Error("Invalid port's types");
        }
    }

    equals(link: LinkModel): boolean {
        return this._outputSegment.index === link.outputSegment.index &&
            this._outputSegment.parent.id === link.outputSegment.parent.id &&
            this._inputSegment.index === link.inputSegment.index &&
            this._inputSegment.parent.id === link.inputSegment.parent.id;
    }

    get outputSegment(): SegmentModel<any> {
        return this._outputSegment;
    }

    get inputSegment(): SegmentModel<any> {
        return this._inputSegment;
    }
}

export default Link;