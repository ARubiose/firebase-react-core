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


const formData = {
    email: '',
    password: '',
}
/**
 *
 * Basic login page
 */
export const LoginPage = () => {
    // Hooks
    const { status, errorMessage } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { t } = useTranslation(['user-control'])
    const { email, password, onInputChange } = useForm(formData)

    // Functions // Usage of useMemo to not change it every time the form changes.
    const isAuthenticating = useMemo(() => status === 'checking', [status]) // Check whether the user is authenticating theirself

    // Handlers
    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(startLoginWithEmailPassword({ email, password }))
    }

    const onGoogleSignIn = (event) => {
        event.preventDefault()
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title={t('login')}>
            <form onSubmit={onSubmit}>
                <Grid container>
                    {/* Input fields */}
                    <Grid item xs={12}>
                        <TextField
                            type="email"
                            label={t('email')}
                            placeholder="testmail@domain.com"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            fullWidth
                        >
                            {t('email')}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="password"
                            label={t('password')}
                            placeholder={t('password')}
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            fullWidth
                        >
                            {t('password')}
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
                                {t('login')}
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
                                {t('createAccount')}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
