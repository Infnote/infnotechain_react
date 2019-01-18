import {Info, RequestPeer, ResponsePeers,RequestBlocks, ResponseBlocks, BroadcastBlock} from '../protocol/behaviors'
import {Blockchain, Key} from '../blockchain'

test("Info rection test", () => {
    localStorage.clear()
    var info = new Info({'version':'1.1','peers':2,'chains':[{'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45':10}],'platform':'web','fullNode':false})
    expect(info.validate()).toEqual(null)
    expect(info.react()).toEqual([new RequestPeer({'count':2}), new RequestBlocks({'chainID':'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45','from':0,'to':9})])
    localStorage.clear()
})

test("RequestPeer rection test", () => {
    var requestPeer = new RequestPeer({'count':2})
    expect(requestPeer.validate()).toEqual(null)
    expect(requestPeer.react()).toEqual([new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','wss://chain.infnote.com:32761/']})])
})

test("ResponsePeers rection test", () => {
    var responsePeers = new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/']})
    expect(responsePeers.validate()).toEqual(null)
    expect(responsePeers.react()).toEqual([])
})

test("RequestBlock test", () => {
    localStorage.clear()
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block2)).toBeTruthy()
    var requestBlock = new RequestBlocks({'chainID':blockchain.id,'from':0,'to':2})
    expect(requestBlock.validate()).toEqual(null)
    expect(requestBlock.react()).toEqual([new ResponseBlocks({'blocksJSON':[block0.toJSON(),block1.toJSON(),block2.toJSON()]})])
    localStorage.clear()
})

test("ResponseBlocks test", () => {
    localStorage.clear()
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block2)).toBeTruthy()
    localStorage.clear()
    var responseBlocks = new ResponseBlocks({'blocksJSON':[block0.toJSON(),block1.toJSON(),block2.toJSON()]})
    expect(responseBlocks.validate()).toEqual(null)
    expect(responseBlocks.react()).toEqual([])
    localStorage.clear()
})

test("BroadcastBlock test", () => {
    localStorage.clear()
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    var broadcastBlock = new BroadcastBlock({'blockJSON':block2.toJSON()})
    expect(broadcastBlock.validate()).toEqual(null)
    expect(broadcastBlock.react()).toEqual([])
    localStorage.clear()
})
