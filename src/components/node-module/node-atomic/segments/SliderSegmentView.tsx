import {Box, Flex, NumberInput, NumberInputField} from '@chakra-ui/react';
import React, {useState} from 'react';
import SegmentWrapper from "../SegmentWrapper";
import SegmentProps from "../SegmentProps";
import {SliderSegment} from "../../../../logic/node-editor/segment/imp/SliderSegment";

type SliderState = 'slider' | 'input'


const SliderSegmentView = (props: SegmentProps<SliderSegment>) => {
    let model = props.model;
    const calcFill = () => Math.abs((model.value - model.minValue) * 100 / (model.maxValue - model.minValue));
    const [fillPercentage, setFill] = useState<number>();
    const [state, setState] = useState<SliderState>('slider');

    const eventListener = new SliderSegmentEventListener(model, setState, setFill);

    return (
        <SegmentWrapper model={props.model} storage={props.storage} >

            <Box w={'100%'} h={`${model.parent.dimensions.segmentHeight}px`}
                 border={'1px solid'} borderColor={"gray.700"}
                 overflow='hidden' borderRadius='md'
                 onClick={e => e.stopPropagation()}
                 onMouseDown={(e:any) => {
                     e.stopPropagation();
                     eventListener.onMouseDown(e);
                 }}
                 onTouchStart={(e:any) => {
                     e.stopPropagation();
                     eventListener.onTouchDown(e);
                 }}>

                {state !== 'input'?
                    <>
                        <Box w={`${fillPercentage}%`} h={"100%"} bg={"primary.400"} pos={'relative'}/>
                        <Flex justifyContent='flex-start' alignItems='center' w='100%' h='100%' pos='relative' top='-100%' p='3px'>
                            {model.label}
                        </Flex>
                        <Flex justifyContent='flex-end' alignItems='center' w='100%' h='100%' pos='relative' top='-200%' p='3px'>
                            {model.value}
                        </Flex>
                    </>
                    :
                    <NumberInput maxH='100%' h='100%' defaultValue={model.value}
                                 min={model.minValue} max={model.maxValue}
                                 onChange={e => {
                                     model.value = parseInt(e);
                                     setFill(calcFill());}}>

                        <NumberInputField maxH='100%' h='100%'/>

                    </NumberInput>
                }

            </Box>

        </SegmentWrapper>
    );
};

class SliderSegmentEventListener {
    private setState: (state: SliderState) => void;
    private setFill: (val: number) => void;
    private model: SliderSegment;

    constructor(model: SliderSegment, setState: (state: SliderState) => void, setFill: (val: number) => void) {
        this.setState = setState;
        this.setFill = setFill;
        this.model = model;
    }

    public onMouseDown = (e: any) => {
        let box = e.target.getBoundingClientRect();
        let x0 = e.clientX;
        let fillPercentage = this.calcFillPercentage();
        let startX = e.clientX;
        let width = box.right - box.x;
        document.body.style.cursor = "none";

        const handleMove = (e: any) => {
            let newFill = fillPercentage + 100*(e.clientX - startX) / width;
            newFill = newFill > 100 ? 100 : newFill < 0 ? 0 : newFill;
            let newValue = (this.model.maxValue - this.model.minValue) * (newFill/100) + this.model.minValue;
            this.model.value = Math.floor(newValue * this.model.precision) / this.model.precision;
            startX = e.clientX > box.right ? box.right : e.clientX < box.x ? box.x : e.clientX;
            fillPercentage = newFill;
            this.setFill(newFill);
        }

        const handleMouseUp = (e: any) => {
            if (e.clientX === x0) {
                this.setState('input');
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
                this.setState('slider');
            }
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    public onTouchDown = (e: any) => {
        let touch = e.touches[0];
        let box = e.target.getBoundingClientRect();
        let fillPercentage = this.calcFillPercentage();

        let x0 = touch.screenX;
        let startX = touch.screenX;
        let width = box.right - box.x;
        document.body.style.cursor = "none";

        const handleMove = (e: any) => {
            touch = e.touches[0];
            let newFill = fillPercentage + 100 * (touch.screenX - startX) / width;
            newFill = newFill > 100 ? 100 : newFill < 0 ? 0 : newFill;
            let newValue = (this.model.maxValue - this.model.minValue) * (newFill/100) + this.model.minValue;
            this.model.value = Math.floor(newValue * this.model.precision) / this.model.precision;
            startX = touch.screenX > box.right ? box.right : touch.screenX < box.x ? box.x : touch.screenX;
            fillPercentage = newFill;
            this.setFill(newFill);
        }

        const handleTouchEnd = (e: any) => {
            if (startX === x0) {
                this.setState('input');
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
                this.setState('slider');
            }
        }

        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleTouchEnd);
    }

    private calcFillPercentage = (): number => {
        return Math.abs((this.model.value - this.model.minValue) * 100 / (this.model.maxValue - this.model.minValue))
    }
}

export default SliderSegmentView;