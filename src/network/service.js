import {Peer, Peers} from '../network'
import {handleJSONData, BroadcastBlock, Message} from '../protocol'
import {log} from '../utils'

class Service {
    handleClose = (peer) => {
        for (var i in this.peers)
            if (this.peers[i] === peer){
                this.peers.splice(i,1)
                return
            }
    }

    handleConnection = (peer) => {
        this.peers.push(peer)
    }

    addPeers(urls){
        for (var i in urls) {
            let peer = new Peer(urls[i])
            peer.connect(handleJSONData, this.handleClose, this.handleConnection)
        }
    }

    constructor(){
        this.peers = []
        this.addPeers(Peers.getPeers())
    }

    broadcastBlock(block){
        for (var i in this.peers){
            try{
                let data = BroadcastBlock.create(block).toDict()
                let message = new Message('broadcast:block', data)
                this.peers[i].send(message.toJSON())
            }
            catch(err){
                log.info('failed to broadcast the block to '+ this.peers[i].url)
            }
        }
    }

    getAllCurrentPeers() {
        var urls = []
        for (var i in this.peers)
            urls.push(this.peers[i].url)
        return urls
    }
}

export default Service