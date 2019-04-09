import Message from '../protocol/message'
import {Info} from '../protocol/behaviors'
import {log} from '../utils'

class Peer {
    constructor(url) {
        this.url = url
        this.socket = null
    }

    get isConnect() {
        if (!this.socket) {
            return false
        }
        return this.socket.readyState === this.socket.OPEN
    }

    connect(handleMessage, handleClose, handleConnection) {
        try {
            this.socket = new WebSocket(this.url)
        }
        catch(err) {
            log.info( err)
            return false
        }

        // init socket
        this.socket.onopen = () => {
            let url = this.socket.url
            log.info( url + ' is connected.')
            let info = Info.create()
            let message = new Message('info', info.toDict())
            this.socket.send(message.toJSON())
            log.info('sent info to ' + url)
            if (handleConnection) {
                handleConnection(this)
            }
        }
        this.socket.onerror = (err) => {
            let url = this.socket.url
            log.info('got socket error from ' + url + ':\n' + JSON.stringify(err))
        }
        this.socket.onclose = () => {
            let url = this.socket.url
            log.info( url + ' is closed.')
            if (handleClose) {
                handleClose(this)
            }
            // retry mechanism to be done
        }
        this.socket.onmessage = response => {
            let url = this.socket.url
            if (!handleMessage) {
                return
            }
            let messages = handleMessage(response.data, url)
            if (messages && messages.length > 0){
                messages.forEach(msg => {
                    this.socket.send(msg.toJSON())
                })
            }
        }
    }

    close() {
        this.socket.close(1000)
    }

    send(data) {
        this.socket.send(data)
    }
}

export default Peer