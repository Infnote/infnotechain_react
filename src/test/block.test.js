import { Block } from '../blockchain'

test('Import Block from Dict', () => {
    const block = Block.fromDict({"height":0,"time":1547626435,"prev_hash":"","hash":"9xVd6PrTm37G1ZHLR8FN97RWxXFYGZeZnCezsJoEWoKj","signature":"3oTwCniAQ8YSSoELazoj1S9am9g8SoefmrsDdR5Qe7mi5Js3zWBz9ApPS4VGuoXPTZ6u7MaEsESoUFXoNPuZVamhs","payload":"5k1XmJn4556WCM"})
    expect(block.isValid).toBeTruthy()
});
