import React from 'react';
import {Button, HTMLChakraProps} from "@chakra-ui/react";

export interface BaseButtonProps extends HTMLChakraProps<"button"> {

}

const BaseButton = (props: BaseButtonProps) => {
    let height = props.h? props.h: props.height? props.height: '50px'
    return (
        <Button>

        </Button>
    );
};

export default BaseButton;