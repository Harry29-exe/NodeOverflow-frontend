import React, {Component} from "react";
import {mainColors} from "../App";

export interface ButtonOnClick {
    (event: any): void;
}

export class ButtonContent {
    public label: string;
    public onClick: ButtonOnClick;

    constructor(label: string, onClick: ButtonOnClick) {
        this.label = label;
        this.onClick = onClick;
    }
}

export class Button extends Component<{ label: string, onClick: ButtonOnClick, height?: number }, { hover: boolean }> {
    constructor(props: { label: string, onClick: ButtonOnClick, height?: number },) {
        super(props);
        this.state = {hover: false};
    }

    handleMouseEnter = () => {
        this.setState({hover: true});
        document.body.style.cursor = "pointer";
    }

    handleMouseLeave = () => {
        this.setState({hover: false});
        document.body.style.cursor = "auto";
    }

    render() {
        return (
            <div onClick={this.props.onClick}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 style={{
                     position: "relative", height: this.props.height ? this.props.height : "80%",
                     marginTop: "auto", marginBottom: "auto",
                     paddingLeft: "10px", paddingRight: "10px",
                     backgroundColor: "inherit",
                     color: this.state.hover ? mainColors.headerColor : mainColors.color,

                     display: "flex", justifyContent: "center", alignItems: "center"
                 }}>
                <span>
                {this.props.label}
                </span>
            </div>
        );
    }
}