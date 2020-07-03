import { AuthStore } from "../../common/types"
import { mockUser } from "../articles/__helpers__/test-data"
import { AUTHENTICATE, setAuthDetails, LOGOUT, logout } from "../../actions"

describe('auth actions', () => {
    it('dispatches auth action after authentication', () => {
        const authStore: AuthStore = {
            authenticated: true,
            user: mockUser
        }
        const expectedAction = {
            type: AUTHENTICATE,
            payload: authStore
        }

        expect(setAuthDetails(authStore)).toEqual(expectedAction);
    });

    it('dispatches logout action after logout', () => {
        const expectedAction = {
            type: LOGOUT,
        }

        expect(logout()).toEqual(expectedAction);
    });
});
