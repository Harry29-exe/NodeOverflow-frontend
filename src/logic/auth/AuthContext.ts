import React from "react";

export interface Authentication {
    username: string;
    id: number;
}

export interface AuthChangeListener {
    (auth: Authentication | undefined): void;
}

export abstract class AbstractAuthContext<AuthObject extends Authentication> {
    protected _authInfo?: AuthObject;
    protected loginStateListeners: AuthChangeListener[] = [];

    abstract login(username: string, password: string, dontLogout: boolean): Promise<LoginStatus>;

    abstract logout(): void;

    public addListener(listener: AuthChangeListener) {
        this.loginStateListeners.push(listener);
    }

    public removeListener(listener: AuthChangeListener) {
        let listeners = this.loginStateListeners;
        let index = listeners.findIndex(l => Object.is(listener, l));
        if (index >= 0) {
            this.loginStateListeners = listeners.slice(0, index).concat(listeners.slice(index + 1));
        } else {
            console.log("no listener");
        }
    }

    protected callListeners() {
        this.loginStateListeners.forEach(l => l(this._authInfo));
    }

    get isLogged(): boolean {
        return !!this._authInfo;
    }

    get authInfo(): AuthObject | undefined {
        return this._authInfo;
    }
}

export enum LoginStatus {
    OK,
    BAD_CREDENTIALS,
    FAIL
}

export const AuthContext = React.createContext<AbstractAuthContext<any>>({} as AbstractAuthContext<any>);
