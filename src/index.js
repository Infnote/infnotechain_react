import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Landing from './components/landing';
import { Route, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Peers} from './network'

let routes = (
    <BrowserRouter>
        <div>
        <Route exact path="/" component={App} />
        <Route path="/blocks" component={Landing} />
        </div>
    </BrowserRouter>
)


ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

Peers.migrate();
