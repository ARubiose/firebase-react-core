import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../../firebase/config'
import { fileUpload } from '../../../helpers'
import { loadNotes } from '../../../helpers/loadNotes'
import {
    addNewEmptyNote,
    setActiveNote,
    creatingNewNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    deleteNoteById,
} from './'

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(creatingNewNote())
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        const newNoteWithId = { id: newDoc.id, ...newNote }
        dispatch(addNewEmptyNote(newNoteWithId))
        dispatch(setActiveNote(newNoteWithId))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const noteToDB = { ...note }
        delete noteToDB.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToDB, { merge: true })

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosData = await Promise.all(fileUploadPromises)
        const photosUrls = photosData.map((data) => data.secure_url)

        dispatch(setPhotosToActiveNote(photosUrls))
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const docref = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`)
        const resp = await deleteDoc(docref)

        // if(!resp.ok) throw new Error('Cannot delete note ')

        dispatch( deleteNoteById(note.id))

    }
}
