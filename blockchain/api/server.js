const express = require('express');
const app = require('express')();
const { Blockchain, Transaction } = require("./modules/blockchain-pow");

const PORT = 8080;

const blockchain = new Blockchain();

app.use( express.json() )

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

app.get('/balance', (req, res) => {
  const { address } = req.body;
  const walletBalance = blockchain.getBalanceOfAddress(address)

  res.send({
    balance: `${address}: ${walletBalance}`
  })
});

app.post('/mine', (req, res) => {
  const { miningRewardAddress } = req.body;

  latte.minePendingTransactions(miningRewardAddress)

  res.send({
    status: `Mined all blocks! Reward will be sent to ${miningRewardAddress}`
  })
});