export interface AuthInfo {
    username: string;
}

export interface AuthContextObject<UserObject extends AuthInfo> {
    isUserLogged(): boolean;

    login(username: string, password: string): void;

    logout(): void;

    user: UserObject | null;
}

// export const AuthContext = React.createContext<AuthContextObject>();
