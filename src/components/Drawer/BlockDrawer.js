import React, { Component } from 'react'
import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import PropTypes from 'prop-types'
import './Drawer.css'


class BlockDrawer extends Component {
    state = {
        selectedIndex: -1
    }

    render() {
        const { selectedIndex } = this.state
        const { onSelect, blocks } = this.props
        return (
            <Grid item className="drawer">
                <List>
                    {blocks.map(index => (
                        <ListItem 
                            button
                            selected={selectedIndex === index}
                            key={index}
                            onClick={() => {
                                this.setState({selectedIndex: index})
                                onSelect(index)()
                            }}>
                            <ListItemText primary={index} primaryTypographyProps={{className: 'title'}}/>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )
    }
}

BlockDrawer.propTypes = {
    onSelect: PropTypes.func,
    blocks: PropTypes.array
}

export default BlockDrawer