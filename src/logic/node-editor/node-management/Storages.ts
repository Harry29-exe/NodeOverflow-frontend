import {ProjectStorage} from "./ProjectStorage";

export class Storages {
    private static _nextId: number = 0;
    private static storages: ProjectStorage[] = [];

    public static get nextId(): number {
        let id = this._nextId;
        this._nextId = this._nextId + 1;
        return id;
    }

    public static addStorage(storage: ProjectStorage) {
        this.storages.push(storage);
    }

    public static removeStorage(storage: ProjectStorage) {
        let index = this.storages.findIndex(s => s.storageId === storage.storageId);
        this.storages = this.storages.splice(index, 1);
    }
}

