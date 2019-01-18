//import Key from './key'
import Block from './block'
import {crypto} from 'bitcoinjs-lib'
import bs58 from 'bs58'
import Storage from './storage'
import Error from './errors'

class Blockchain {

    static fromPrivateKey(key) {
        let blockchain = new Blockchain(key.toAddress())
        blockchain.key = key
        return blockchain
    }

    constructor(id) {
        this.key = null
        this.id = id
    }

    get count() {
        return Storage.getChainCount(this.id)
    }

    updateChainCount(height) {
        Storage.updateChainCount(this.id, height)
    }

    getBlock(height) {
        // height: int;
        let info = Storage.getBlock(height, this.id)
        if (info == null)
            return null

        return Block.fromJSON(info)
    }

    createBlock(payload, height) {
        let block = new Block()
        block.payload = payload
        block.height = height
        block.prevHash = ''
        //block.time  To be done
        if (block.height > 0) {
            block.prevHash = this.getBlock(block.height - 1).blockHash
        }
        block.blockHash = bs58.encode(crypto.sha256(block.dataForHashing, 'utf8'))
        block.signature = this.key.sign(block.dataForHashing)
        return block
    }

    // isValid(block) {
    //     return block.isValid && block.chainID===this.id
    // }

    validateBlock(block) {
        if (block.isValid() === false)
            return Error.InvalidBlockError("block hash or signature is invalid", block)
        if (block.chainID != this.id)
            return Error.MismatchedIDError("the block id mismatch chain id", block)
        let exitsBlock = this.getBlock(block.height)
        if (exitsBlock != null){
            if ((exitsBlock.prevHash !== block.prevHash) || (exitsBlock.blockHash !== block.blockHash))
                return Error.MismatchedIDError("the block id mismatch chain id", exitsBlock, block)
            return Error.ExistBlockError("block already exist", block)
        }
        return null
    }

    saveBlock(block) {
        if (this.validateBlock(block) == null) {
            Storage.saveBlock(block, this.id)
            if (this.count === null)
                this.updateChainCount(block.height)
            else if (block.height + 1 > this.count)
                this.updateChainCount(block.height + 1)
            return true
        }
        return false
    }
}

export default Blockchain