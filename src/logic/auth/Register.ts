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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

    return response.status;
}