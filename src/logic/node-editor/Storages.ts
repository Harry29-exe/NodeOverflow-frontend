import {NodeStorage} from "./NodeStorage";

export class Storages {
    private static _nextId: number = 0;
    private static storages: NodeStorage[] = [];

    public static get nextId(): number {
        return this._nextId++;
    }

    public static addStorage(storage: NodeStorage) {
        this.storages.push(storage);
    }

    public static removeStorage(storage: NodeStorage) {
        let index = this.storages.findIndex(s => s.storageId === storage.storageId);
        this.storages = this.storages.splice(index, 1);
    }
}

