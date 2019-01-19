import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'
import {Service} from './network'

class App extends Component {

    connect = () => {
        // let addr = document.getElementById('peerAddr').value
        // let port = document.getElementById('peerPort').value
        //let sm = new ShareManager()
        //sm.connect(addr, port)
        
        // let message = new Message(1,"{\"1\":1}")
        // console.log(message.toJSON())

        let url = document.getElementById('peerURL').value
        new Service([url])
    }

    send = () => {
        this.peer.send('hello world')
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Blockchain Test</h1>
                </header>
                <div id="data_input">
                    <input id="peerURL" type="text" defaultValue="ws://127.0.0.1" />
                    <button id="btnConnect" onClick={this.connect}>create</button>
                    <button id="btnSend" onClick={this.send}>send</button>
                    <br />
                    <p>p2p testing</p>
                    <p>option + command + i to check local storage</p>
                </div>
            </div>
        );
    }
}

export default App;
