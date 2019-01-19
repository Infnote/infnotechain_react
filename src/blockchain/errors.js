class Error {
    constructor(code, desc) {
        this.code = code
        this.desc = desc
    }

    static BlockValidationError(desc, block) {
        return new Error('BlockValidationError', desc + '\n' + block.toJSON())
    }

    static InvalidBlockError(desc, block) {
        return new Error('BlockValidationError', desc + '\n' + block.toJSON())
    }

    static ForkError(desc, block1, block2) {
        return new Error('BlockValidationError', desc + '\n' + block1.toJSON() + '\n' + block2.toJSON())
    }

    static ExistBlockError(desc, block) {
        return new Error('BlockValidationError', desc + '\n' + block.toJSON())
    }

    static MismatchedIDError(desc, block) {
        return new Error('BlockValidationError', desc + '\n' + block.toJSON())
    }

    static DangledBlockError(desc, block) {
        return new Error('BlockValidationError', desc + '\n' + block.toJSON())
    }
}

export default Error