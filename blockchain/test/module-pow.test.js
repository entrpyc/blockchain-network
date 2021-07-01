const { Blockchain, Block, Transaction, sum } = require('../api/modules/blockchain-pow');

test('deploys blockchain', () => {
  expect(sum(1, 2)).toBe(3);
});