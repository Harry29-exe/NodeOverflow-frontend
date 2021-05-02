import React from 'react';
import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
import "./NumberSegment.css"
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";

export class NumberSegmentProps extends SegmentProps<number> {
    public step: number;

    constructor(segment: SegmentModel<number>, storage: NodeStorage, currentScale: NodeCanvasViewProperties, step: number) {
        super(segment, storage, currentScale);
        this.step = step ? step : 1;
    }
}

export class NumberSegment extends SegmentViewWrapper<number, NumberSegmentProps, any> {
    private numberInputRef = React.createRef<HTMLInputElement>();

    constructor(props: NumberSegmentProps) {
        super(props);
        // this.state = props.segment.value;
    }

    handleChange = (event: any) => {
        this.props.segment.value = Number.parseFloat(event.target.value);
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

    createSpanStyle(isLeft: boolean) {
        return {
            position: "absolute",
            top: this.topPosition,
            marginTop: this.offsetTop,
            marginLeft: this.offsetLeft + this.width * (isLeft ? 0.03 : 0.87),
            width: this.width * 0.1,
            height: this.height,
            display: "flex",
            alignItems: "center",
            justifyContent: isLeft ? "flex-end" : "flex-start",
            userSelect: "none",

            fontWeight: this.nodeStyle.labelsFontWeight,
            color: this.nodeStyle.headerColor,
            cursor: "pointer"
        } as React.CSSProperties;
    }

    handleIncrease = (event: any) => {
        this.props.segment.value += this.props.step;
        if (this.numberInputRef.current) {
            this.numberInputRef.current.value = (Math.floor(this.props.segment.value * 100) / 100).toString();
        }
        this.render();
    }

    handleDecrease = (event: any) => {
        this.props.segment.value -= this.props.step;
        if (this.numberInputRef.current) {
            this.numberInputRef.current.value = (Math.floor(this.props.segment.value * 100) / 100).toString();
        }
        this.render();
    }

    render() {
        return (
            <div className={"NumberSegment"}>

                <input ref={this.numberInputRef} onChange={this.handleChange} type={"number"}
                       style={this.createInputStyle()}
                       defaultValue={this.props.segment.value}/>

                <div style={this.createSpanStyle(true)} onClick={this.handleDecrease}>
                    ⮜
                </div>
                <div style={this.createSpanStyle(false)} onClick={this.handleIncrease}>
                    ⮞
                </div>

                {this.createPort()}
            </div>
        );
    }
}

export class NumberSegmentModel extends SegmentModel<number> {
    private step: number;

    constructor(label: string, value: number, portType: PortType, step?: number) {
        super(label, value, portType);
        this.step = step ? step : 1;
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <NumberSegment key={this.index} segment={this} storage={storage} currentScale={currentScale}
                              step={this.step}/>;
    }

}

export default NumberSegment;