import { onAuthStateChanged } from 'firebase/auth'
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
import { FirebaseAuth } from '../config'

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

    const RegisteringUserWithEmailPassword = async ({
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
    const GoogleSignIn = async () => {
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

    const checkAuth = () => {
      onAuthStateChanged(FirebaseAuth, async (user) => {
          
          // Not authenticated
          if (!user) return dispatch(logout())

          // Authenticated
          const { uid, displayName, email, photoURL } = user
          dispatch(login({ uid, displayName, email, photoURL }))
      })
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
        RegisteringUserWithEmailPassword,
        GoogleSignIn,
        firebaseLogout,
        checkAuth
    }
}
