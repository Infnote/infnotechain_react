import Message from './message'
import { Info, RequestPeers, ResponsePeers, RequestBlocks, ResponseBlocks, BroadcastBlock } from './behaviors'
import Error from './errors'
import {log} from '../utils'

function handleJSONData(jsonString, address) {
    let message = Message.fromJSON(jsonString)
    let data = message.data
    var behavior = null
    if (message.type === 'info')
        behavior = new Info(data)
    else if (message.type === 'request:blocks')
        behavior = new RequestBlocks(data)
    else if (message.type === 'request:peers')
        behavior = new RequestPeers(data)
    else if (message.type === 'response:blocks')
        behavior = new ResponseBlocks(data)
    else if (message.type === 'response:peers')
        behavior = new ResponsePeers(data)
    else if (message.type === 'broadcast:block')
        behavior = new BroadcastBlock(data, message.id, address)
    else if (message.type === 'error')
        behavior = new Error(data)
    else {
        return [Message.fromError(Error.invalidMessageError('can not match the message type'))]
    }

    log.info('message received, type: ' + message.type)

    let err = behavior.validate()
    if (err !== null) {
        log.info('error message generated: ' + err.desc)
        return [Message.fromError(err)]
    }

    return behavior.react().reduce((result, b) => {
        let msg = Message.fromBehavior(b)
        result.push(msg)
        log.info('response message generated, type: ' + msg.type)
        return result
    }, [])
}

export { handleJSONData }
