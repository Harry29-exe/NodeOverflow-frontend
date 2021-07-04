import {ExampleCategory} from "../Model/ExampleCategory";
import {ExampleModel} from "../Model/ExampleModel";
import ExampleIdentifier from "../Model/ExampleIdentifier";

export interface IExamplePagePresenter {

    changeExample(exampleId: ExampleIdentifier): void;


}