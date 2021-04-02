import React, {Component} from 'react';

class LinkTemporary extends Component<{ x1: number, y1: number, x2: number, y2: number }> {

    render() {
        let outputX = this.props.x1;
        let outputY = this.props.y1;
        let inputX = this.props.x2;
        let inputY = this.props.y2;
        return (
            <div>
                <svg
                    style={{
                        position: "absolute", top: 0, left: 0, overflow: "visible"
                        , width: "100px", height: "100px", zIndex: -10
                    }}>
                    <path d={`M ${outputX}
                                ${outputY}
                                
                                C ${(outputX + inputX) / 2} ${outputY} 
                                ${(outputX + inputX) / 2} ${inputY} 
                                
                                ${inputX} ${inputY}`}
                          onClick={event => console.log("line cliked")}
                          stroke="#334447" strokeWidth="6px" fill="transparent"/>
                </svg>
                <svg
                    style={{
                        position: "absolute", top: 0, left: 0, overflow: "visible"
                        , width: "100px", height: "100px", zIndex: -10
                    }}>
                    <path d={`M ${outputX}
                            ${outputY}
                            
                            C ${(outputX + inputX) / 2} ${outputY} 
                            ${(outputX + inputX) / 2} ${inputY} 
                            
                            ${inputX} ${inputY}`}
                          onClick={event => console.log("line cliked")}
                          stroke="#586673" strokeWidth="4.5px" fill="transparent"/>
                </svg>
            </div>
        );
    }
}

export default LinkTemporary;