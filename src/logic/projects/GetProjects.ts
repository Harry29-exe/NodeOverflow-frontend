import {AbstractAuthContext} from "../auth/AuthContext";
import ProjectDetails from "./ProjectDetails";
import {projectServerAddress} from "../addresses/ProjectServerAddress";

export class ProjectsFilters {
    searchPhrase: string;
    createBefore?: Date;
    createdAfter?: Date;
    modifiedAfter?: Date;
    modifiedBefore?: Date;

    constructor(searchPhrase: string, createBefore?: Date, createdAfter?: Date, modifiedAfter?: Date, modifiedBefore?: Date) {
        this.searchPhrase = searchPhrase;
        this.createBefore = createBefore;
        this.createdAfter = createdAfter;
        this.modifiedAfter = modifiedAfter;
        this.modifiedBefore = modifiedBefore;
    }
}

export class ProjectList {
    private _projectDetails: ProjectDetails[];
    private _listStart: number;
    private _allResults: number;

    constructor(projectDetails: ProjectDetails[], listStart: number, allResults: number) {
        this._projectDetails = projectDetails;
        this._listStart = listStart;
        this._allResults = allResults;
    }

    get projectDetails(): ProjectDetails[] {
        return this._projectDetails;
    }

    get listStart(): number {
        return this._listStart;
    }

    get allResults(): number {
        return this._allResults;
    }
}

export const getProjects = async (authContext: AbstractAuthContext<any>, resultPerPage: number, page: number, filters?: ProjectsFilters) => {
    if (filters) {
        return getFilteredProjects(authContext, resultPerPage, page, filters);
    } else {
        return getProjectsWithoutFilters(authContext, resultPerPage, page);
    }
}

const getProjectsWithoutFilters = async (authContext: AbstractAuthContext<any>, resultPerPage: number, page: number): Promise<ProjectList> => {
    let response = await fetch(`${projectServerAddress}/api/projects/details?resultsPerPage=${resultPerPage}&page=${page - 1}`, {
        method: 'GET',
        headers: {
            'Authorization': authContext.authInfo.token,
        }
    });

    let bodyString = await response.text();
    return JSON.parse(bodyString);
}

const getFilteredProjects = async (authContext: AbstractAuthContext<any>, resultPerPage: number, page: number, filters: ProjectsFilters): Promise<ProjectList> => {
    if (!authContext.isLogged) {
        return Promise.reject("User is not logged");
    }
    console.log(filters);
    const body = JSON.stringify(filters);
    const response = await fetch(`${projectServerAddress}/api/projects/details?resultsPerPage=${resultPerPage}&page=${page - 1}`, {
        method: "POST",
        headers: {
            'Authorization': authContext.authInfo.token,
            'Content-type': 'application/json'
        },
        body: body
    });
    const responseBody = await response.text();

    return JSON.parse(responseBody);
}