import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../config'

export const getDocsFromPath = async (path = null) => {
    if (!path) throw new Error('Blank path')

    const collectionRef = collection(FirebaseDB, path)
    const docs = await getDocs(collectionRef)

    const items = []
    docs.forEach((doc) => {
        items.push({
            id: doc.id,
            ...doc.data(),
        })
    })

    return items
}
