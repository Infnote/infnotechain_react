import url from 'url'

class PeerStorage {
    static savePeers(peers) {
        let index = 'peers'
        return localStorage.setItem(index, JSON.stringify(peers))
    }

    static getPeers() {
        let index = 'peers'
        let result = localStorage.getItem(index)
        if (result == null)
            return []
        return JSON.parse(localStorage.getItem(index))
    }

    static addPeer(peer) {
        var result = PeerStorage.getPeers()
        let parserPeer = url.parse(peer)
        var flag = true
        for (var i in result){
            let parser = url.parse(result[i])
            if (parser.hostname === parserPeer.hostname && parser.port === parserPeer.port)
                flag = false
        }
        if (flag){
            result.push(peer)
            PeerStorage.savePeers(result)
        }
    }

    static removePeers(_peers) {
        var peers = PeerStorage.getPeers()

        _peers.map(p => p.url).forEach(url => {
            if(peers.indexOf(url) >= 0) {
                peers.splice(peers.indexOf(url), 1)
            }
        })
        PeerStorage.savePeers(peers)
    }

    static migrate() {
        localStorage.setItem('migrated', 'true')
    }

    static isMigrated() {
        return localStorage.getItem('migrated') !== null
    }
}

export default PeerStorage