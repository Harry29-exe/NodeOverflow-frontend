import {NodeSave} from "./node/NodeSave";
import LinkSave from "./LinkSave";

interface ProjectSave {
    viewProperties: any;
    nodes: NodeSave[];
    links: LinkSave[];
}

export default ProjectSave;