import {AbstractAuthContext} from "../auth/AuthContext";
import {projectServerAddress} from "../addresses/ProjectServerAddress";


export const saveProjectRequest = async (authContext: AbstractAuthContext<any>, projectData: string) => {
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