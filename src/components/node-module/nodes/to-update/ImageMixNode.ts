import {NodeValueFunction} from "../../node-atomic/NodeValueFunction";
import {OutputSegmentModel} from "../../node-atomic/segments/OutputSegment";
import {InputSegmentModel} from "../../node-atomic/segments/InputSegment";
import {PortType} from "../../node-atomic/Segment";
import {NumericSliderSegmentModel} from "../../node-atomic/segments/NumericSliderSegment";
import {NodeDimension, NodeModel} from "../../../../logic/node-editor/NodeModel";


export const CreateImageMixNode = (id: number, x?: number, y?: number): NodeModel => {
    let node = new NodeModel(id, "Image mix", x ? x : 0, y ? y : 0,
        new NodeDimension(200, 20, 26, 20),
        new MixNodeVFun())
    node.addSegment(new OutputSegmentModel("image"));
    // node.addSegment(new OptionSegmentModel("Fit type", "center", ["center", "fit", "stretch", "tile"]));
    node.addSegment(new NumericSliderSegmentModel("Mask/Mix factor", 0.5, PortType.INPUT, 0, 1, 2));
    node.addSegment(new InputSegmentModel("primary image"));
    node.addSegment(new InputSegmentModel("secondary image"));
    return node;
}

export class MixNodeVFun implements NodeValueFunction<ImageData> {
    private maskCanvas: HTMLCanvasElement | null = null;
    private temp1Canvas: HTMLCanvasElement | null = null;
    private temp2Canvas: HTMLCanvasElement | null = null;
    private outputCanvas: HTMLCanvasElement | null = null;


    getNodeValue(node: NodeModel, segmentIndex: number): Promise<ImageData> {
        return new Promise<ImageData>((resolve, reject) => {
            console.log("mix");
            Promise.all([this.getImage(node, 2), this.getImage(node, 3), this.getMixValue(node)])
                .then(value => {
                    if (!(value[0] instanceof ImageData && value[1] instanceof ImageData &&
                        (value[2] instanceof ImageData || typeof value[2] === "number"))) {
                        console.log("mix reject");
                        reject("Given inputs are incorrect");
                    }
                    if (value[2] instanceof ImageData) {
                        console.log("resoving");
                        resolve(this.createCenterMaskOutput(value[0], value[1], value[2]));
                    } else {
                        console.log("resoving");
                        resolve(this.createCenterMixFactorOutput(value[0], value[1], value[2]));
                    }
                }, reason => {
                    reject(reason);
                })
        });
    }

    createCenterMaskOutput(img1: ImageData, img2: ImageData, mask: ImageData): ImageData {
        let maxW = Math.max(img1.width, img2.width);
        let maxH = Math.max(img1.height, img2.height);
        this.initCanvas(maxW, maxH);
        if (this.maskCanvas === null || this.temp1Canvas == null || this.temp2Canvas === null || this.outputCanvas === null) {
            throw new Error();
        }
        let maskCtx = this.maskCanvas.getContext("2d") as CanvasRenderingContext2D;
        let outputCtx = this.outputCanvas.getContext("2d") as CanvasRenderingContext2D;
        let temp1Ctx = this.temp1Canvas.getContext("2d") as CanvasRenderingContext2D;


        // temp1Ctx.putImageData(mask,0,0, 0,0,maxW, maxH);
        // maskCtx.drawImage(this.temp1Canvas,0,0,mask.width,mask.height,0,0,maxW,maxH);
        maskCtx.putImageData(mask, (maxW - mask.width) / 2, (maxH - mask.height) / 2, 0, 0, mask.width, mask.height);

        temp1Ctx.putImageData(img1, (maxW - img1.width) / 2, (maxH - img1.height) / 2, 0, 0, img1.width, img1.height);
        outputCtx.drawImage(this.maskCanvas, 0, 0);
        outputCtx.globalCompositeOperation = "source-in";
        outputCtx.drawImage(this.temp1Canvas, 0, 0);

        temp1Ctx.clearRect(0, 0, this.temp1Canvas.width, this.temp1Canvas.height);
        temp1Ctx.putImageData(img2, (maxW - img2.width) / 2, (maxH - img2.height) / 2, 0, 0, img2.width, img2.height);
        maskCtx.globalCompositeOperation = "source-out";
        maskCtx.drawImage(this.temp1Canvas, 0, 0);

        outputCtx.globalCompositeOperation = "source-over";
        outputCtx.drawImage(this.maskCanvas, 0, 0);

        return outputCtx.getImageData(0, 0, this.outputCanvas.width, this.outputCanvas.height);
    }

