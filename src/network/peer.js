import Message from '../protocol/message'
import {Info} from '../protocol/behaviors'

class Peer {
    constructor(url) {
        this.url = url
        this.socket = null
    }

    connect(onmessage) {
        this.socket = new WebSocket(this.url)

        // init socket
        this.socket.onopen = () => {
            let url = this.socket.url
            let info = Info.create()
            let message = new Message('info', info.toJSON())
            this.socket.send(message)
            console.info('Peer:[' + url + '] is connected.')
        }
        this.socket.onerror = (err) => {
            let url = this.socket.url
            console.error('Peer:[' + url + '] error: \n' + JSON.stringify(err))
        }
        this.socket.onclose = () => {
            //let url = this.socket.url
            // retry mechanism to be done
        }
        this.socket.onmessage = (data) => {
            onmessage(data.data)
            console.log('Recv from peer:[' + this.socket.url + ']\n' + data.data)
        }
    }

    send(data)
    {
        this.socket.send(data)
    }
}

export default Peer