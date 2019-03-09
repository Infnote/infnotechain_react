import React, { Component } from 'react'
import { List, ListItem, ListItemText, Grid } from '@material-ui/core'
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
                            <ListItemText primary={peer.url} primaryTypographyProps={{className: 'title'}} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )
    }
}

PeerDrawer.propTypes = {
    peers: PropTypes.element,
    onSelect: PropTypes.func,
}

export default PeerDrawer