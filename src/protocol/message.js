class Message {
    static generateID() {
        return Math.random().toString(36).substr(2)
    }

    static fromJSON(jsonString) {
        var data = JSON.parse(jsonString)
        var message = Message.fromDict(data)
        return message
    }

    static fromDict(data) {
        var message = new Message()
        message.type = data['type']
        message.data = data['data']
        message.id = data['id']
        return message
    }

    constructor(type = null, jsonString = null) {
        this.type = type
        this.data = JSON.parse(jsonString)
        this.id = Message.generateID()
    }

    get dict() {
        let data = {
            'type': this.type,
            'data': this.data,
            'id': this.id,
        }
        return data
    }

    toJSON() {
        return JSON.stringify(this.dict)
    }
}

export default Message