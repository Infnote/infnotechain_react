class Storage {
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

    static addPeers(peers) {
        var result = Storage.getPeers()
        for (var i in peers){
            if (result.includes(peers[i]) === false)
                result.push(peers[i])
        }
        Storage.savePeers(result)
    }

    static migrate() {
        localStorage.setItem('migrated', 'true')
    }

    static isMigrated() {
        return localStorage.getItem('migrated') !== null
    }
}

export default Storage