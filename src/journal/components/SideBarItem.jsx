import { TurnedInNot } from '@mui/icons-material'
import {
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/slices/journal'

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();
    
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title
    }, [title])

    const onNoteClick = ( event ) => {
        dispatch( setActiveNote({id, title, body, date, imageUrls}))
    }

    return (
        <ListItem 
            disablePadding
            onClick={ onNoteClick }
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
