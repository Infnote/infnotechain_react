import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'
import {Peer} from './network'

class App extends Component {

    connect = () => {
        // let addr = document.getElementById('peerAddr').value
        // let port = document.getElementById('peerPort').value
        //let sm = new ShareManager()
        //sm.connect(addr, port)
        
        // let message = new Message(1,"{\"1\":1}")
        // console.log(message.toJSON())

        let addr = document.getElementById('peerAddr').value
        let port = document.getElementById('peerPort').value
        this.peer = new Peer(addr, port)
        this.peer.connect((data) => {
            console.log(data.toJSON())
        })
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
                    <input id="peerAddr" type="text" defaultValue="127.0.0.1" />
                    <input id="peerPort" type="text" defaultValue="80" />
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
