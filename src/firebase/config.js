// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getViteEnvironments } from './helpers/getEnvironments'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_APIKEY: APIKEY,
    VITE_AUTHDOMAIN: AUTHDOMAIN,
    VITE_PROJECTID: PROJECTID,
    VITE_STORAGEBUCKET: STORAGEBUCKET,
    VITE_MESSAGINGSENDERID: MESSAGINGSENDERID,
    VITE_APPID: APPID,
} = getViteEnvironments()

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
}

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)

// Authentication
export const FirebaseAuth = getAuth(FirebaseApp)

// DDBB
export const FirebaseDB = getFirestore(FirebaseApp)
