import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

class NavBar extends Component {

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Infnote Chain Browser
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar
