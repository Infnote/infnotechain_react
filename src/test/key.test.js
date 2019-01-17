import { Key } from '../blockchain'

test('Generate Address', () => {
    const key = Key.fromWIF('L53XkZ7tWUcuXHqzpBdsPfbYvibTxNGTy5mWk4hTth2vbxujrDMg')
    expect(key.toAddress()).toEqual('1FuSPXH9MDy2qMpwMNqthGRyLpMpxLZo1r')
});

test('Generate WIF', () => {
    const key = Key.fromWIF('L53XkZ7tWUcuXHqzpBdsPfbYvibTxNGTy5mWk4hTth2vbxujrDMg')
    expect(key.toWIF()).toEqual('L53XkZ7tWUcuXHqzpBdsPfbYvibTxNGTy5mWk4hTth2vbxujrDMg')
});
