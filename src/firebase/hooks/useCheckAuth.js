import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../config'
import { login, logout } from '../../store/auth'
import { startLoadingNotes } from '../../store/slices/journal'

export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            
            // Not authenticated
            if (!user) return dispatch(logout())

            // Authenticated
            const { uid, displayName, email, photoURL } = user
            dispatch(login({ uid, displayName, email, photoURL }))
            dispatch(startLoadingNotes())
        })
    }, [])

    return {
        status,
    }
}