    createCenterMixFactorOutput(img1: ImageData, img2: ImageData, mixFactor: number): ImageData {
        let maxW = Math.max(img1.width, img2.width);
        let maxH = Math.max(img1.height, img2.height);
        let offsetLeft1 = (maxW - img1.width) / 2;
        let offsetLeft2 = (maxW - img2.width) / 2;
        let offsetTop1 = (maxH - img1.height) / 2;
        let offsetTop2 = (maxH - img2.height) / 2;

        let time = Date.now();
        let outputCanvas = document.createElement("canvas") as HTMLCanvasElement;
        outputCanvas.height = maxH;
        outputCanvas.width = maxW;
        let outputCtx = outputCanvas.getContext("2d") as CanvasRenderingContext2D;

        let tempCanvas = document.createElement("canvas") as HTMLCanvasElement;
        tempCanvas.width = img1.width;
        tempCanvas.height = img1.height;
        let tempCtx = tempCanvas.getContext("2d") as CanvasRenderingContext2D;
        tempCtx.putImageData(img1, 0, 0);
        outputCtx.drawImage(tempCanvas, 0, 0, img1.width, img1.height, offsetLeft1, offsetTop1, img1.width, img1.height);

        outputCtx.globalAlpha = mixFactor;
        tempCanvas.width = img2.width;
        tempCanvas.height = img2.height;
        tempCtx.putImageData(img2, 0, 0);
        outputCtx.drawImage(tempCanvas, 0, 0, img2.width, img2.height, offsetLeft2, offsetTop2, img2.width, img2.height);
        console.log("Mix image time: " + (Date.now() - time));

        return outputCtx.getImageData(0, 0, maxW, maxH);
    }

    getImage(node: NodeModel, fromSegmentIndex: number): Promise<ImageData> {
        try {
            let imgSource = node.getSegmentLinks(fromSegmentIndex)[0].outputSegment;
            return imgSource.parent.getNodeValue(imgSource.index);
        } catch (e: any) {
            return Promise.reject();
        }
    }

    getMixValue(node: NodeModel): Promise<ImageData | number> {
        try {
            if (node.getSegmentLinks(1).length > 0) {
                let mixSource = node.getSegmentLinks(1)[0].outputSegment;
                return mixSource.parent.getNodeValue(mixSource.index);
            } else {
                return Promise.resolve(node.segments[1].value);
            }
        } catch (e: any) {
            return Promise.reject();
        }
    }

    initCanvas(width: number, height: number) {
        this.maskCanvas = document.createElement("canvas") as HTMLCanvasElement;
        this.maskCanvas.width = width;
        this.maskCanvas.height = height;
        this.temp1Canvas = document.createElement("canvas") as HTMLCanvasElement;
        this.temp1Canvas.width = width;
        this.temp1Canvas.height = height;
        this.temp2Canvas = document.createElement("canvas") as HTMLCanvasElement;
        this.temp2Canvas.width = width;
        this.temp2Canvas.height = height;
        this.outputCanvas = document.createElement("canvas") as HTMLCanvasElement;
        this.outputCanvas.width = width;
        this.outputCanvas.height = height;
    }
}
