import { AuthStore } from "../common/types";

export const LOGOUT: string = "LOGOUT"
export const AUTHENTICATE: string = "AUTHENTICATE"

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const setAuthDetails = (auth: AuthStore) => {
    return {
        type: AUTHENTICATE,
        payload: auth
    };
};
