import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'

import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../firebase/hooks/useCheckAuth'
import { statusEnum } from '../store/auth'

export const AppRouter = () => {

    const { status } = useCheckAuth()

    // Auth Loading screen
    if (status === statusEnum.checkingAuthentication) 
        return <CheckingAuth/>
                
    return (
        <Routes>

            {/* Authentication and Application routes */}
            {
                (status === statusEnum.authenticated)
                 ? <Route path="/*" element={<JournalRoutes />} />
                 : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            {/* Default route */}
            <Route path='/*' element={ <Navigate to='/auth/login' /> }/>
                                                    
        </Routes>  
    )
}