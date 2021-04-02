export class FileToLoad {
    public readonly fileName: string;
    public readonly fileSize: number;
    public readonly type: string;
    public file: File | null = null;

    constructor(fileName: string, fileSize: number, type: string) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.type = type;
    }
}