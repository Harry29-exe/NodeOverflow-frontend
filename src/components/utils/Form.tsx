import React from 'react';
import {Alert, Box, BoxProps, Flex, FlexProps} from "@chakra-ui/react";
import {RequestResult} from "../../logic/utils/RequestResult";

type FromProps = FlexProps & {response?: RequestResult}

const Form = (props: FromProps) => {
    const {response, children, ...rest} = props;

    return (
        <Flex __css={rest}>

            <Alert>

            </Alert>
        </Flex>
    );
};

export default Form;