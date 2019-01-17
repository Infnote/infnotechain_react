import {Info, RequestPeer, ResponsePeers,RequestBlocks, ResponseBlocks} from '../protocol/behaviors'
import {Blockchain, Key} from '../blockchain'

test("Info validation test", () => {
    var info = new Info('1.1',2,[{'id':2},{'id2':3}],'web',false)
    expect(info.validate()).toEqual(null)
})

test("Info rection test", () => {
    var info = new Info('1.1',2,[{'id':2},{'id2':3}],'web',false)
    expect(info.react()).toEqual([new RequestPeer(2), new RequestBlocks('id',0,1)])
})

test("RequestPeer validation test", () => {
    var requestPeer = new RequestPeer(2)
    expect(requestPeer.validate()).toEqual(null)
})

test("RequestPeer rection test", () => {
    var requestPeer = new RequestPeer(2)
    expect(requestPeer.react()).toEqual([new ResponsePeers(['wss://chain.infnote.com:32767/','wss://chain.infnote.com:32761/'])])
})

test("ResponsePeers validation test", () => {
    var responsePeers = new ResponsePeers(['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/'])
    expect(responsePeers.validate()).toEqual(null)
})

test("ResponsePeers rection test", () => {
    var responsePeers = new ResponsePeers(['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/'])
    expect(responsePeers.react()).toEqual([])
})

test("RequestBlock validation test", () => {
    var requestBlock = new RequestBlocks('id',0,1)
    expect(requestBlock.validate()).toEqual(null)
})

test("RequestBlock reaction test", () => {
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block2)).toBeTruthy()
    var requestBlock = new RequestBlocks(blockchain.id,0,2)
    expect(requestBlock.react()).toEqual([new ResponseBlocks([block0,block1,block2])])
    localStorage.clear()
})

test("ResponseBlocks validation test", () => {
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block2)).toBeTruthy()
    var responseBlocks = new ResponseBlocks([block0.toJSON(),block1.toJSON(),block2.toJSON()])
    expect(responseBlocks.validate()).toEqual(null)
})
