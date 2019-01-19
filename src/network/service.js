import Peer from './peer'
import {handleJSONData, BroadcastBlock, Message} from '../protocol'

class Service {
    constructor(urls){
        this.peers = []
        for (var i in urls) {
            let peer = new Peer(urls[i])
            peer.connect(handleJSONData)
            this.peers.push(peer)
        }
    }

    broadcastBlock(block){
        for (var i in this.peers){
            let data = BroadcastBlock.create(block).toJSON()
            let message = new Message('broadcast:block', data)
            this.peers[i].send(message.toJSON())
        }
    }
}

export default Service