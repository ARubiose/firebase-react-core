import { FirebaseAuth } from "../config"

export const logoutFromDB = async ( ) =>{
    return await FirebaseAuth.signOut()
}