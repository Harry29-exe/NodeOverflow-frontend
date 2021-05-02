import {parseJwt} from "./AuthUtils";
import {AbstractAuthContext, Authentication, AuthState, LoginStatus} from "./AuthContext";
import {authServerAddress} from "../addresses/AuthServerAddress";

//TODO it's only temporary implementation
export class JwtAuthContext extends AbstractAuthContext<JwtToken> {
    private tokenRefreshActive: boolean = false;

    constructor(authState: AuthState<JwtToken>) {
        super(authState);
        if (!!authState.authInfo) {
            this.tokenRefreshActive = true;
            document.cookie = `jwt=${authState.authInfo.token}`;

        } else {
            try {
                let cookies = document.cookie.split(';')
                let jwtCookie = (cookies.filter(c => c.startsWith('jwt')))[0].split('=')[1];
                let jwt = new JwtToken(jwtCookie);
                if (jwt.timeBeforeExpire > 60 * 1000) {
                    this.authState.updateAuth(jwt);
                }
            } catch (e: any) {

            }
        }
    }

    async login(username: string, password: string, dontLogout: boolean = false): Promise<LoginStatus> {
        let response = await fetch(authServerAddress + "/api/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            });

        try {
            this.handleServerResponse(response);
        } catch (e: any) {
            return LoginStatus.FAIL;
        }

        return LoginStatus.OK;
    }

    logout(): void {
        document.cookie = "jwt= ;"
        let cookies = document.cookie.split(";");
        cookies.filter(c => c.startsWith("jwt")).forEach(
            c => document.cookie = "jwt= ;"
        );

        this.authState.updateAuth(undefined);
    }

    private handleServerResponse(response: Response) {
        let token = response.headers.get("Authorization");
        if (typeof token === "string") {
            try {
                this.authState.updateAuth(new JwtToken(token));
                this.tokenRefreshActive = false;
            } catch (e: any) {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }

    private refreshToken() {
        if (!this.tokenRefreshActive) {
            return;
        }

    }
}

export class JwtToken implements Authentication {
    private _token: string;
    private _payload: any;


    constructor(token: string) {
        this._token = token;
        this._payload = parseJwt(token);
    }

    get id(): number {
        return this._payload.id;
    }

    get timeBeforeExpire(): number {
        return Date.now() - this._payload.exp;
    }

    get expirationDate(): number {
        return this._payload.exp;
    }

    get email(): string {
        return this._payload.email;
    }

    get username(): string {
        return this._payload.sub;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get payload(): any {
        return this._payload;
    }

    set payload(value: any) {
        this._payload = value;
    }
}