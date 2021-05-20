import React, {useRef, useState} from 'react';
import SegmentProps from "../SegmentProps";
import {ImageSegment} from "../../../../logic/node-editor/segment/imp/ImageSegment";
import SegmentWrapper from "../SegmentWrapper";
import {Box, Image as ChakraImage, VStack} from "@chakra-ui/react";
import {ImageLikeData} from "../../../../logic/image-manipulation/structs/ImageLikeData";
import {AiOutlineFileImage} from "react-icons/all";

type ImageState = {
    imageSrc: string;
    fileName: string
} | null;

const ImageSegmentView = (props: SegmentProps<ImageSegment>) => {
    const [imageState, setImageState] = useState<ImageState>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const loadFile = (file: File) => {
        let reader = new FileReader();
        reader.onload = () => {
            let img = new Image();
            img.onload = () => {
                setImageState({imageSrc: img.src, fileName: file.name});
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
            setImageState(null);
        }
    }

    const fileInputHeight = '50px';
    return (
        <SegmentWrapper storage={props.storage} model={props.model}>
            <VStack maxW='100%'>
                <Box maxW='100%' w='100%' maxH={fileInputHeight} overflow='hidden' border={'1px solid'}
                     borderColor={'whiteAlpha.400'} borderRadius='md'
                     onClick={e => {
                         e.stopPropagation();
                         let input = inputRef.current;
                         if (input) {
                             input.click();
                         }
                     }} onMouseDown={e => e.stopPropagation()}>

                    <Box w='100%' p={'5px'} maxH={fileInputHeight} h={fileInputHeight} userSelect='none'
                         fontSize={'sm'} _hover={{cursor: 'pointer', bg: "whiteAlpha.200"}}
                         pos={'relative'} textOverflow={'ellipsis'} textAlign='center'>

                        {imageState ?
                            imageState.fileName
                            :
                            (<>
                                <AiOutlineFileImage style={{display: 'inline'}}/> Image not loaded
                            </>)
                        }

                    </Box>

                    <input ref={inputRef} style={{display: 'none'}} onChange={handleValueChange}
                           type="file" accept="image/*"/>

                </Box>

                {imageState &&
                <ChakraImage src={imageState.imageSrc} maxH={'100px'} maxW={'100%'} borderRadius='md'/>
                }
            </VStack>
        </SegmentWrapper>
    );
};

export default ImageSegmentView;