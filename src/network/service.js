import {Peer, Peers} from '../network'
import {handleJSONData, BroadcastBlock, Message} from '../protocol'

class Service {
    addPeers(urls){
        for (var i in urls) {
            let peer = new Peer(urls[i])
            peer.connect(handleJSONData)
            this.peers.push(peer)
        }
    }

    constructor(){
        this.peers = []
        this.addPeers(Peers.getPeers())
    }

    broadcastBlock(block){
        for (var i in this.peers){
            let data = BroadcastBlock.create(block).toDict()
            let message = new Message('broadcast:block', data)
            this.peers[i].send(message.toJSON())
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