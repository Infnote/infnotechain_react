import Message from '../protocol/message'

class Peer {
    constructor(address = '', port = 80) {
        this.address = address
        this.port = port
        this.socket = null
    }

    connect(onmessage) {
        let url = 'ws://' + this.address + ':' + this.port
        this.socket = new WebSocket(url)

        // init socket
        this.socket.onopen = () => {
            let url = this.socket.url
            this.socket.send("test")
            console.info('Peer:[' + url + '] connected.')
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
            let message = Message.fromJSON(data.data)
            onmessage(message)
            console.log('Recv from peer:[' + this.socket.url + ']\n' + data.data)
        }
    }

    send(data)
    {
        this.socket.send(data)
    }
}

export default Peer