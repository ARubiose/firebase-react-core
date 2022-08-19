// Testing thunks = testing dispatch functions are triggered
import {
    authSlice,
    checkingCredentials,
    login,
    logout,
    statusEnum,
} from '../../../src/store/auth/authSlice'
import {
    authenticatedState,
    demoUser,
    initialState,
    notAuthenticatedState,
} from '../../fixtures/authFixtures'

describe('Testing authSlice', () => {
    test('Initial state', () => {
        const state = authSlice.reducer(initialState, {})

        expect(authSlice.name).toBe('auth')
        expect(state).toEqual(initialState)
    })

    test('Authentication/Login', () => {
        const state = authSlice.reducer(notAuthenticatedState, login(demoUser))
        expect(state).toEqual(authenticatedState)
    })

    test('Not-Authentication/logout - No arguments', () => {
        const state = authSlice.reducer(authenticatedState, logout())
        expect(state).toEqual(notAuthenticatedState)
    })

    test('Not-Authentication/logout - With arguments', () => {
        const errorMessage = 'Error message'
        const state = authSlice.reducer(
            authenticatedState,
            logout({ errorMessage })
        )
        expect(state).toEqual({
            ...notAuthenticatedState,
            errorMessage,
        })
    })

    test('Checking credentials - Not authenticated', () => {
        const state = authSlice.reducer(
            notAuthenticatedState,
            checkingCredentials()
        )
        expect(state).toEqual({
            ...notAuthenticatedState,
            status: statusEnum.checkingAuthentication,
        })
    })
})
