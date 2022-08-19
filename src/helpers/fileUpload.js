import { responsiveFontSizes } from '@mui/material'

export const fileUpload = async (file) => {
    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnxewce2b/image/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'react-journal')
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
