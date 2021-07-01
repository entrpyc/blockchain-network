const fetch = require('isomorphic-unfetch')
const { Blockchain, Block, Transaction, sum } = require('../api/modules/blockchain-pow');

const sendTransaction = async (from, to, amount) => {
  const data = await fetch('http://localhost:8080/transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "fromAddress": from,
      "toAddress": to,
      "amount": amount,
    })
  })
  .then( r => r.json() )
  .then( data => {
    return data;
  });

  return data;
}

const mineTransactions = async (minerAddress) => {
  const data = await fetch('http://localhost:8080/mine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "miningRewardAddress": minerAddress,
    })
  })
  .then( r => r.json() )
  .then( data => {
    return data;
  });

  return data;
}

const getBlockchain = async () => {
  const data = await fetch('http://localhost:8080/blockchain')
  .then( r => r.json() )
  .then( data => {
    return data;
  });

  return data;
}

const getBalance = async (address) => {
  const data = await fetch('http://localhost:8080/balance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "address": address,
    })
  })
  .then( r => r.json() )
  .then( data => {
    return data;
  });

  return data;
}

test('deploys blockchain', async () => {
  const blockchain = await getBlockchain();

  expect(blockchain.chain.length).toBe(1);
});

test('sends transaction', async () => {
  const sender = "asen"
  const reciever = "tony"
  const amount = 200

  await sendTransaction(sender, reciever, amount);
  await sendTransaction(sender, reciever, amount + 200);

  const blockchain = await getBlockchain();

  expect(blockchain.pendingTransactions[0].fromAddress).toBe(sender);
  expect(blockchain.pendingTransactions[0].toAddress).toBe(reciever);
  expect(blockchain.pendingTransactions[0].amount).toBe(amount);
  expect(blockchain.pendingTransactions[1].fromAddress).toBe(sender);
  expect(blockchain.pendingTransactions[1].toAddress).toBe(reciever);
  expect(blockchain.pendingTransactions[1].amount).toBe(amount + 200);
});

test('mine transactions', async () => {
  const miner = "rico"

  await mineTransactions(miner);

  const blockchain = await getBlockchain();

  // add new block
  expect(blockchain.chain.length).toBe(2);

  // transactions must be included
  expect(blockchain.chain[1].transactions[0].amount).toBe(200);
  expect(blockchain.chain[1].transactions[1].amount).toBe(400);

  // send reward
  expect(blockchain.pendingTransactions[0].fromAddress).toBe(null);
  expect(blockchain.pendingTransactions[0].toAddress).toBe(miner);
});

test('get balance of users', async () => {
  const miner = "rico"
  const reciever = "tony"

  const minerBalance = await getBalance(miner);
  const recieverBalance = await getBalance(reciever);

  expect(minerBalance.balance).toBe(0);
  expect(recieverBalance.balance).toBe(600);
});