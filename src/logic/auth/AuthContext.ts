import React from "react";

export interface AuthInfo {
    username: string;
}

export class LoggedState {
    public isLogged: boolean;
    public setIsLogged: (v: boolean) => void;

    constructor(isLogged: boolean, setIsLogged: (v: boolean) => void) {
        this.isLogged = isLogged;
        this.setIsLogged = setIsLogged;
    }
}

export abstract class AbstractAuthContext<Info extends AuthInfo> {
    protected _authInfo: Info | null;
    private _isLogged: boolean;
    private _setIsLogged: (v: boolean) => void;

    constructor(loggedState: LoggedState, userObject?: Info) {
        this._authInfo = userObject ? userObject : null;
        this._isLogged = loggedState.isLogged;
        this._setIsLogged = loggedState.setIsLogged;
    }

    abstract login(username: string, password: string, dontLogout: boolean): Promise<LoginStatus>;

    abstract logout(): void;

    protected setIsLogged(isLogged: boolean) {
        this._isLogged = isLogged;
        this._setIsLogged(isLogged);
    }

    get isLogged(): boolean {
        return this._isLogged;
    }

    get authInfo(): Info | null {
        return this._authInfo;
    }
}

export enum LoginStatus {
    OK,
    BAD_CREDENTIALS,
    FAIL
}

export const AuthContext = React.createContext<AbstractAuthContext<any>>({} as AbstractAuthContext<any>);
