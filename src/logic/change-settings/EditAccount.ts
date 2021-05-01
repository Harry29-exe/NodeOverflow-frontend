import {authServerAddress} from "../addresses/AuthServerAddress";
import {AbstractAuthContext} from "../auth/AuthContext";
import {RequestResult, RequestStatus} from "../utils/RequestResult";

const httpCodeToSettingsCode = (code: number) => {
    if (code < 300) {
        return RequestStatus.SUCCESS;
    } else {
        return RequestStatus.FAIL;
    }
}

export const changeEmail = async (
    authContext: AbstractAuthContext<any>,
    newEmail: string): Promise<RequestResult> => {
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

    return {
        status: httpCodeToSettingsCode(response.status),
        message: JSON.stringify(response.body)
    };
}

export const changePassword = async (
    authContext: AbstractAuthContext<any>,
    oldPassword: string, newPassword: string) => {
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

    return ({
        status: httpCodeToSettingsCode(response.status),
        message: responseBody === "{}" ? undefined : responseBody
    });
}
