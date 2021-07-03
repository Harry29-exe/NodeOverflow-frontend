import React, {useState} from 'react';
import {Box, Button, Center, HStack, Switch, VStack} from "@chakra-ui/react";
import NodeModule from "../node-module/NodeModule";
import {DefaultProjectStorage} from "../../logic/node-editor/node-management/DefaultProjectStorage";
import {NodeModel} from "../../logic/node-editor/node/NodeModel";
import {LinkModel} from "../../logic/node-editor/LinkModel";
import file from "../../resources/Introduction.example.json";

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

const examples: ExampleLink[] = [
    {name: "Introduction", path: ""},
    {name: "First steps", path: ""},
    {name: "Introduction", path: ""},
    {name: "First steps", path: ""},
    {name: "Introduction", path: ""},
    {name: "First steps", path: ""},
    {name: "Introduction", path: ""},
    {name: "First steps", path: ""},
    {name: "Introduction", path: ""},
    {name: "First steps", path: ""},
]

const ExamplesPage = () => {
    const [currentExample, setCurrentExample] = useState<ExampleLink>(examples[0]);
    const [loadedExample, setLoadedExample] = useState();

    const changeExample = (example: ExampleLink) => {

    }

    const storage = new DefaultProjectStorage();
    storage.load( JSON.parse(file.project_data), 0);

    return (
        <HStack w={'100%'} h='100%' spacing={0}>

            <VStack w={'200px'} h='100%' bg={'gray.700'} zIndex={100} borderRight={'2px solid'} borderColor={'primary.400'} overflowY={'auto'} pt={2}>
                {examples.map(
                    ex => <Button variant={'secondary'} w='100%' color={ex.name === currentExample.name? 'primary.200': 'white'} textDecor={'underline'}
                                  minH='60px' onClick={() => changeExample(ex)}>{ex.name}</Button>
                )}
            </VStack>



            <Center w='calc(100% - 200px)' h='100%' pos='relative'>
                <VStack w='100%' h='95%'>
                    <Box fontSize={'lg'}></Box>
                    <Box fontSize={'md'}></Box>

                    <Box w='90%' flexGrow={5} overflow='hidden' borderRadius={'2xl'} border={'2px solid'} borderColor={'primary.400'}>
                        <NodeModule storage={storage}/>
                    </Box>
                </VStack>
            </Center>
        </HStack>
    );
};

export default ExamplesPage;
//
// import {Box, Link} from '@chakra-ui/react';
// import React from 'react';
// import {Link as RouterLink, Route, Switch, useRouteMatch} from "react-router-dom";
// import Example from "./Example";
// import {CreateImageInputNode} from "../node-module/nodes/ImageInputNode";
// import {NodeFactory} from "../node-module/nodes/utils/NodeFactory";
//
//
// interface ExamplesMainPageProps {
//
// }
//
// const ExamplesPage = (props: any) => {
//     let {path, url} = useRouteMatch();
//     let test = NodeFactory("Cap brightness").createNewNode(1, 1, 1);
//     let testSave = NodeFactory("Cap brightness").createNodeSave(test);
//     console.log(JSON.stringify(testSave));
//     let testLoaded = NodeFactory("Cap brightness").loadNode(1, testSave);
//     console.log(test);
//     console.log(testLoaded);
//
//     return (
//         <Box position="absolute" top={0} left={0} width="100%" height="100%">
//
//             <Box position="absolute" top={0} left={"0"} width="150px" height="inherit" bg="#008800">
//                 <Link as={RouterLink} to={`${url}`}>
//                     /
//                 </Link>
//                 <br/>
//                 <Link as={RouterLink} to={`${url}/ex1`}>
//                     ex1
//                 </Link>
//             </Box>
//
//             <Box position="absolute" top={0} left="150px" width="calc(100% - 150px);" height="inherit" bg="#666666">
//                 <Switch>
//                     <Route exact path={`${path}/`}>
//                         <Example nodeModels={[]} linkModels={[]} name="empty"
//                                  description="short description but with a lot of sense"/>
//                     </Route>
//
//                     <Route exact path={`${path}/ex1`}>
//                         <Example nodeModels={[CreateImageInputNode(1)]} linkModels={[]} name="ex1"
//                                  description="long description with a lot of sens and probably not a lot of anything else becouse I'm writing very
//                              much whatever only to test if this thin works correctly "/>
//                     </Route>
//                 </Switch>
//             </Box>
//         </Box>
//     );
// };
//
// export default ExamplesPage;