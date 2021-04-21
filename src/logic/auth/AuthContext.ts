import React from "react";

export interface Authentication {
    username: string;
}

export class AuthState<AuthObject extends Authentication> {
    public readonly authInfo?: AuthObject;
    public updateAuth: (v?: AuthObject) => void;

    constructor(updateAuth: (v?: AuthObject) => void, authInfo?: AuthObject) {
        this.authInfo = authInfo;
        this.updateAuth = updateAuth;
    }
}

export abstract class AbstractAuthContext<AuthObject extends Authentication> {
    protected authState: AuthState<AuthObject>

    constructor(authState: AuthState<AuthObject>) {
        this.authState = authState;
    }

    abstract login(username: string, password: string, dontLogout: boolean): Promise<LoginStatus>;

    abstract logout(): void;

    get isLogged(): boolean {
        return !!this.authState.authInfo;
    }

    get authInfo(): AuthObject | undefined {
        return this.authState.authInfo;
    }
}

export enum LoginStatus {
    OK,
    BAD_CREDENTIALS,
    FAIL
}

export const AuthContext = React.createContext<AbstractAuthContext<any>>({} as AbstractAuthContext<any>);
