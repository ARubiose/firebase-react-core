import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from "react-i18next";

import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisteringUserWithEmailPassword, statusEnum } from '../../store/auth';

const formData = {
  displayName: '',
  email:'',
  password:''
}

const formValidations = {
  email: [ ( value ) => value.includes('@'), 'Email should contain an @.'],
  password: [ ( value ) => value.length >= 6, 'Password should contain more than 6 characters.'],
  displayName: [ ( value ) => value.length >= 1, 'Name is mandatory.']
}
export const RegisterPage = () => {

  // Hooks
  const { t } = useTranslation(['user-control'])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector( state => state.auth );
  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid} = useForm( formData, formValidations )

  // Functions
  const isCheckingAuthentication = useMemo( () => status === statusEnum.checkingAuthentication, [status] ) // Usage of useMemo to not change it every time the form changes.
  
  // Handlers
  const onSubmit = ( event ) => {
    event.preventDefault()
    setFormSubmitted(true)

    if( !isFormValid ) return;

    dispatch( startRegisteringUserWithEmailPassword( formState ) );
  
  } 

  return (
    <AuthLayout title={ t('register') }>
      <form onSubmit={ onSubmit }>
        <Grid container>

          {/* Input fields */}
          <Grid item xs={ 12 }>
            <TextField 
              label= { t('name') } 
              type="text"
              placeholder='Alvaro Rubio'
              name= 'displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
              fullWidth>
                { t('name') } 
            </TextField>
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label= { t('email') } 
              type="email"
              placeholder='testmail@domain.com'
              name= 'email'
              value={ email }
              onChange={ onInputChange }
              error={ !!emailValid && formSubmitted}
              helperText={ emailValid }
              fullWidth>
                { t('email') } 
            </TextField>
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }} >
            <TextField 
              label= { t('password') } 
              type='password'
              placeholder={ t('password') } 
              name= 'password'
              value={ password }
              onChange={ onInputChange }
              error={ !!passwordValid && formSubmitted}
              helperText={ passwordValid }
              fullWidth>
                { t('password') } 
            </TextField>
          </Grid>

          {/* Buttons */}
          <Grid container spacing={ 2 } sx={{ mt: 1 }}>

            <Grid item 
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none'} 
            >
              <Alert severity='error'>{ errorMessage}</Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button 
                type='submit'
                disabled={ isCheckingAuthentication }
                variant='contained' 
                fullWidth>
                { t('register.button') }
              </Button>
            </Grid>

            <Grid container direction='row' justifyContent='end' sx={{ mt:2 }}>
              <Typography sx={{ mr:1 }}>{ t('already an account?') }</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                { t('login') }
              </Link>
            </Grid>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
