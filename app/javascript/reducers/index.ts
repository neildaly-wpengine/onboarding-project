import { combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT } from "../actions";
import { AuthStore } from "../common/types";

export const initialState: AuthStore = {
    authenticated: false,
    user: {
        id: '',
        email: '',
        firstName: '',
        lastName: ''
    }
};

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case AUTHENTICATE:
            return action.payload;
        default:
            return state;
    }
};

export const allReducers = combineReducers({
    auth: auth,
});

export const rootReducer = (state: any, action: any) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return allReducers(state, action);
};
