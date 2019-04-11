import React, { Component } from 'react'
import { List, ListItem, ListItemText, Grid, Typography, ListItemSecondaryAction } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import {eventEmitter} from 'utils'
import './Drawer.css'


class PeerDrawer extends Component {
    state = {
        selectedIndex: -1
    }

    handleRemove = (peer) => {
        this.setState({
            selectedIndex: -1
        })

        eventEmitter.emit('PEER_REMOVED', peer)
    }

    render() {
        const { selectedIndex } = this.state
        const { peers, onSelect } = this.props
        return (
            <Grid item className="drawer">
                <Typography variant="title" className="title">Peer List</Typography>
                <List>
                    {peers.map((peer, index) => (
                        <ListItem 
                            button 
                            selected={selectedIndex === index} 
                            key={index} 
                            onClick={() => {
                                this.setState({selectedIndex: index})
                                onSelect(peer)()
                            }} 
                        >
                            <ListItemText primary={peer.url} primaryTypographyProps={{className: 'element'}} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Comments" onClick={this.handleRemove.bind(this, peer)}>
                                    -
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )
    }
}

PeerDrawer.propTypes = {
    peers: PropTypes.array,
    onSelect: PropTypes.func,
}

export default PeerDrawer