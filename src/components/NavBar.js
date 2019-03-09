import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'


const styles = theme => ({
    navbar: {
        zIndex: theme.zIndex.drawer + 1,
    }
})

class NavBar extends Component {

    render() {
        const { classes } = this.props
        return (
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Infnote Chain Browser
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavBar)
