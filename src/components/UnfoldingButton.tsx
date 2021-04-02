import React, {Component} from "react";
import {mainColors} from "../App";
import "./UnfoldingButton.css";
import {ButtonContent, ButtonOnClick} from "./Button";

export class UnfoldingButtonProps {
    label: string;
    subButtonsContent: ButtonContent[];
    unfocusedOnClick: boolean;
    height?: number;

    constructor(label: string, subButtonsContent: ButtonContent[], unfocusOnClick: boolean, height: number) {
        this.label = label;
        this.subButtonsContent = subButtonsContent;
        this.unfocusedOnClick = unfocusOnClick;
        this.height = height;
    }
}

export class UnfoldingButton extends Component<UnfoldingButtonProps, { hover: boolean }> {
    private ref = React.createRef<HTMLDivElement>();

    constructor(props: UnfoldingButtonProps) {
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

    calcDivWith() {
        if (this.ref.current) {
            let div = this.ref.current;
            console.log(div.clientWidth);
            return div.clientWidth;
        } else {
            return 100;
        }
    }

    render() {
        let key = 0;
        return (
            <div ref={this.ref} onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave} onClick={() => this.setState({hover: false})}
                 style={{
                     position: "relative", height: this.props.height ? this.props.height : "100%",
                     marginTop: "auto", marginBottom: "auto",
                     paddingLeft: "10px", paddingRight: "10px",
                     backgroundColor: "inherit",
                     color: this.state.hover ? mainColors.headerColor : mainColors.color,

                     display: "flex", justifyContent: "center", alignItems: "center"
                 }}>

                <span>
                    {this.props.label}
                </span>

                {this.state.hover ?
                    <li className={"scroll"} style={{
                        position: "absolute", paddingTop: "5%", top: "100%", left: 0,
                        maxHeight: "600%",
                        overflow: "auto",
                        minWidth: this.calcDivWith(),
                        listStyle: "none", zIndex: 10000,
                        backgroundColor: "inherit",
                        borderBottomLeftRadius: "10px",
                        borderBottomRightRadius: "10px"
                    }}>
                        {this.props.subButtonsContent.map(
                            sc => (<ListItem content={sc.label} clickEvent={sc.onClick} key={key++}/>)
                        )}
                    </li> :
                    <div/>}
            </div>
        );
    }
}

class ListItem extends Component<{ content: string, clickEvent: ButtonOnClick }, { hover: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {hover: false};
    }

    handleMouseEnter = () => {
        this.setState({hover: true});
    }

    handleMouseLeave = () => {
        this.setState({hover: false});
    }

    render() {
        return (
            <ul onClick={this.props.clickEvent} onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{
                    width: "100%", padding: 0, textAlign: "center", marginBottom: "10px", marginTop: 0,
                    color: this.state.hover ? mainColors.headerColor : mainColors.color
                }}>
                <div style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginBottom: "inherit",
                    borderTop: "2px dotted " + mainColors.headerColor
                }}/>
                {this.props.content}

            </ul>
        );
    }
}

export default UnfoldingButton;