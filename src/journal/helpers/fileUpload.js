import { getEnvironments } from '../../helpers'

// Enviroment variables
const { VITE_CLOUDNAME, VITE_APP_PRESETS } = getEnvironments()

/**
 * Upload an image to cloudninary
 * @param {Blob} file Blob (Bytes) of the image 
 * @returns
 */
export const fileUpload = async (file) => {
    if (!file) return null

    const cloudUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUDNAME}/image/upload`

    const formData = new FormData()
    formData.append('upload_preset', VITE_APP_PRESETS)
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        })
        const data = await resp.json()

        return data
    } catch (error) {
        return null
    }
}
