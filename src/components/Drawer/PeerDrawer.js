import React, { Component } from 'react'
import { List, ListItem, ListItemText, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import './Drawer.css'


class PeerDrawer extends Component {
    state = {
        selectedIndex: -1
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