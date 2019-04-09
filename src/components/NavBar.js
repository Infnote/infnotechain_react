import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
    navbar: {
        ...theme.mixins.toolbar,
        flex: '0 0 auto',
        width: '100%',
    },
})

class NavBar extends Component {
    state = {
        menuOpen: null
    }

    handleClick = event => {
        this.setState({ menuOpen: true });
    }

    handleClose = () => {
        this.setState({ menuOpen: null })
    }

    render() {
        const { classes } = this.props
        const { menuOpen } = this.state
        return (
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Menu id="navMenu" open={Boolean(menuOpen)} onClose={this.handleClose}>
                        <MenuItem>Add Peer</MenuItem>
                    </Menu>
                    <Button aria-label="Menu" onClick={this.handleClick}>
                        <MenuIcon />
                    </Button>
                    <Typography variant="h6" color="inherit">
                        Infnote Chain Browser
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavBar)
