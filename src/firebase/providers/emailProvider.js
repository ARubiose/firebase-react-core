import i18next from 'i18next'

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { FirebaseAuth } from '../config'

// TODO
const firebaseErrorMapping = {
    'Firebase: Error (auth/user-not-found).': i18next.t('userNotFound'),
}

export const loginUserWithEmailPassword = async ({ email, password }) => {
    try {
        const response = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        )
        const { uid, displayName, photoURL } = response.user
        return {
            ok: true,
            uid,
            email,
            displayName,
            photoURL,
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const registerUserWithEmailPassword = async ({
    email,
    password,
    displayName,
}) => {
    try {
        const response = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        )
        const { uid, photoURL } = response.user
        await updateProfile(FirebaseAuth.currentUser, { displayName })
        return {
            ok: true,
            uid,
            displayName,
            email,
            photoURL,
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}
