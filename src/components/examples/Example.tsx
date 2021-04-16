import React from 'react';
import {NodeModel} from "../node-module/node-atomic/NodeModel";
import {LinkModel} from "../node-module/node-atomic/Link";
import {Box, Flex, Heading, Text, VStack} from '@chakra-ui/react';
import NodeModule from "../node-module/NodeModule";
import {mainColors} from "../../App";

export interface ExampleProps {
    name: string,
    description: string,
    nodeModels: NodeModel[],
    linkModels: LinkModel[]
}

const Example = (props: ExampleProps) => {
    return (
        <VStack width="100%" height="100%">
            <Flex width="80%" h="16.5%" justify="center" align="center" direction="column" overflow="auto">
                <Heading as="h2" size="xl">{props.name}</Heading>
                <Text fontSize="md">{props.description}</Text>
            </Flex>
            <Flex w="85%" h="80%" justify="center" align="center" direction="column" borderRadius="50px">
                <Box margin="20px" w="calc(100% - 40px)" h="calc(100% - 40px)" borderRadius="50px"
                     overflow="hidden" boxShadow={"0 0 2px 4px " + mainColors.borderColor}
                     bg={mainColors.backgroundColor}>
                    <NodeModule disableControlPanel={true} nodes={props.nodeModels} links={props.linkModels}
                                key={props.name}/>
                </Box>
            </Flex>
            <Box width="80%" h="3.5%"/>
        </VStack>
    );
};


export default Example;