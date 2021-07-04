import {ExampleModel} from "../Model/ExampleModel";
import {ExampleCategory} from "../Model/ExampleCategory";

export interface IExamplePageView {

    displayLoadingExample():void;

    displayExample(example: ExampleModel): void;

    displayLoadingNavbar(): void;

    displayNavbar(examplesCategories: ExampleCategory[]): void;
}