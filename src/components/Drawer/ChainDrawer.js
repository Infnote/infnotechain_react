import React, { Component } from 'react'
import { List, ListItem, ListItemText, Grid } from '@material-ui/core'
import PropType from 'prop-types'
import './Drawer.css'

class ChainDrawer extends Component {
    state = {
        selectedIndex: -1
    }

    render() {
        const { selectedIndex } = this.state
        const { chains, onSelect } = this.props
        return (
            <Grid item className="drawer">
                <List>
                    {Object.keys(chains).map((key, index) => (
                        <ListItem 
                            button
                            selected={selectedIndex === index}
                            key={index}
                            onClick={() => {
                                this.setState({selectedIndex: index})
                                onSelect(key)()
                            }}
                        >
                            <ListItemText 
                                primary={key} 
                                primaryTypographyProps={{className: 'title'}} 
                                secondary={'Block Count: ' + chains[key]}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )
    }
}

ChainDrawer.propTypes = {
    onSelect: PropType.func,
    chains: PropType.object,
}

export default ChainDrawer
