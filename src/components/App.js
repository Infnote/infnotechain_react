import React, { Component } from 'react'
import {Service} from '../network'
import NavBar from './NavBar'

class App extends Component {

    componentWillMount() {
        this.service = new Service()
    }

    render() {
        return (
            <div className="App">
                <NavBar />
            </div>
        );
    }
}

export default App
