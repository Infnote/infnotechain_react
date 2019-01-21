import { Block } from '../blockchain'

test('Validate Block with height of 0 from Dict', () => {
    const block = Block.fromDict({"height":0,"time":1547626435,"prev_hash":"","hash":"9xVd6PrTm37G1ZHLR8FN97RWxXFYGZeZnCezsJoEWoKj","signature":"3oTwCniAQ8YSSoELazoj1S9am9g8SoefmrsDdR5Qe7mi5Js3zWBz9ApPS4VGuoXPTZ6u7MaEsESoUFXoNPuZVamhs","payload":"5k1XmJn4556WCM"})
    expect(block.isValid()).toBeTruthy()
});

test('Validate Block with height of 1 from Dict', () => {
    const block = Block.fromDict({"height":1,"time":0,"prev_hash":"DiuvcftK8K51umFQpFY71ipefjxMQ1dRyYsDyNrUozbP","hash":"8PGWMY5RkaQdrXMejfXBAXTtJS7DwtMBMwJ7escHxfz","signature":"3pByRSwh9X7ryhfbpdLiZCi8z2CKtokXr23GPeMdqTxo3amrMjjdSmVk4RFtG89ZgSjZxrsMjD3VauRb3zPZBazyS","payload":"5k1XmJn4556WCM"})
    expect(block.isValid()).toBeTruthy()
});