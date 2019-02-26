import React, { Component } from 'react';
import BlockchainListView from './blockchainListView';
import BlockchainSearch from './blockchainSearch';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.state.isSearching = false;
    }

    render() {
        return (
            <div>
                This is the landing page of blockchain view
                <BlockchainSearch />
                <BlockchainListView />
            </div>
        );
    }
}

export default Landing