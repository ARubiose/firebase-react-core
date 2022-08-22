import { FirebaseAuth } from "../config"

export const logoutFromFirebase = async ( ) =>{
    return await FirebaseAuth.signOut()
}