import {JwtAuthContext} from "./JwtToken";
import React from "react";

export interface AuthInfo {
    username: string;
}

export interface AuthContext<UserObject extends AuthInfo> {
    isUserLogged(): boolean;

    login(username: string, password: string, dontLogout: boolean): Promise<LoginStatus>;

    tryResumeLastSessions(): boolean;

    logout(): void;

    authInfo: UserObject | null;
}

export enum LoginStatus {
    OK,
    BAD_CREDENTIALS,
    FAIL
}

export const AuthContext = React.createContext<AuthContext<any>>(new JwtAuthContext());
