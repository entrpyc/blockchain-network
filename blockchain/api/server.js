const express = require('express');
const app = require('express')();
const { Blockchain, Transaction } = require("./modules/blockchain-pow");

const PORT = process.env.PORT || 8080;

const blockchain = new Blockchain();

app.use( express.json() )

app.use('/balance', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

app.use('/transaction', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

app.use('/mine', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

app.listen(
  PORT,
  () => console.log(`http://localhost:${PORT}`)
)

app.get('/blockchain', (req, res) => {
  res.status(200).send(blockchain)
});

app.post('/transaction', (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;

  if(!fromAddress || !toAddress || !amount) {
    res.status(400).send({ message: 'Invalid transaction' })
    return
  }

  blockchain.createTransaction(new Transaction(fromAddress, toAddress, amount))

  res.send({
    status: `Request completed: ${fromAddress} -> ${toAddress}: ${amount}`
  })
});

app.post('/balance', (req, res) => {
  const { address } = req.body;
  const walletBalance = blockchain.getBalanceOfAddress(address)

  res.send({
    balance: walletBalance
  })
});

app.post('/mine', (req, res) => {
  const { miningRewardAddress } = req.body;

  blockchain.minePendingTransactions(miningRewardAddress)

  res.send({
    status: `Mined all blocks! Reward will be sent to ${miningRewardAddress}`
  })
});

app.get('/verify-chain-integrity', (req, res) => {
  const success = blockchain.verifyChainIntegrity();
  res.status(200).send(success)
});
