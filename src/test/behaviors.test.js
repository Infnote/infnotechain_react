import {Info, RequestPeers, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from '../protocol'
import {Peers} from '../network'
import {Blockchain, Key} from '../blockchain'

test("Handling info message", () => {
    var object = new Info({'version':'1.1','peers':2,'chains':{'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45':10},'platform':'web','fullNode':false})
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([new RequestPeers({'count':2}), new RequestBlocks({'chain_id':'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45','from':0,'to':9})])
})

test("Handling requestBlocks message", () => {
    localStorage.clear()
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block2)).toBeTruthy()
    var object = new RequestBlocks({'chain_id':blockchain.id,'from':0,'to':2})
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([new ResponseBlocks({'blocks':[block0.toDict(),block1.toDict(),block2.toDict()]})])
    localStorage.clear()
})

test("Handling responseBlocks message", () => {
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
    var object = new ResponseBlocks({'blocks':[block0.toDict(),block1.toDict(),block2.toDict()]})
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([])
    localStorage.clear()
})

test("Handling requestPeer message test", () => {
    var object = new RequestPeers({'count':2})
    localStorage.clear()
    Peers.addPeers(['wss://chain.infnote.com:32767/','wss://chain.infnote.com:32761/'])
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','wss://chain.infnote.com:32761/']})])
    localStorage.clear()
})

test("Handling responsePeers message", () => {
    var object = new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/']})
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([])
})

test("Handling broadcastBlock message", () => {
    localStorage.clear()
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block0 = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block0)).toBeTruthy()
    let block1 = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block1)).toBeTruthy()
    let block2 = blockchain.createBlock(buf, 2)
    var object = new BroadcastBlock({'block':block2.toDict()})
    expect(object.validate()).toEqual(null)
    expect(object.react()).toEqual([])
    localStorage.clear()
})

//TODO: Error test


