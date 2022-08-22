import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import {
    startLoginWithEmailPassword,
    startGoogleSignIn,
} from '../../store/auth'
import { useMemo } from 'react'
import { useFirebaseAuth } from '../../firebase/hooks/useFirebaseAuth'


const formData = {
    email: '',
    password: '',
}
/**
 *
 * Basic login page
 */
export const LoginPageHook = () => {
    // Hooks
    const { email, password, onInputChange } = useForm(formData)
    const { // Use the properties you need
        // Properties
        status,
        errorMessage,
        // Functions
        loginWithEmailPassword,
        googleSignIn,
    } = useFirebaseAuth()

    // Functions // Usage of useMemo to not change it every time the form changes.
    const isAuthenticating = useMemo(() => status === 'checking', [status]) // Check whether the user is authenticating theirself

    // Handlers
    const onSubmit = (event) => {
        event.preventDefault()
        loginWithEmailPassword({ email, password })
    }

    const onGoogleSignIn = (event) => {
        event.preventDefault()
        googleSignIn()
    }

    return (
        <AuthLayout title="login">
            <form onSubmit={onSubmit}>
                <Grid container>
                    {/* Input fields */}
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label="email"
                            placeholder="testmail@domain.com"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            fullWidth
                        >
                            email
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="password"
                            label="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            fullWidth
                        >
                            password
                        </TextField>
                    </Grid>

                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                onClick={onGoogleSignIn}
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                            sx={{ mt: 2 }}
                        >
                            <Link
                                component={RouterLink}
                                color="inherit"
                                to="/auth/register"
                            >
                                Create account
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
