interface ProjectDetails {
    id: number;
    collaborators?: Collaborator[];
    metadata: {
        accessModifier: "PRIVATE" | "PUBLIC" | "PROTECTED";
        creationDate: string;
        lastModified: string;
        tags: string[];
        title: string;
    }
}

interface Collaborator {
    canWrite: boolean;
    canFork: boolean;
    collaboratorId: number;
    collaboratorUsername: string;
}

export default ProjectDetails;