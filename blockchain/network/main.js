const SHA256 = require('crypto-js/sha256');
const util = require("../utility/blockchain")

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(transactions) {
    this.timestamp = util.getEpochTimestamp();
    this.transactions = transactions;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chainLength = 0;
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block([]);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      console.log(block)
      for (const transaction of block.transactions) {
        if(transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if(transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  verifyChainIntegrity() {
    for (let i = 1; i < this.chainLength; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

module.exports.Block = Block;
module.exports.Transaction = Transaction;
module.exports.Blockchain = Blockchain;