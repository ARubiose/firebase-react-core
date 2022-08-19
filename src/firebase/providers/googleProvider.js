import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../config";

// Google provider
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try{
        const response = await signInWithPopup(FirebaseAuth, googleProvider)
        const { uid, displayName, email, photoURL}  = response.user;
        return {
            ok: true,
            uid,
            displayName,
            email,
            photoURL
        }

    } catch (error) {
        const { code:errorCode, message:errorMesage } = error
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError( error )
        return{
            ok: false,
            errorCode, 
            errorMesage,
            email,
            credential
        }
    }
}