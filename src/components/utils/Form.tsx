import React from 'react';
import {Alert, Box, BoxProps, Flex, FlexProps} from "@chakra-ui/react";
import {FormattedResponse} from "../../logic/utils/FormattedResponse";

type FromProps = FlexProps & {response?: FormattedResponse}

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