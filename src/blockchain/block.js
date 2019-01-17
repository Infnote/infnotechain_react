import bs58 from 'bs58'
import { Key } from '.';
import createHash from 'create-hash'

class Block {
    static fromJSON(jsonString) {
        var data = JSON.parse(jsonString)
        var block = Block.fromDict(data)
        return block
    }

    static fromDict(data) {
        var block = new Block()
        block.blockHash = data['hash']
        block.prevHash = data['prev_hash']
        block.time = data['time']
        block.signature = data['signature']
        block.height = data['height']
        block.payload = data['payload']
        return block
    }

    constructor() {
        this.blockHash = ''
        this.prevHash = ''
        this.time = 0
        this.signature = ''
        this.height = 0
        this.payload = ''
    }

    get isGenesis() {
        return this.height === 0
    }

    get dict() {
        let data = {
            'hash': this.blockHash,
            'time': this.time,
            'signature': this.signature,
            'height': this.height,
            'payload': this.payload,
            'prev_hash': this.prevHash
        }  
        return data
    }

    get dataForHashing() {
        let data = this.dict

        var result = data['height'].toString() + data['time'].toString()
        if (data['prev_hash'] != null)
            result += data['prev_hash'].toString()
        var buffer = new Buffer(result);
        return Buffer.concat([buffer, bs58.decode(data['payload'])])
    }

    get chainID(){
        return Key.recoverAddress(this.signature, this.dataForHashing)
    }

    isValid() {
        /*
        //Debug: two confitions
        console.log((this.height === 0 || (this.prevHash != null && this.prevHash.length > 0)))
        console.log(bs58.encode(createHash('sha256').update(this.dataForHashing).digest()) === this.blockHash)
        */
        return (this.height === 0 || (this.prevHash != null && this.prevHash.length > 0)) &&
        bs58.encode(createHash('sha256').update(this.dataForHashing).digest()) === this.blockHash 
    }

    toJSON() {
        return JSON.stringify(
            this.dict,
            Object.keys(this.dict).sort()
        )
    }
}

export default Block
