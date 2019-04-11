import PeerStorage from './storage'
import {SETTINGS} from '../utils'
import url from 'url'

class PeerManager {
    static migrate()
    {
        if (PeerStorage.isMigrated() === false){
            PeerManager.addPeers(SETTINGS.peers)
        }
        PeerStorage.migrate()
    }

    static savePeers(peers) {
        PeerStorage.savePeers(peers)
    }

    static getPeers(count = 0) {
        if (count === 0)
            return PeerStorage.getPeers()
        return PeerStorage.getPeers().slice(0, count)
    }

    static getPeersCount() {
        return PeerStorage.getPeers().length
    }

    static addPeers(peers) {
        for (var i in peers){

            let parse = url.parse(peers[i])

            var port = parse.protocol === 'ws:'? 80: 443
            if (parse.port !== null)
                port = parse.port
            
            var path = '/'
            if (parse.path != null)
                path = parse.path
            
            let peer = parse.protocol + '//' + parse.hostname + ':' + port + path
            
            PeerStorage.addPeer(peer)
        }
    }

    static removePeers(peers) {
        PeerStorage.removePeers(peers)
    }
}

export default PeerManager