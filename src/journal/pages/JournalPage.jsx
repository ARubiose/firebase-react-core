import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/slices/journal'

export const JournalPage = () => {
    // Hooks
    const dispatch = useDispatch()
    const { isSaving, active } = useSelector((state) => state.journal)

    // Handlers
    const onClickNewNote = (event) => {
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {!!active ? <NoteView /> : <NothingSelectedView />}

            <IconButton
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
                onClick={onClickNewNote}
                disabled={isSaving}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
