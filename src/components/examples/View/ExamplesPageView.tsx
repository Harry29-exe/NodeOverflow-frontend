import React, {useState} from 'react';
import {Box, Button, Center, HStack, Skeleton, Switch, useBoolean, VStack} from "@chakra-ui/react";
import NodeModule from "../../node-module/NodeModule";
import {DefaultProjectStorage} from "../../../logic/node-editor/node-management/DefaultProjectStorage";
import {NodeModel} from "../../../logic/node-editor/node/NodeModel";
import {LinkModel} from "../../../logic/node-editor/LinkModel";
import VExamplesNavbar from "./VExamplesNavbar";
import {ExamplePagePresenter} from "../Presenter/ExamplePagePresenter";
import {IExamplePageView} from "./IExamplePageView";
import {ExampleModel} from "../Model/ExampleModel";
import {ExampleCategory} from "../Model/ExampleCategory";
import ExampleIdentifier from "../Model/ExampleIdentifier";

export interface ExampleLink {
    name: string,
    path: string
}

export interface ExampleProps {
    name: string,
    description: string,
    nodeModels: NodeModel[],
    linkModels: LinkModel[]
}

const ExamplesPageView = () => {
    const [activeExample, setActiveExample] = useState<ExampleModel | null>(null);
    const [exampleList, setExamplesList] = useState<ExampleCategory[]>([]);


    const presenter = new ExamplePagePresenter({
        displayExample(example: ExampleModel) {
            setActiveExample(example);
        },
        displayLoadingExample() {
            setActiveExample(null);
        },
        displayLoadingNavbar() {
            setExamplesList([]);
        },
        displayNavbar(examplesCategories: ExampleCategory[]) {
            setExamplesList(examplesCategories);
        }
    });

    const changeExample = (example: string) => {

    }

    const storage = new DefaultProjectStorage();
    // storage.load( JSON.parse(file.project_data), 0);

    return (
        <HStack w={'100%'} h='100%' spacing={0}>
            <Box w={'200px'} h='100%' bg={'gray.700'} zIndex={100} borderRight={'2px solid'}
                 borderColor={'primary.400'} overflowY={'auto'} pt={2}
            >
                {exampleList.length > 0?
                    <VExamplesNavbar examples={exampleList}
                                     onExampleChange={nextExample => presenter.changeExample(nextExample)}
                                     activeExample={activeExample? activeExample:
                                         new ExampleIdentifier(exampleList[0].sections[0], exampleList[0].name)}/>
                    :
                    <VStack mx='5%' w='90%'>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                        <Skeleton height="50px" w='100%' startColor={"gray.400"} endColor={"gray.700"}/>
                    </VStack>
                }
            </Box>



            <Center w='calc(100% - 200px)' h='100%' pos='relative'>
                {activeExample?
                    <VStack w='90%' h='95%'>
                        <VStack w="100%" border={"2px solid"} borderColor={"primary.400"} borderRadius={'2xl'} p={4}>
                            <Box fontSize={'lg'}>{activeExample.name}</Box>
                            <Box fontSize={'md'}>{activeExample.description}</Box>
                        </VStack>

                        <Box w='100%' flexGrow={5} overflow='hidden' borderRadius={'2xl'} border={'2px solid'}
                             borderColor={'primary.400'}>
                            <NodeModule storage={storage}/>
                        </Box>
                    </VStack>
                    :
                    <Skeleton w='100%' h='100%'/>
                }
            </Center>
        </HStack>
    );
};

export default ExamplesPageView;