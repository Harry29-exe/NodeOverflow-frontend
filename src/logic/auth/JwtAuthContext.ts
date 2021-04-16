import {parseJwt} from "./AuthUtils";
import {AbstractAuthContext, AuthInfo, LoginStatus} from "./AuthContext";
import {authServerAddress} from "../addresses/AuthServerAddress";

//TODO it's only temporary implementation
export class JwtAuthContext extends AbstractAuthContext<JwtToken> {
    private refreshIsON: boolean = false;

    async login(username: string, password: string, dontLogout: boolean = false): Promise<LoginStatus> {
        let response = await fetch(authServerAddress + "/api/login",
            {
                method: 'POST',
                // referrerPolicy: 'no-referrer',
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
        this._authInfo = null;
    }

    private handleServerResponse(response: Response) {
        let token = response.headers.get("Authorization");
        if (typeof token === "string") {
            try {
                this._authInfo = new JwtToken(token);
                this.setIsLogged(true)
            } catch (e: any) {
                throw new Error();
            }
        } else {
            throw new Error();
        }
    }
}

export class JwtToken implements AuthInfo {
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