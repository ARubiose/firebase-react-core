import React, { useEffect, useMemo, useRef } from 'react'

import { SaveOutlined, UploadOutlined, DeleteOutline } from '@mui/icons-material'
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/slices/journal'

export const NoteView = () => {
    // Hooks
    const {
        active: note,
        savedMessage,
        isSaving,
    } = useSelector((state) => state.journal)
    const dispatch = useDispatch()
    const { title, body, date, formState, onInputChange } = useForm(note)

    const dateString = useMemo(() => {
        const dateObject = new Date(date)
        return dateObject.toUTCString()
    }, [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Notes updated', savedMessage, 'success')
        }
    }, [savedMessage])

    // Handlers
    const onSaveNote = (event) => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return
        dispatch( startUploadingFiles( target.files ))
    }

    const onNoteDelete = ( event ) => {
        dispatch( startDeletingNote() )
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">
                    {dateString}
                </Typography>
            </Grid>
            <Grid item>
                {/* Upload images button */}
                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                {/* Save note button */}
                <Button sx={{ padding: 2 }} onClick={onSaveNote}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Type title"
                    label="Title"
                    sx={{ border: 'none' }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    minRows={5}
                    placeholder="What happened today?"
                    sx={{ border: 'none', mt: 1 }}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onNoteDelete }
                    sx={ { mt: 2 }}
                    color='error'
                >
                    <DeleteOutline/>
                    Delete
                </Button>
            </Grid>            
            {/* Image gallery */}
            <ImageGallery imageUrls={ note?.imageUrls } />
        </Grid>
    )
}
