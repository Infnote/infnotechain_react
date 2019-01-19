import Message from './message'
import { Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from './behaviors'
import Error from './errors'

function handleJSONData(jsonStrings) {
    let behaviors = []
    for (var i in jsonStrings) {
        let message = Message.fromJSON(jsonStrings[i])
        let data = JSON.parse(message.data)
        if (message.type === 'info') {
            behaviors.push(new Info(data))
            continue
        }
        if (message.type === 'request:blocks') {
            behaviors.push(new RequestBlocks(data))
            continue
        }
        if (message.type === 'request:peers') {
            behaviors.push(new RequestPeer(data))
            continue
        }
        if (message.type === 'response:blocks') {
            behaviors.push(new ResponseBlocks(data))
            continue
        }
        if (message.type === 'response:peers') {
            behaviors.push(new ResponsePeers(data))
            continue
        }
        if (message.type === 'broadcast:block') {
            behaviors.push(new BroadcastBlock(data))
            continue
        }
        if (message.type === 'error') {
            behaviors.push(new Error(data))
            continue
        }
    }
    return behaviors
}

export { handleJSONData }