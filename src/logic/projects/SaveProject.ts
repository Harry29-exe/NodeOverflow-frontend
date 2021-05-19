import {AbstractAuthContext} from "../auth/AuthContext";
import {projectServerAddress} from "../addresses/ProjectServerAddress";
import ProjectSave from "../node-editor/ProjectSave";


export const saveProjectRequest = async (authContext: AbstractAuthContext<any>, title: string, accessModifier: string, tags?: string[], projectData?: string): Promise<number> => {
    let body = {
        accessModifier: accessModifier,
        collaborators: [],
        projectData: projectData,
        tags: tags ? tags : [],
        title: title
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