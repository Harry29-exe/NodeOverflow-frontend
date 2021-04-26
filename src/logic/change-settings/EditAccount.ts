import {ResponseListener} from "./ChangeSettingsResponse";
import {authServerAddress} from "../addresses/AuthServerAddress";
import {AbstractAuthContext} from "../auth/AuthContext";

const httpCodeToSettingsCode = (code: number) => {
    if (code < 300) {
        return "success";
    } else {
        return "fail"
    }
}

export const changeEmail = async (authContext: AbstractAuthContext<any>,
                                  newEmail: string, resListener: ResponseListener) => {
    let body = {
        id: authContext.authInfo.id,
        email: newEmail,
    }
    let response = await fetch(authServerAddress + "/api/user", {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authContext.authInfo.token,
        },
    });

    resListener({status: httpCodeToSettingsCode(response.status), message: JSON.stringify(response.body)})
}

export const changePassword = async (authContext: AbstractAuthContext<any>,
                                     oldPassword: string, newPassword: string,
                                     responseListener: ResponseListener) => {
    let body = {
        id: authContext.authInfo.id,
        password: oldPassword,
        newPassword: newPassword
    }
    let response = await fetch(authServerAddress + "/api/user", {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authContext.authInfo.token,
        },
    });

    let responseBody = JSON.stringify(response.body);
    responseListener({
        status: httpCodeToSettingsCode(response.status),
        message: responseBody === "{}" ? undefined : responseBody
    });

}
