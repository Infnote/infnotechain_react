import Message from './message'
import {Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from './behaviors'
import {Error} from './behaviors'

function HandleJSONData(jsonString) {
    let message = Message.fromJSON(jsonString)
    let data = JSON.parse(message.data)
    if (message.type === 'info'){
        return new Info(data)
    }
    if (message.type === 'request:blocks'){
        return new RequestBlocks(data)
    }
    if (message.type === 'request:peers'){
        return new RequestPeer(data)
    }
    if (message.type === 'response:blocks'){
        return new ResponseBlocks(data)
    }
    if (message.type === 'response:peers'){
        return new ResponsePeers(data)
    }
    if (message.type === 'broadcast:block'){
        return new BroadcastBlock(data)
    }
    if (message.type === 'error'){
        return new Error(data)
    }
}

export {HandleJSONData}