import {parseJwt} from "./AuthUtils";
import {AbstractAuthContext, Authentication, AuthState, LoginStatus} from "./AuthContext";
import {authServerAddress} from "../addresses/AuthServerAddress";

//TODO it's only temporary implementation
export class JwtAuthContext extends AbstractAuthContext<JwtToken> {
    private tokenRefreshActive: boolean;

    constructor(authState: AuthState<JwtToken>) {
        super(authState);
        this.tokenRefreshActive = !!authState.authInfo;
        if (this.tokenRefreshActive) {

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
            console.log(response);
            this.handleServerResponse(response);
        } catch (e: any) {
            return LoginStatus.FAIL;
        }

        return LoginStatus.OK;
    }

    logout(): void {
        this.authState.updateAuth();
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


    get username(): string {
        return "";
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