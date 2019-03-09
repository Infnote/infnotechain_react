import React, { Component } from 'react'
import { Drawer, Typography, Divider, List } from '@material-ui/core'

class PeerDrawer extends Component {
    render() {
        return (
            <Drawer variant="permanent">
                <Typography variant="h6">Peers</Typography>
                <Divider />
                <List>
                    
                </List>
            </Drawer>
        )
    }
}

export default PeerDrawer