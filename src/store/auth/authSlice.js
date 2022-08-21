import { createSlice } from '@reduxjs/toolkit';

export const statusEnum = {
    authenticated: 'Authenticated',
    nonAuthenticated: 'Non-Authenticated',
    checkingAuthentication: 'Checking',
}

const initialState = {
    status: statusEnum.checkingAuthentication, // checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {...initialState},
    reducers: {
        login: (state, { payload } ) => {
            state.status        = statusEnum.authenticated;
            state.uid           = payload.uid;
            state.email         = payload.email;
            state.displayName   = payload.displayName;
            state.photoURL      = payload.photoURL;
            state.errorMessage  = payload.errorMessage;
        },

        logout: ( state, { payload } ) => {
            state.status        = statusEnum.nonAuthenticated; 
            state.uid           = null;
            state.email         = null
            state.displayName   = null;
            state.photoURL      = null;
            state.errorMessage  = payload?.errorMessage;
        },

        checkingCredentials: ( state ) => {
            state.status        = statusEnum.checkingAuthentication; 
        }
    },
})

export const { login, logout, checkingCredentials } = authSlice.actions