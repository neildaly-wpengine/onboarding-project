import { auth, initialState } from "../../reducers"
import { AuthStore } from "../../common/types"
import { mockUser } from "../articles/__helpers__/test-data"
import { AUTHENTICATE, LOGOUT } from "../../actions"

describe('reducers', () => {
    it('auth state should be initially set to default', () => {
        const expectedState: AuthStore = {
            authenticated: false,
            user: {
                id: '',
                email: '',
                firstName: '',
                lastName: ''
            }
        }
        expect(auth(initialState, { type: 'default' })).toEqual(expectedState);
    })

    it('auth state should be set after authenticating', () => {
        const authStore: AuthStore = {
            authenticated: true,
            user: mockUser
        }

        expect(auth(initialState, { type: AUTHENTICATE, payload: authStore }))
            .toEqual(authStore);
    })

    it('auth state should be reset after logout', () => {
        expect(auth(undefined, { type: LOGOUT }))
            .toEqual(initialState);
    })
});
