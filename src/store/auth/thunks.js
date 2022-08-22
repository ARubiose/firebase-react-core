// Firebase support
import {
    singInWithGoogle,
    loginUserWithEmailPassword,
    registerUserWithEmailPassword,
    logoutFromFirebase,
} from '../../firebase/providers'

import { login, logout, checkingCredentials } from './'

// Authentication with email and password
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, displayName, photoURL, errorMessage } =
            await loginUserWithEmailPassword({ email, password })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, email, displayName, photoURL }))
    }
}

export const startRegisteringUserWithEmailPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } =
            await registerUserWithEmailPassword({
                email,
                password,
                displayName,
            })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL }))
    }
}

// Authentication with Google
export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const response = await singInWithGoogle()

        if (!response.ok) return dispatch(logout(response))

        dispatch(login(response))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFromFirebase()
        dispatch(logout())
    }
}
