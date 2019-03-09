import React, { Component } from 'react'
import {Service} from '../network'
import NavBar from './NavBar'
import Manager from './Manager'

class App extends Component {

    componentWillMount() {
        this.service = new Service()
    }

    render() {
        return (
            <div>
                <NavBar />
                <Manager />
            </div>
        );
    }
}

export default App
