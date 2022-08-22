import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage, LoginPageHook, RegisterPageHook } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="loginHook" element={ <LoginPageHook/>}/>
        <Route path="registerHook" element={ <RegisterPageHook/> }/>
        <Route path="login" element={ <Suspense><LoginPage/></Suspense> }/>
        <Route path="register" element={ <Suspense><RegisterPage/></Suspense> }/>

        <Route path='/*' element={ <Navigate to="/auth/loginHook" /> } />
    </Routes>
  )
}
