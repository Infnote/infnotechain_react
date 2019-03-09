import React, { Component } from 'react'
import { PeerDrawer, ChainDrawer, BlockDrawer } from './Drawer'
import { Grid, withStyles } from '@material-ui/core'
import { Peer, PeerManager } from 'network'
import { Message } from 'protocol'
import BlockContent from './BlockContent'

const style = theme => ({
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

class Manager extends Component {
    peers = PeerManager.getPeers().map(url => new Peer(url))

    state = {
        selectedPeer: null,
        selectedChain: null,
        chainList: {},
        blockList: [],
        block: null
    }

    handleSelectPeer = peer => () => {
        const { selectedPeer } = this.state
        if (peer !== selectedPeer) {
            if (selectedPeer) {
                selectedPeer.close()
            }
            if (peer.isConnect) {
                peer.close()
            }
            this.setState({selectedPeer: peer})
            peer.connect(data => {
                let msg = Message.fromJSON(data)
                if (msg.type === 'info') {
                    this.setState({chainList: msg.data['chains']})
                } 
                else if (msg.type === 'response:blocks') {
                    let blocks = msg.data['blocks']
                    if (blocks.length > 0) {
                        this.setState({block: blocks[0]})
                    }
                }
            })
        }
    }

    handleSelectChain = key => () => {
        var indexes = []
        for (var i = this.state.chainList[key] - 1; i >= 0; i--) {
            indexes.push(i)
        }
        this.setState({selectedChain: key, blockList: indexes})
    }

    handleSelectBlock = index => () => {
        const { selectedPeer, selectedChain } = this.state
        selectedPeer.send(JSON.stringify({
            id: Message.generateID(),
            type: 'request:blocks',
            data: {
                chain_id: selectedChain,
                from: index,
                to: index,
            }
        }))
    }

    render() {
        const { classes } = this.props
        const { chainList, blockList, block } = this.state
        return (
            <div className={classes.container}>
                <div className={classes.toolbar} />
                <Grid container className={classes.grid} direction="row">
                    <PeerDrawer peers={this.peers} onSelect={this.handleSelectPeer} />
                    <ChainDrawer chains={chainList} onSelect={this.handleSelectChain} />
                    <BlockDrawer blocks={blockList} onSelect={this.handleSelectBlock} />
                    <BlockContent block={block} />
                </Grid>
            </div>
        )
    }
}

export default withStyles(style)(Manager)
