import { Blockchain, Block, Key } from '../blockchain'

test('Checking block ID', () => {
    const block = Block.fromDict({ "height": 0, "time": 1547626435, "prev_hash": "", "hash": "9xVd6PrTm37G1ZHLR8FN97RWxXFYGZeZnCezsJoEWoKj", "signature": "3oTwCniAQ8YSSoELazoj1S9am9g8SoefmrsDdR5Qe7mi5Js3zWBz9ApPS4VGuoXPTZ6u7MaEsESoUFXoNPuZVamhs", "payload": "5k1XmJn4556WCM" })
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    expect(blockchain.validateBlock(block)).toEqual(null)
    localStorage.clear()
});

test('Generate a blockchain with three blocks', () => {
    const buf = '5k1XmJn4556WCM'
    let blockchain = Blockchain.fromPrivateKey(Key.fromWIF("Kxqkq6zZyf8czck2iZpcp55MQ2zweE6qTz3DUEMy51igJoMvD54w"))
    let block = blockchain.createBlock(buf, 0)
    expect(blockchain.saveBlock(block)).toBeTruthy()
    block = blockchain.createBlock(buf, 1)
    expect(blockchain.saveBlock(block)).toBeTruthy()
    block = blockchain.createBlock(buf, 2)
    expect(blockchain.saveBlock(block)).toBeTruthy()
    localStorage.clear()
});