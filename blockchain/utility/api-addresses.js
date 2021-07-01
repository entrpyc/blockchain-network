const ADDRESSES = {
  GET_BLOCKCHAIN: proccess.env.API_ADDRESS + '/blockchain',
  GET_BALANCE: proccess.env.API_ADDRESS + '/balance',
  POST_TRANSACTION: proccess.env.API_ADDRESS + '/transaction',
  POST_MINE_TRANSACTIONS: proccess.env.API_ADDRESS + '/mine',
}

module.exports.ADDRESSES = ADDRESSES;