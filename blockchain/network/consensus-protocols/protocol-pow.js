const { Transaction, Block, Blockchain } = require('../main');

class BlockPoF extends Block {
  constructor(transactions) {
    super(transactions);

    this.nonce = 0;
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class ConsensusProtocolPoF extends Blockchain {
  constructor() {
    super();

    this.difficulty = 2;
    this.miningReward = 1;
  }

  setMiningReward(reward) {
    this.miningReward = reward;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new BlockPoF(this.pendingTransactions);
    block.previousHash = this.getLastBlock().hash;
    block.mineBlock(this.difficulty);

    this.chain.push(block);
    this.chainLength = this.chain.length;

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }
}

module.exports.Blockchain = ConsensusProtocolPoF;
module.exports.Block = BlockPoF;
module.exports.Transaction = Transaction;