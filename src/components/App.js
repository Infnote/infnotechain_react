import React, { Component } from 'react'
import {Service} from '../network'
import NavBar from './NavBar'
import Manager from './Manager'
import { withStyles } from '@material-ui/core'

let style = theme => ({
    container: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,   
        display: 'flex',   
        flexDirection: 'column',
    },
    grid: {
        flex: '1 1 auto'
    },
    toolbar: {
        ...theme.mixins.toolbar,
        flex: '0 0 auto',
        width: '100%',
    },
})

class App extends Component {

    componentWillMount() {
        this.service = new Service()
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.container}>
                <NavBar />
                <Manager />
            </div>
        );
    }
}

export default withStyles(style)(App)
