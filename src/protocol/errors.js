import Behavior from './behavior'

class Error extends Behavior {
    constructor(code, desc) {
        super()
        this.code = code
        this.desc = desc
    }
}

export default Error