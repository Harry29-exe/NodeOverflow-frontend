import React, {useState} from 'react';
import SegmentProps from "../SegmentProps";
import {ImageSegment} from "../../../../logic/node-editor/segment/imp/ImageSegment";
import SegmentWrapper from "../SegmentWrapper";
import {Image as ChakraImage, Input, VStack} from "@chakra-ui/react";
import {ImageLikeData} from "../../../../logic/image-manipulation/structs/ImageLikeData";

const ImageSegmentView = (props: SegmentProps<ImageSegment>) => {
    const [imgSrc, setImgSrc] = useState<null | string>(null);

    const loadFile = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            let img = new Image();
            img.onload = () => {
                setImgSrc(img.src);
                let canvas = document.createElement("canvas");
                canvas.height = img.height;
                canvas.width = img.width;
                let ctx = canvas.getContext("2d");
                if (ctx !== null) {
                    ctx.drawImage(img, 0, 0);
                    props.model.value = new ImageLikeData(
                        ctx.getImageData(0, 0, img.width, img.height).data,
                        img.width, img.height);
                }
            }
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
        }
        reader.readAsDataURL(file);
    }

    const handleValueChange = (event: any) => {
        try {
            let file = event.target.files[0];
            loadFile(file);
        } catch (e) {
            setImgSrc(null);
        }
    }

    return (
        <SegmentWrapper storage={props.storage} model={props.model}>
            <VStack>
                <Input type={"file"} accept="image/*" onChange={handleValueChange}/>
                {imgSrc &&
                <ChakraImage src={imgSrc} maxH={'100px'} maxW={'100%'}/>
                }
            </VStack>
        </SegmentWrapper>
    );
};

export default ImageSegmentView;