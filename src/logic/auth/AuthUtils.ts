import {jwtToken} from "./AuthStorage";

export const parseJwt = (token: string): any => {
    let base64UrlPayload = token.split('.')[1];
    let base64Payload = base64UrlPayload.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64Payload).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const isUserLogged = (): boolean => {
    if (jwtToken.token !== "") {
        return true
    }

    let authCookie = document.cookie.split('; ')
        .find(cookie => cookie.startsWith('Authentication'));
    return typeof authCookie === "string";
}

export const getUsername = (): string => {
    return "";
}

export const login = (username: string, password: string, autoRefreshToken: boolean = true): boolean => {
    // fetch()

    return false;
}
