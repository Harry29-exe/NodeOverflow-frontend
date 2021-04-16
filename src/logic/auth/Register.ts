import {authServerAddress} from "../addresses/AuthServerAddress";

export interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

export const register = async (requestBody: RegisterRequestBody): Promise<number> => {
    let response = await fetch(authServerAddress + '/api/register',
        {
            method: 'POST',
            body: JSON.stringify(requestBody)
        });

    return response.status;
}