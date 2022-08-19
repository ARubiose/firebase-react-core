import { v2 as cloudinary } from 'cloudinary'
const { fileUpload } = require('../../src/helpers/fileUpload')

cloudinary.config({
    cloud_name: 'dnxewce2b',
    api_key: '136618766169492',
    api_secret: '_E3pN1SFxOoRWQpqCoYEw2F8PZA',
    secure: true,
})

describe('Testing fileUpload', () => {
    test('Correct - Upload to cloudinary', async () => {
        const imageUrl =
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'photo.jpg')

        const data = await fileUpload(file)

        // Data has a secure_url string property
        expect(data).toMatchObject({
            secure_url: expect.any(String),
        })

        const segments = data.secure_url.split('/')
        const photoId = segments[segments.length - 1].replace('.jpg', '')

        const cloudResp = await cloudinary.api.delete_resources([
            'journal/' + photoId,
        ])
    })

    test('Incorrect - Upload to cloudinary', async () => {
        const file = new File([], 'photo.jpg')

        const data = await fileUpload(file)

        // Data has a secure_url string property
        expect(data).toMatchObject({
            error: {},
        })
    })
})
