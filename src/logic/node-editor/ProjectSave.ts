import {NodeSave} from "./node/NodeSave";
import LinkSave from "./LinkSave";
import {ProjectViewProperties} from "./node-management/ProjectViewProperties";

interface ProjectSave {
    viewProperties: ProjectViewProperties;
    nodes: NodeSave[];
    links: LinkSave[];
}

export default ProjectSave;