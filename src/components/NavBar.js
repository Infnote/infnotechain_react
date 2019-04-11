import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Menu, MenuItem, TextField, Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { PeerManager } from 'network'
import { eventEmitter} from 'utils'


const styles = theme => ({
    navbar: {
        ...theme.mixins.toolbar,
        flex: '0 0 auto',
        width: '100%',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
})

class NavBar extends Component {
    state = {
        menuOpen: null,
        modalOpen: null,
        url: null
    }

    handleOpenPeerModal = () => {
        this.setState({
            modalOpen: true,
            menuOpen: false
        })
    }

    handleAddPeer = () => {
        // console.log(this.state.url)
        // TODO: sanitize input
        PeerManager.addPeers([this.state.url])
        this.handleModalClose()

        eventEmitter.emit('PEER_ADDED')
    }

    handleClick = event => {
        this.setState({ menuOpen: true })
    }

    handleClose = () => {
        this.setState({ menuOpen: null })
    }

    handleModalClose = () => {
        this.setState({ modalOpen: null })
    }

    handleChange = () => event => {
        this.setState({
            url: event.target.value
        })
    }

    render() {
        const { classes } = this.props
        const { menuOpen, modalOpen } = this.state

        let modal = (
            <Modal open={Boolean(modalOpen)} onClose={this.handleModalClose}>
                <div className={classes.paper}>
                    <TextField required id="standard-required" label="Required" defaultValue="(Enter peer url)" 
                        className={classes.textField} margin="normal" onChange={this.handleChange()}/>
                    <div><Button variant="contained" color="primary" onClick={this.handleAddPeer}>Add</Button></div>
                </div>
            </Modal>
        )

        return (
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Menu id="navMenu" open={Boolean(menuOpen)} onClose={this.handleClose}>
                        <MenuItem onClick={this.handleOpenPeerModal}>Add Peer</MenuItem>
                    </Menu>
                    <IconButton aria-label="Menu" onClick={this.handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Infnote Chain Browser
                    </Typography>
                </Toolbar>
                {modal}
            </AppBar>
        )
    }
}

export default withStyles(styles)(NavBar)
