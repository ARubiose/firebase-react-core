import React from 'react'
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';

import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'

import { startLogout } from '../../store/auth';
import { clearNotesLogout } from '../../store/slices/journal';

export const NavBar = ({ drawerWidth }) => {

    // Hooks
    const dispatch = useDispatch();

    // Handlers
    const onLogout = () => {
        dispatch( startLogout() );
        dispatch( clearNotesLogout() )
    }

    return (
        <AppBar 
            position='fixed'
            sx={{
                width:{ sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px`}
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr:2, display:{ sm: 'none' } }}>               
                    <MenuOutlined/>
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'>Journal App</Typography>

                    <IconButton 
                        color='error'
                        onClick={ onLogout }>
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}

NavBar.propTypes = {
    drawerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
