export interface IExampleIdentifier {
    name: string,
    category: string,
    equal: (exampleId: IExampleIdentifier) => boolean
}

class ExampleIdentifier implements IExampleIdentifier {
    public readonly name: string;
    public readonly category: string;

    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
    }

    equal(exampleId: ExampleIdentifier): boolean {
        return this.name === exampleId.name && this.category === exampleId.category;
    }
}

export default ExampleIdentifier;