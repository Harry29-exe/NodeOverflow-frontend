import {parseJwt} from "./AuthUtils";
import {AbstractAuthContext, Authentication, LoginStatus} from "./AuthContext";
import {authServerAddress} from "../addresses/AuthServerAddress";

//TODO it's only temporary implementation
export class JwtAuthContext extends AbstractAuthContext<JwtToken> {

    constructor() {
        super();
        this.refreshToken();
    }

    async login(username: string, password: string, dontLogout: boolean = false): Promise<LoginStatus> {
        let response = await fetch(authServerAddress + "/api/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password}),
                credentials: 'include'
            });

        try {
            this.handleServerResponse(response);
        } catch (e: any) {
            return LoginStatus.FAIL;
        }

        this.callListeners();
        return LoginStatus.OK;
    }

    logout(): void {
        document.cookie = "token= ;"
        let cookies = document.cookie.split(";");
        cookies.filter(c => c.startsWith("token"))
            .forEach(c => document.cookie = "token= ;");

        this._authInfo = undefined;
        this.callListeners();
    }

    private handleServerResponse(response: Response) {
        let token = response.headers.get("Authorization");
        if (typeof token === "string") {
            try {
                this._authInfo = new JwtToken(token);
            } catch (e: any) {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }

    private async refreshToken() {
        let response = await fetch(authServerAddress + '/api/token-refresh', {
            method: 'GET',
            credentials: 'include'
        });
        if (response.status !== 200) {
            return;
        }

        this.handleServerResponse(response);
        this.callListeners();
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