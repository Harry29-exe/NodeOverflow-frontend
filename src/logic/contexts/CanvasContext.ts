import {NodeCanvasViewProperties} from "../../components/node-module/NodeCanvasViewProperties";
import React from "react";

const CanvasContext = React.createContext<NodeCanvasViewProperties>(
    new NodeCanvasViewProperties(0, 0, 0)
);

export default CanvasContext;