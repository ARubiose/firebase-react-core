# Authentication Firebase module for React Redux Apps 
React module to support authentication against a firebase backend.

 * [Firebase web documentation](https://firebase.google.com/docs/auth/web/firebaseui)
 * [Firebase setup documentation](https://firebase.google.com/docs/web/setup)
## Installation
***
So far, the best option is cloning the repository and copying the firebase folder to your src folder. 

### Required packages
After copying the folder install the required packages:
```
npm i firebase @reduxjs/toolkit react-redux--save
```
This package is meant to be used with [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start). Add the [authSliceHook](https://github.com/ARubiose/firebase-react-core/blob/1c025aa5b110e084731b508cc06294073cc426b5/src/firebase/authStore/authSliceHook.js) `reducers` to the store and start using the hooks in your components. See how to do it in section [TODO](). 

### Add the required environment variables for the Firebase Configuration
This module has been built using [Vite](https://vitejs.dev/). That is why the environment variables specified in the template follow the pattern *VITE_** ( See the template in [.env.template](./.env.template) ). Fill the information need to connect to the Firebase backend:

*.env file*
```
VITE_APIKEY = 
VITE_AUTHDOMAIN = 
VITE_PROJECTID = 
VITE_STORAGEBUCKET = 
VITE_MESSAGINGSENDERID = 
VITE_APPID = 
```
You may need to change the [config](./config.js) file to create the Firebase core object if you are not using Vite. You can see this information at your project configuration in the [Firebase console](https://console.firebase.google.com).

### Integrate firebase Slice with your store
Import the authSliceHook into your *store.js* and include the reducers:
```javascript
import { authSliceHook } from '../firebase/authStore'

export const store = configureStore({
  reducer: {
    ...
    auth: authSliceHook.reducer
  }
})
```

## API
***

### useFirebaseAuth Hook
To use `useFirebaseAuth`, import the hook into the file an use it as a hook inside your component:

*auth/pages/LoginPageHook.js*
```javascript
import { useFirebaseAuth } from '../firebase/hooks'

export const LoginPageHook = () => {
    
    const { // Use the properties you need
        // Properties
        status,
        errorMessage,
        // Functions
        loginWithEmailPassword,
        GoogleSignIn,
    } = useFirebaseAuth()
    ...
```

`useFirebaseAuth` **returns data and callbacks**. Data to be used as state of the application and asynchronous callbacks to be used in your handlers:
| Constant name                     | Type      | Description  |
| -------------                     |:---------| :-----|
| status                            | String    | Whether the user is: `['Authenticated', 'Non-Authenticated', 'Checking]`. </br> `Default = 'Checking'`    |
| uid                               | String    |  Firebase id of the user.</br> `Default = null` |
| email                             | String    |  Email of the user.</br> `Default = null`  |
| photoURL                          | String    |  URL to the profile pic.</br> `Default = null`  |
| displayName                       | String    |  Display name of the user.</br> `Default = null`  |
| errorMessage                      | String    |  Error message sent by the Firebase Backend when error happens.</br> `Default = undefined`|
| loginWithEmailPassword            | Function  |  Login with email and password. Updates store. </br> Usage: `loginWithEmailPassword({ email, password})` </br> `Returns None`  |
| registeringUserWithEmailPassword  | Function  |    Register with name, email and password. Updates store. </br> Usage: `registeringUserWithEmailPassword({ email, password, displayName})` </br> `Returns None` |
| googleSignIn  | Function  |    Login with Google Authentication PopUp. Updates store. </br> Usage: `registeringUserWithEmailPassword({ email, password, displayName})` </br> `Returns None` |
| firebaseLogout                    | Function  |    Logout. Updates store </br> Usage: `firebaseLogout()` </br> `Returns None` |



```javascript
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
        checkAuth
    }
```

### useCheckFirebaseAutt Hook
To use `useCheckFirebaseAutt`, import the hook into the file an use it as a hook inside one of your top components, such as your router if you are using [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview). 

*AppRouter.js*
```javascript
import { useCheckFirebaseAuth } from '../firebase/hooks'
import { statusEnum } from '../firebase/authStore'

export const AppRouter = () => {
    const { status } = useCheckFirebaseAuth()

    // Auth Loading screen
    if (status === statusEnum.checkingAuthentication) return <CheckingAuthComponent />

    return (
        <Routes>
            {/* Authentication and Application routes */}
            {status === statusEnum.authenticated ? (
                <Route path="/*" element={<AppRoutes />} />
            ) : (
                <Route path="/auth/*" element={<AuthRoutes />} />
            )}

            {/* Default route */}
            <Route path="/*" element={<Navigate to="/auth/loginPage" />} />
        </Routes>
    )
}
```

*authStore/authSliceHook.js*
```javascript
export const statusEnum = {
    authenticated: 'Authenticated',
    nonAuthenticated: 'Non-Authenticated',
    checkingAuthentication: 'Checking',
}
```
**Now you are good to use this Hook!**

### Next Steps
  * Add tests!!
  * Make it a package
  * Support for firestore

