import {NodeStorage} from "../NodeStorage";
import {NodeModel} from "../node/NodeModel";
import {UniqueDomId} from "../UniqueDomId";

export abstract class SegmentModel<InputType> implements UniqueDomId {
    protected abstract _label: string;
    protected readonly _index: number;
    protected readonly _parent: NodeModel;
    protected readonly _hasInputPort: boolean;
    protected readonly _hasOutputPort: boolean;
    private readonly _domId: string;
    private readonly _changeValueListener?: (newValue: InputType) => void;
    protected _value: InputType;

    constructor(index: number, parent: NodeModel, value: InputType,
                hasInputPort: boolean, hasOutputPort: boolean,
                changeValueListener?: (newValue: InputType) => void
    ) {
        this._domId = `${parent.domId}s${index}`
        this._parent = parent;
        this._index = index;
        this._value = value;

        this._hasInputPort = hasInputPort;
        this._hasOutputPort = hasOutputPort;

        if (changeValueListener) {
            this._changeValueListener = changeValueListener;
        }
    }

    abstract createView(storage: NodeStorage): JSX.Element;

    set value(value: InputType) {
        this._value = value;
        if (this._changeValueListener) {
            this._changeValueListener(value);
        }
    }

    get domId(): string {
        return this._domId;
    }

    get changeValueListener(): ((newValue: InputType) => void) | undefined {
        return this._changeValueListener;
    }

    get value(): InputType {
        return this._value;
    }

    get parent(): NodeModel {
        return this._parent
    }

    get hasInputPort(): boolean {
        return this._hasInputPort;
    }

    get hasOutputPort(): boolean {
        return this._hasOutputPort;
    }

    get index(): number {
        return this._index;
    }

    get label(): string {
        return this._label;
    }
}