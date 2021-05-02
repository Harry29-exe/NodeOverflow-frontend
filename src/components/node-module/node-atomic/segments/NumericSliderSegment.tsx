import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
import "./NumericSliderSegment.css";

import React from 'react';
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";

class NumericSliderSegmentProps extends SegmentProps<number> {
    public minValue: number;
    public maxValue: number;
    public precision: number;

    constructor(segment: SegmentModel<number>, storage: NodeStorage, currentScale: NodeCanvasViewProperties, minValue: number, maxValue: number, precision: number) {
        super(segment, storage, currentScale);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.precision = precision;
    }
}

class NumericSliderState {
    fillPercentage: number;
    focused: boolean;

    constructor(fillPercentage: number, focused: boolean) {
        this.fillPercentage = fillPercentage;
        this.focused = focused;
    }
}

export class NumericSliderSegment extends SegmentViewWrapper<number, NumericSliderSegmentProps, NumericSliderState> {
    constructor(props: NumericSliderSegmentProps) {
        super(props);
        this.state = new NumericSliderState(
            this.calculateFill(), false);
    }

    calculateFill = (): number => {
        return (this.props.segment.value - this.props.minValue) /
            (this.props.maxValue - this.props.minValue)
    }

    handleMouseDown = (e: any) => {
        let box = e.target.getBoundingClientRect();
        let x0 = e.clientX;
        let startX = e.clientX;
        let width = box.right - box.x;
        document.body.style.cursor = "none";

        const handleMove = (e: any) => {
            let newFill = this.state.fillPercentage + (e.clientX - startX) / width;
            newFill = newFill > 1 ? 1 : newFill < 0 ? 0 : newFill;
            let newValue = (this.props.maxValue - this.props.minValue) * newFill + this.props.minValue;
            this.props.segment.value = Math.floor(newValue * this.props.precision) / this.props.precision;
            startX = e.clientX > box.right ? box.right : e.clientX < box.x ? box.x : e.clientX;
            this.setState({fillPercentage: newFill});
        }

        const handleMouseUp = (e: any) => {
            if (e.clientX === x0) {
                this.setState({focused: true});
                window.addEventListener("mousedown", handleUnfocused);
            }
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        const handleUnfocused = (e: any) => {
            if (e.clientX < box.left || e.clientX > box.left + box.width ||
                e.clientY < box.top || e.clientY > box.top + box.height) {
                window.removeEventListener("mousedown", handleUnfocused);
                this.setState({focused: false});
            }
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    handleTouchDown = (e: any) => {
        let touch = e.touches[0];
        let box = e.target.getBoundingClientRect();
        console.log(box.top);
        let target = e.target;
        let x0 = touch.screenX;
        let startX = touch.screenX;
        let width = box.right - box.x;
        document.body.style.cursor = "none";

        const handleMove = (e: any) => {
            touch = e.touches[0];
            let newFill = this.state.fillPercentage + (touch.screenX - startX) / width;
            newFill = newFill > 1 ? 1 : newFill < 0 ? 0 : newFill;
            let newValue = (this.props.maxValue - this.props.minValue) * newFill + this.props.minValue;
            this.props.segment.value = Math.floor(newValue * this.props.precision) / this.props.precision;
            startX = touch.screenX > box.right ? box.right : touch.screenX < box.x ? box.x : touch.screenX;
            this.setState({fillPercentage: newFill});
        }

        const handleTouchEnd = (e: any) => {
            if (startX === x0) {
                this.setState({focused: true});
                window.addEventListener("touchstart", handleUnfocused);
            }
            document.body.style.cursor = "auto";
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleTouchEnd);
        }

        const handleUnfocused = (e: any) => {
            let classes = e.target.className.split(' ');
            if (!(classes[1] === "TemporaryNumberInput")) {
                window.removeEventListener("touchstart", handleUnfocused);
                this.setState({focused: false});
            }
        }

        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleTouchEnd);
    }

    handleChange = (e: any) => {
        console.log(e.target.value)
        this.props.segment.value = Number.parseFloat(e.target.value);
        this.setState({fillPercentage: this.calculateFill()})
    }

    createSliderStyle() {
        return {
            position: "absolute",
            marginTop: this.offsetTop,
            marginLeft: this.offsetLeft,
            top: this.topPosition,
            height: this.height,
            width: this.width,
            borderRadius: this.height / 2,

            backgroundColor: this.nodeStyle.segmentColor,
            overflow: "hidden",


            border: "1px solid " + this.nodeStyle.borderColor
        } as React.CSSProperties;
    }

    createInnerSliderStyle() {
        return {
            position: "absolute",
            top: 0,
            let: 0,
            margin: 0,
            backgroundColor: this.nodeStyle.headerColor,
            height: "100%",
            width: this.state.fillPercentage * 100 + "%",

            pointerEvents: "none"
        } as React.CSSProperties;
    }

    createInputStyle() {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            padding: 0,
            border: 0,
            paddingLeft: "6px",
            paddingRight: "6px",
            top: this.topPosition,
            marginTop: this.offsetTop,
            left: this.offsetLeft,
            height: this.height,
            width: this.width - 12,
            borderRadius: dim.segmentHeight / 2,
            backgroundColor: this.nodeStyle.segmentColor,

            fontFamily: this.nodeStyle.fontFamily,
            textAlign: "center",
            fontWeight: this.nodeStyle.labelsFontWeight,
            fontSize: this.segmentStyle.fontSizeToSegmentHeight * this.props.segment.parentDimensions.segmentHeight,
            color: this.nodeStyle.textColor
        } as React.CSSProperties;
    }

    render() {
        return (
            <div>
                {!this.state.focused ?
                    <div>
                        <div onMouseDown={this.handleMouseDown}
                             onTouchStart={this.handleTouchDown}
                             style={this.createSliderStyle()}>
                            <div style={this.createInnerSliderStyle()}/>
                        </div>
                        <div style={this.createInputLabelStyle()}>
                            {this.props.segment.label}
                        </div>
                        <div style={this.createOutputLabelStyle()}>
                            {this.props.segment.value}
                        </div>
                    </div>
                    :
                    <input className={"NumberSegment TemporaryNumberInput"}
                           onChange={this.handleChange} type={"number"}
                           style={this.createInputStyle()}
                           defaultValue={this.props.segment.value}
                    />
                }
                {this.createPort()}
            </div>
        );
    }
}

export class NumericSliderSegmentModel extends SegmentModel<number> {
    private minValue: number;
    private maxValue: number;
    private precision: number;

    constructor(label: string, value: number, portType: PortType, minValue: number, maxValue: number, decimalPlaces: number) {
        super(label, value, portType);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.precision = Math.pow(10, decimalPlaces);
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <NumericSliderSegment key={this._index} segment={this} storage={storage} currentScale={currentScale}
                                     maxValue={this.maxValue} minValue={this.minValue} precision={this.precision}/>;
    }

}

export default NumericSliderSegment;