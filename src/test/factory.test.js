import {Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from '../protocol'
import {Message} from '../protocol'
import {handleJSONData} from '../protocol'

test("Handling info message", () => {
    var object = new Info({'version':'1.1','peers':2,'chains':[{'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45':10}],'platform':'web','fullNode':false})
    var message = new Message('info',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling requestBlocks message", () => {
    var object = new RequestBlocks({'chainID':'id','from':0,'to':2})
    var message = new Message('request:blocks',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling responseBlocks message", () => {
    var object = new ResponseBlocks({'blocksJSON':[{},{},{}]})
    var message = new Message('response:blocks',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling requestPeer message test", () => {
    var object = new RequestPeer({'count':2})
    var message = new Message('request:peers',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling responsePeers message", () => {
    var object = new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/']})
    var message = new Message('response:peers',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling broadcastBlock message", () => {
    var object = new BroadcastBlock({'blockJSON':{}})
    var message = new Message('broadcast:block',object.toJSON())
    expect(handleJSONData([message.toJSON()])).toEqual([object])
})

test("Handling multiple messages", () => {
    var object1 = new Info({'version':'1.1','peers':2,'chains':[{'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45':10}],'platform':'web','fullNode':false})
    var message1 = new Message('info',object1.toJSON())
    var object2 = new RequestBlocks({'chainID':'id','from':0,'to':2})
    var message2 = new Message('request:blocks',object2.toJSON())
    expect(handleJSONData([message1.toJSON(),message2.toJSON()])).toEqual([object1,object2])
})
//TODO: Error test


