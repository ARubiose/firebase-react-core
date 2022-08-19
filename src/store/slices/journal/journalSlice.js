import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
    },
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true
        },

        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload)
            state.isSaving = false
        },

        setActiveNote: (state, { payload }) => {
            state.active = payload
            state.savedMessage = ''
        },

        setNotes: (state, { payload }) => {
            state.notes = [...payload]
        },

        setSaving: (state, { payload }) => {
            state.isSaving = true
            state.savedMessage = ''
        },

        updateNote: (state, { payload }) => {
            state.isSaving = false
            state.notes = state.notes.map((note) =>
                note.id == payload.id ? payload : note
            )
            state.savedMessage = `${payload.title}, updated correctly.`
        },

        deleteNoteById: (state, { payload }) => {
            state.notes = state.notes.filter((note) => note.id !== payload)
            state.active = null;
            state.savedMessage = 'Note deleted correctly.'
        },

        setPhotosToActiveNote: (state, { payload }) => {
            state.active.imageUrls = [...state.active.imageUrls, ...payload]
            state.isSaving = false
        },

        clearNotesLogout: (state) => {
            state.active = false
            state.savedMessage = ''
            state.notes = []
            state.active = null
        },
    },
})

export const {
    addNewEmptyNote,
    creatingNewNote,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions
