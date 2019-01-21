import Storage from './storage'
import {SETTINGS} from '../utils'

class Peers {
    static migrate()
    {
        if (Storage.isMigrated() === false){
            Peers.addPeers(SETTINGS.peers)
        }
        Storage.migrate()
    }

    static savePeers(peers) {
        Storage.savePeers(peers)
    }

    static getPeers(count = 0) {
        if (count === 0)
            return Storage.getPeers()
        return Storage.getPeers().slice(0, count)
    }

    static getPeersCount() {
        return Storage.getPeers().length
    }

    static addPeers(peers) {
        Storage.addPeers(peers)
    }

    static 
}

export default Peers