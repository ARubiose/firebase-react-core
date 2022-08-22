import { useDispatch, useSelector } from 'react-redux'

// Firebase support
import {
    singInWithGoogle,
    loginUserWithEmailPassword,
    registerUserWithEmailPassword,
    logoutFromFirebase,
} from '../../firebase/providers'

// Store actions
import { login, logout, checkingCredentials } from '../authStore/authSliceHook'

/**
 * Basic hook for Firebase-based authentication
 * @returns
 */
export const useFirebaseAuth = () => {
    const dispatch = useDispatch()
    const { status, uid, email, displayName, photoURL, errorMessage } =
        useSelector((state) => state.authHook)

    // Authentication with email and password
    const loginWithEmailPassword = async ({ email, password }) => {
        dispatch(checkingCredentials())

        const { ok, uid, displayName, photoURL, errorMessage } =
            await loginUserWithEmailPassword({ email, password })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, email, displayName, photoURL }))
    }

    const registeringUserWithEmailPassword = async ({
        email,
        password,
        displayName,
    }) => {
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

    // Autentication with Google
    const googleSignIn = async () => {
        dispatch(checkingCredentials())
        const response = await singInWithGoogle()

        if (!response.ok) return dispatch(logout(response))

        dispatch(login(response))
    }

    // General Authentication functions
    const firebaseLogout = async () => {
        await logoutFromFirebase()
        dispatch(logout())
    }

    return {
        // Properties
        status,
        uid,
        email,
        displayName,
        photoURL,
        errorMessage,
        // Functions
        loginWithEmailPassword,
        registeringUserWithEmailPassword,
        googleSignIn,
        firebaseLogout,
    }
}
