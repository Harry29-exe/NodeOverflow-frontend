import {ExampleModel} from "../Model/ExampleModel";
import {exampleServerAddress} from "../../../logic/addresses/ExamplesServerAddress";
import {ExampleCategory} from "../Model/ExampleCategory";
import {IExamplePagePresenter} from "./IExamplePagePresenter";
import ExampleIdentifier from "../Model/ExampleIdentifier";
import {IExamplePageView} from "../View/IExamplePageView";


export class ExamplePagePresenter implements IExamplePagePresenter {
    private readonly examplePageView: IExamplePageView;
    private categories: ExampleCategory[] = [];
    private currentExample: string = "";
    private currentExampleModel: ExampleModel = {} as ExampleModel;

    constructor(examplePageView: IExamplePageView) {
        console.log("constructor");
        this.examplePageView = examplePageView;

        fetch(exampleServerAddress + '/examples/info')
            .then(value => value.json())
            .then(categories => {
                this.categories = categories;
                examplePageView.displayNavbar(categories);
                this.fetchExample("we")
                    .then(model => this.examplePageView.displayExample(model));
            });
    }

    public static changeExample(exampleId: ExampleIdentifier): void {

    }

    private async fetchExample(examplePath: string): Promise<ExampleModel> {
        return await fetch(exampleServerAddress +"/example/"+ examplePath)
            .then(
                response => response.json(),
                reason => Promise.reject(reason))
            .then(model => new ExampleModel(model.name, model.category, model.description, model.project))
    }

    changeExample(exampleId: ExampleIdentifier): void {
    }
}