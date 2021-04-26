import React, {Component} from 'react';
import {NodeModel} from "../../logic/node-editor/NodeModel";

class Props {
    nodes: NodeModel[];

    constructor(nodes: NodeModel[]) {
        this.nodes = nodes;
    }
}

class RenderWindow extends Component<Props, { lastUpdate: number }> {
    private ref = React.createRef<HTMLCanvasElement>();


    constructor(props: Props) {
        super(props);
        this.state = {lastUpdate: 0};
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<any>, snapshot?: any) {
        if (Date.now() - this.state.lastUpdate > 1000) {
            let outputNode: NodeModel | null = null;
            let nodes = this.props.nodes;
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].name === "Output") {
                    outputNode = nodes[i];
                    break;
                }
            }
            this.setState({lastUpdate: Date.now()});
            if (outputNode !== null) {
                this.paintOutput(outputNode);
            }
        }
    }

    paintOutput(outputNode: NodeModel) {
        try {
            outputNode.getNodeValue(0).then(
                value => this.paintCanvas(value),
                reason => console.log("something went wrong")
            );
        } catch (e: any) {
            console.log(e);
        }
    }

    paintCanvas = (imageData: ImageData) => {
        if (this.ref.current) {
            let temp = document.createElement("canvas") as HTMLCanvasElement;
            temp.width = imageData.width;
            temp.height = imageData.height;
            let tempCTX = temp.getContext("2d") as CanvasRenderingContext2D;
            tempCTX.putImageData(imageData, 0, 0);

            let canvas = this.ref.current;
            let maxW = (this.ref.current.closest("div") as HTMLDivElement).clientWidth;
            let maxH = (this.ref.current.closest("div") as HTMLDivElement).clientHeight;
            let width: number;
            let height: number;
            if ((maxW / imageData.width) * imageData.height < maxH) {
                width = maxW;
                height = (maxW / imageData.width) * imageData.height;
            } else {
                height = maxH;
                width = (maxH / imageData.height) * imageData.width;
            }
            canvas.width = maxW;
            canvas.height = maxH;
            let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(temp, 0, 0, imageData.width, imageData.height,
                (maxW - width) / 2, (maxH - height) / 2, width, height);

        } else {
            throw new Error("Output node has to be connected to node returning image");
        }

        this.setState({lastUpdate: Date.now()});
    }

    render() {
        return (
            <canvas ref={this.ref}/>

        );
    }
}

export default RenderWindow;