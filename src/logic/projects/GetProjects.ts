import {AbstractAuthContext} from "../auth/AuthContext";
import ProjectDetails from "./ProjectDetails";
import {projectServerAddress} from "../addresses/ProjectServerAddress";

export const getProjects = async (authContext: AbstractAuthContext<any>): Promise<ProjectDetails[]> => {
    let response = await fetch(projectServerAddress + '/api/projects/details', {
        method: 'GET',
        headers: {
            'Authorization': authContext.authInfo.token,
        }
    });

    let bodyString = await response.text();
    let body = JSON.parse(bodyString);
    return body.projects as ProjectDetails[];
}