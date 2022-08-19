import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Box } from '@mui/system'
import {
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { SideBarItem } from './SideBarItem'

/**
 * Simple SideBar
 */
export const SideBar = ({ drawerWidth = 240 }) => {
    const { displayName } = useSelector((state) => state.auth)
    const { notes } = useSelector((state) => state.journal)

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent" // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': {
                        bozsizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {notes.map((note) => (
                        <SideBarItem key={note.id} { ...note } />
                    ))}
                </List>
            </Drawer>
        </Box>
    )
}

SideBar.propTypes = {
    drawerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
