import Behavior from './behavior'

class Error extends Behavior {
    constructor(code, desc) {
        super()
        this.code = code
        this.desc = desc
    }

    static invalidMessageError(err) {
        return new Error("InvalidMessage", err)
    }

    static invalidBehaviorError(err) {
        return new Error("InvalidBehaviorError", err)
    }
    
    static incompatibleProtocolVersion(err) {
        return new Error("IncompatibleProtocolVersionError", err)
    }
    
    static badRequestError(err) {
        return new Error("BadRequestError", err)
    }
    
    static JSONDecodeError(err) {
        return new Error("JSONDecodeError", err)
    }
    
    static chainNotAcceptError(err) {
        return new Error("ChainNotAcceptError", err)
    }
    
    static blockValidationError(validateErr) {
        return new Error(validateErr.code, validateErr.desc)
    }
    
    static URLError(err) {
        return new Error("URLError", err)
    }
}

export default Error