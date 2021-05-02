import React from 'react';
import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
import "./ImageSegment.css"
import {NodeStorage} from "../../NodeStorage";
import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
import {FileToLoad} from "../../nodes/utils/FileToLoad";
import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";

export class ImageSegmentState {
    public file: File | null = null;
    public imgSrc: string | null = null;
}

export class ImageSegment extends SegmentViewWrapper<ImageData | null, SegmentProps<ImageData | null>, ImageSegmentState> {
    constructor(props: SegmentProps<ImageData | null>) {
        super(props);
        this.state = new ImageSegmentState();
        let segment = this.props.segment;

        if (segment instanceof ImageSegmentModel && segment.file !== null) {
            this.setState({file: segment.file});
            this.loadFile(segment.file);
        }
    }

    loadFile = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            let img = new Image();
            img.onload = () => {
                this.setState({imgSrc: img.src});
                let canvas = document.createElement("canvas");
                canvas.height = img.height;
                canvas.width = img.width;
                let ctx = canvas.getContext("2d");
                if (ctx !== null) {
                    ctx.drawImage(img, 0, 0);
                    this.props.segment.value = ctx.getImageData(0, 0, img.width, img.height);
                }
            }
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
        }
        reader.readAsDataURL(file);
    }

    handleValueChange = (event: any) => {
        try {
            let file = event.target.files[0];
            let segment = this.props.segment;
            if (segment instanceof ImageSegmentModel) {
                segment.fileToLoad = new FileToLoad(file.name, file.size, file.type);
                segment.file = file;
            }
            console.log(file);
            this.loadFile(file);
        } catch (e) {
            this.setState({imgSrc: null});
        }
        this.setState({file: event.target.files[0]});
    }

    createInputStyle() {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            top: this.topPosition,
            paddingRight: "6px",
            width: dim.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft) - 6,
            height: dim.segmentHeight * (1 - 2 * this.segmentStyle.percentageOffsetTop),
            marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,
            marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,

            color: "#fff",
            fontWeight: 400,
            fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight,
            userSelect: "none"
        } as React.CSSProperties;
    }

    createLabelStyle() {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            top: this.topPosition,
            width: dim.width * (1 - 2 * this.segmentStyle.percentageOffsetLeft) - 6,
            height: dim.segmentHeight * (1 - this.segmentStyle.percentageOffsetTop),
            paddingLeft: "6px",
            borderRadius: dim.segmentHeight / 2,
            backgroundColor: "#3c454f",
            marginLeft: dim.width * this.segmentStyle.percentageOffsetLeft,
            marginTop: dim.segmentHeight * this.segmentStyle.percentageOffsetTop,
            overflow: "hidden",

            textAlign: "left",
            whiteSpace: "nowrap",
            color: "#fff",
            fontWeight: 300,
            fontSize: dim.segmentHeight * this.segmentStyle.fontSizeToSegmentHeight
        } as React.CSSProperties
    }

    createCanvasStyle() {
        let dim = this.props.segment.parentDimensions;
        return {
            position: "absolute",
            top: this.topPosition + dim.segmentHeight,
            marginTop: this.offsetTop,
            height: dim.segmentHeight * 2 * (1 - this.segmentStyle.percentageOffsetTop),
            width: this.width
        } as React.CSSProperties;
    }

    render() {
        let dim = this.props.segment.parentDimensions;
        return (
            <div>
                <input onChange={this.handleValueChange} className={"fileInput"} type="file" accept="image/*"
                       style={this.createInputStyle()}/>
                <label className={"fileLabel"} style={this.createLabelStyle()}>
                    🖿 {(this.state.file === null || this.state.file === undefined) ?
                    this.props.segment.label : this.state.file.name}
                </label>

                {this.createPort()}

                {this.state.imgSrc !== null ?
                    <div style={{
                        position: "absolute",
                        top: this.topPosition + dim.segmentHeight + this.offsetTop,
                        left: this.offsetLeft,
                        width: this.width,
                        height: dim.segmentHeight * (4 - 2 * this.segmentStyle.percentageOffsetTop),
                        pointerEvents: "none",
                        borderRadius: this.height / 2
                    }}>
                        <img style={{
                            margin: "2px",
                            maxWidth: this.width - 4,
                            maxHeight: dim.segmentHeight * (4 - 2 * this.segmentStyle.percentageOffsetTop) - 4,
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "auto",
                            marginBottom: "auto",
                            borderRadius: this.height / 2
                        }} src={this.state.imgSrc}/>
                    </div>
                    :
                    <div/>
                }
            </div>
        );
    }
}

export class ImageSegmentModel extends SegmentModel<ImageData | null> {
    private _fileToLoad: FileToLoad = new FileToLoad("", 0, "");

    constructor(label: string, value: ImageData | null, portType: PortType) {
        super(label, value, portType, 5);
    }

    createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
        return <ImageSegment currentScale={currentScale} storage={storage} segment={this} key={this.index}/>;
    }


    get fileToLoad(): FileToLoad {
        return this._fileToLoad;
    }

    set fileToLoad(value: FileToLoad) {
        this._fileToLoad = value;
    }

    get file(): File | null {
        return this._fileToLoad.file;
    }

    set file(value: File | null) {
        this._fileToLoad.file = value;
    }
}