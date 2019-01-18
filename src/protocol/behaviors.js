import SETTINGS from '../utils/settings'
import {Storage, Blockchain, Block } from '../blockchain'
import Behavior from './behavior'
import Error from './errors'
import url from 'url'

class Info extends Behavior {
    constructor(version, peers, chains, platform, fullNode) {
        super()
        this.version = version
        this.peers = peers
        this.chains = chains
        this.platform = platform
        this.fullNode = fullNode
    }

    validate() {
        if (this.version !== '1.1')
            return Error.IncompatibleProtocolVersion("only accept v1.1 protocol")
        if (this.peers < 0)
            return Error.BadRequestError("'peers' needs to be a non-negative number")
        return null
    }

    react() {
        var behaviors = []
        if (this.peers > 0)
            behaviors.push(new RequestPeer(this.peers))
        for (var i in this.chains) {
            let key = Object.keys(this.chains[i])[0]
            let value = this.chains[i][key]
            if (SETTINGS.chains.includes(key) === false)
                continue
            if (Storage.getChainCount(key) > value)
                continue
            behaviors.push(new RequestBlocks(key, Storage.getChainCount(key), value - 1))
        }
        return behaviors
    }
}

class RequestPeer extends Behavior {
    constructor(count) {
        super()
        this.count = count
    }

    validate() {
        if (this.count <= 0)
            return Error.BadRequestError("'count' needs to be a non-negative number")
        return null
    }

    react() {
        var behaviors = []
        // TODO: maintain peers
        behaviors.push(new ResponsePeers(['wss://chain.infnote.com:32767/', 'wss://chain.infnote.com:32761/']))
        return behaviors
    }
}

class ResponsePeers extends Behavior {
    constructor(peers) {
        super()
        this.peers = peers
    }

    validate() {
        for (var key in this.peers) {
            let protocol = url.parse(this.peers[key]).protocol
            if ((protocol !== 'wss:') && (protocol !== 'ws:'))
                return Error.URLError("not a websocket URL")
        }
        return null
    }

    react() {
        var behaviors = []
        // TODO: save new peers
        return behaviors
    }
}

class RequestBlocks extends Behavior {
    constructor(chainID, from, to) {
        super()
        this.chainID = chainID
        this.from = from
        this.to = to
    }

    validate() {
        if (SETTINGS.chains.includes(this.chainID) === false)
            return Error.ChainNotAcceptError(this.ChainID)
        if (this.from > this.to)
            return Error.BadRequestError("'from' must greater or equal 'to'")
        if (Storage.getChainCount(this.chainID) < this.from)
            return Error.BadRequestError("request not existed blocks")
        return null
    }

    // Split blocks for every 100KB
    react() {
        var behaviors = []
        var blocks = []
        var size = 0
        let blockchain = new Blockchain(this.chainID)
        for (var i = this.from; i <= this.to; i++) {
            let block = blockchain.getBlock(i)
            if (block == null)
                break

            if (size + block.size > 1024 * 100) {
                behaviors.push(new ResponseBlocks(blocks))
                blocks = []
                blocks.push(block)
                size = block.size
            } else {
                blocks.push(block)
                size += block.size
            }
        }
        if (blocks.length > 0)
            behaviors.push(new ResponseBlocks(blocks))
        return behaviors
    }
}

class ResponseBlocks extends Behavior {
    constructor(blocksJSON) {
        super()
        this.blocksJSON = blocksJSON
        this.blocks = []
    }

    validate() {
        for (var i in this.blocksJSON) {
            let blockJSON = this.blocksJSON[i]
            let block = Block.fromJSON(blockJSON)
            if (SETTINGS.chains.includes(block.chainID) === false)
                return Error.ChainNotAcceptError(block.chainID())
            let blockchain = new Blockchain(block.chainID)
            let err = blockchain.validateBlock(block)
            if (err != null)
                return Error.blockValidationError(err)
            this.blocks.push(block)
        }
        return null
    }

    react() {
        var behaviors = []
        for (var i in this.blocks) {
            let block = this.blocks[i]
            let blockchain = new Blockchain(block.chainID)
            blockchain.saveBlock(block)
        }
        return behaviors
    }
}

class BroadcastBlock extends Behavior {
    constructor(blockJSON) {
        super()
        this.blockJSON = blockJSON
        this.block = null
    }

    validate() {
        let block = Block.fromJSON(this.blockJSON)
        if (SETTINGS.chains.includes(block.chainID) === false)
            return Error.ChainNotAcceptError(block.chainID())
        let blockchain = new Blockchain(block.chainID)
        let err = blockchain.validateBlock(block)
        if (err != null)
            return Error.blockValidationError(err)
        this.block = block
        return null
    }

    react() {
        var behaviors = []
        let blockchain = new Blockchain(this.block.chainID)
        blockchain.saveBlock(this.block)
        return behaviors
    }
}

export {Behavior, Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock }