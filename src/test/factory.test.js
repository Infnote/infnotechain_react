import {Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from '../protocol'
import {Message} from '../protocol'
import {HandleJSONData} from '../protocol'

test("Handling info message", () => {
    var object = new Info({'version':'1.1','peers':2,'chains':[{'19AZfrNgBh5sxo5eVytX3K3yQvucS5vc45':10}],'platform':'web','fullNode':false})
    var message = Message.fromDict({'type':'info','data':object.toJSON()})
    expect(HandleJSONData(message.toJSON())).toEqual(object)
})

test("Handling requestBlocks message", () => {
    var object = new RequestBlocks({'chainID':'id','from':0,'to':2})
    var message = Message.fromDict({'type':'request:blocks','data':object.toJSON()})
    expect(HandleJSONData(message.toJSON())).toEqual(object)
})

test("Handling responseBlocks message", () => {
    var object = new ResponseBlocks({'blocksJSON':[{},{},{}]})
    var message = Message.fromDict({'type':'response:blocks','data':object.toJSON()})
    expect(HandleJSONData(message.toJSON())).toEqual(object)
})

test("Handling responsePeers message", () => {
    var object = new ResponsePeers({'peers':['wss://chain.infnote.com:32767/','ws://chain.infnote.com:32761/']})
    var message = Message.fromDict({'type':'response:peers','data':object.toJSON()})
    expect(HandleJSONData(message.toJSON())).toEqual(object)
})

test("Handling broadcastBlock message", () => {
    var object = new BroadcastBlock({'blockJSON':{}})
    var message = Message.fromDict({'type':'broadcast:block','data':object.toJSON()})
    expect(HandleJSONData(message.toJSON())).toEqual(object)
})

//TODO: Error test
// test("Handling requestBlocks message test", () => {
//     var object = new RequestBlocks({'chainID':'id','from':0,'to':2})
//     var message = Message.fromDict({'type':'request:blocks','data':object.toJSON()})
//     expect(HandleJSONData(message.toJSON())).toEqual(object)
// })

