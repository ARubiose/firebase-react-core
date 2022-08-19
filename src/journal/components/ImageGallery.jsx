import {  useSelector } from 'react-redux'
import { ImageList, ImageListItem } from '@mui/material'

export const ImageGallery = ( {imageUrls = []}) => {
  const { active:note } = useSelector( state => state.journal)
  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
        {imageUrls.map((url) => (
            <ImageListItem key={url}>
            <img
                src={ `${url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={ url }
                loading="lazy"
            />
            </ImageListItem>
        ))}
    </ImageList>
  )
}
