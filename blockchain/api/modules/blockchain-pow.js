const { Blockchain, Block, Transaction } = require("../../network/consensus-protocols/protocol-pow");

function sum(a, b) {
  return a + b;
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;

module.exports.sum = sum;