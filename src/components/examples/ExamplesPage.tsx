import {Box, Link} from '@chakra-ui/react';
import React from 'react';
import {Link as RouterLink, Route, Switch, useRouteMatch} from "react-router-dom";
import Example from "./Example";
import {CreateImageInputNode} from "../node-module/nodes/ImageInputNode";
import {NodeFactory} from "../node-module/nodes/utils/NodeFactory";


interface ExamplesMainPageProps {

}

const ExamplesPage = (props: any) => {
    let {path, url} = useRouteMatch();
    let test = NodeFactory("Cap brightness").createNewNode(1, 1, 1);
    let testSave = NodeFactory("Cap brightness").createNodeSave(test);
    console.log(JSON.stringify(testSave));
    let testLoaded = NodeFactory("Cap brightness").loadNode(1, testSave);
    console.log(test);
    console.log(testLoaded);

    return (
        <Box position="absolute" top={0} left={0} width="inherit" height="inherit">

            <Box position="absolute" top={0} left={"0"} width="150px" height="inherit" bg="#008800">
                <Link as={RouterLink} to={`${url}`}>
                    /
                </Link>
                <br/>
                <Link as={RouterLink} to={`${url}/ex1`}>
                    ex1
                </Link>
            </Box>

            <Box position="absolute" top={0} left="150px" width="calc(100% - 150px);" height="inherit" bg="#666666">
                <Switch>
                    <Route exact path={`${path}/`}>
                        <Example nodeModels={[]} linkModels={[]} name="empty"
                                 description="short description but with a lot of sense"/>
                    </Route>

                    <Route exact path={`${path}/ex1`}>
                        <Example nodeModels={[CreateImageInputNode(1)]} linkModels={[]} name="ex1"
                                 description="long description with a lot of sens and probably not a lot of anything else becouse I'm writing very
                             much whatever only to test if this thin works correctly "/>
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
};

export default ExamplesPage;