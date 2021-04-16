export interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

export const register = (requestBody: RegisterRequestBody): string => {


    return "ok";
}