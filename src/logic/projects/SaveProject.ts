import {AbstractAuthContext} from "../auth/AuthContext";
import {projectServerAddress} from "../addresses/ProjectServerAddress";
import ProjectSave from "../node-editor/ProjectSave";


export const saveProjectRequest = async (authContext: AbstractAuthContext<any>, projectData: string): Promise<number> => {
    let body = {
        accessModifier: "PRIVATE",
        collaborators: [],
        projectData: projectData,
        tags: [
            "tag"
        ],
        title: "project"
    };
    let response = await fetch(projectServerAddress + "/api/project", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authContext.authInfo.token,
        },
    });

    return response.status;
}

export const overwriteProjectDataRequest = async (authContext: AbstractAuthContext<any>, projectId: number, projectSave: ProjectSave): Promise<number> => {
    let body = {
        projectId: projectId,
        projectData: JSON.stringify(projectSave)
    };
    let response = await fetch(projectServerAddress + "/api/project", {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authContext.authInfo.token,
        },
    });

    return response.status;
}

export const loadProjectRequest = async (authContext: AbstractAuthContext<any>, projectId: number): Promise<string> => {

    let response = await fetch(projectServerAddress + `/api/project?projectId=${projectId}&withDetails=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authContext.authInfo.token,
        },
    });

    let body = await response.text();
    console.log(body);
    return body;
}