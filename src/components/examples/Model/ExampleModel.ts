import ProjectSave from "../../../logic/node-editor/ProjectSave";
import {IExampleIdentifier} from "./ExampleIdentifier";

export class ExampleModel implements IExampleIdentifier {
    public name: string;
    public category: string;
    public description: string;
    public project: ProjectSave;

    constructor(name: string, category: string, description: string, project: ProjectSave) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.project = project;
    }

    equal(exampleId: IExampleIdentifier): boolean {
        return this.name === exampleId.name && this.category === exampleId.category;
    }
}