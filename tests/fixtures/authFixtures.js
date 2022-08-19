import { statusEnum } from "../../src/store/auth/authSlice";

export const initialState = {
    status: statusEnum.checkingAuthentication,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoURL: 'http://demo.jpg',
    errorMessage: null
}

export const authenticatedState = {
    status: statusEnum.authenticated,
    ...demoUser,
}

export const notAuthenticatedState = {
    status: statusEnum.nonAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined
}

