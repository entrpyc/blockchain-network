const SHA256 = require('crypto-js/sha256');
const util = require("./utility")

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
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chainLength = 0;
    this.difficulty = 2;
    this.miningReward = 1;
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(util.getEpochTimestamp(), [], SHA256(0).toString());
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(this.pendingTransactions);
    block.previousHash = this.getLastBlock().hash;
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.chainLength = this.chain.length;

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
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

  setMiningReward(reward) {
    this.miningReward = reward;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
}

module.exports.Block = Block;
module.exports.Transaction = Transaction;
module.exports.Blockchain = Blockchain;