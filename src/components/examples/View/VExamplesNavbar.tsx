import React, {useState} from 'react';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    VStack
} from "@chakra-ui/react";
import {ExampleCategory} from "../Model/ExampleCategory";
import ExampleIdentifier from "../Model/ExampleIdentifier";

const VExamplesNavbar = (props: {examples: ExampleCategory[], activeExample: ExampleIdentifier, onExampleChange: (nextExample: ExampleIdentifier) => any}) => {

    return (
        <Accordion w='100%' h='100%' allowMultiple>
            {props.examples.map(exampleCategory =>
                <AccordionItem>
                    <AccordionButton>
                        {exampleCategory.name}
                        <AccordionIcon/>
                    </AccordionButton>

                    <AccordionPanel>
                        <VStack>
                            {exampleCategory.sections.map(exampleName =>
                                <Button variant={'secondary'} w='100%'  textDecor={'underline'}
                                        color={props.activeExample.equal({name: exampleName, category: exampleCategory.name} as ExampleIdentifier)? 'primary.200': 'white'}
                                        minH='60px' onClick={() => props.onExampleChange(new ExampleIdentifier(exampleName, exampleCategory.name))}
                                >
                                    {exampleName}
                                </Button>
                            )}
                        </VStack>
                    </AccordionPanel>

                </AccordionItem>
            )}
        </Accordion>
    );
};

export default VExamplesNavbar;