import Message from './message'
import { Info, RequestPeer, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from './behaviors'
import Error from './errors'

function handleJSONData(jsonString) {
    let message = Message.fromJSON(jsonString)
    let data = message.data
    var behavior = null
    if (message.type === 'info')
        behavior = new Info(data)
    else if (message.type === 'request:blocks')
        behavior = new RequestBlocks(data)
    else if (message.type === 'request:peers')
        behavior = new RequestPeer(data)
    else if (message.type === 'response:blocks')
        behavior = new ResponseBlocks(data)
    else if (message.type === 'response:peers')
        behavior = new ResponsePeers(data)
    else if (message.type === 'broadcast:block')
        behavior = new BroadcastBlock(data)
    else if (message.type === 'error')
        behavior = new Error(data)
    else {
        return [Message.fromError(Error.invalidMessageError('can not match the message type'))]
    }
    let err = behavior.validate()
    if (err !== null) {
        return [Message.fromError(err)]
    }

    return behavior.react().reduce((result, b) => {
        result.push(Message.fromBehavior(b))
        return result
    }, [])
}

export { handleJSONData }
