import {NodeStorage} from "./NodeStorage";

export class Storages {
    private static _nextId: number = 0;
    private static storages: NodeStorage[] = [];

    public static get nextId(): number {
        let id = this._nextId;
        this._nextId = this._nextId + 1;
        return id;
    }

    public static addStorage(storage: NodeStorage) {
        this.storages.push(storage);
    }

    public static removeStorage(storage: NodeStorage) {
        let index = this.storages.findIndex(s => s.storageId === storage.storageId);
        this.storages = this.storages.splice(index, 1);
    }
}

