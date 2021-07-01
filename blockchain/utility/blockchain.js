module.exports.getEpochTimestamp = function (){
  return Math.floor(new Date().getTime() / 1000)
}

module.exports.getHumanReadableBlockchain = function (blockchain){
  return JSON.stringify(blockchain, null, 4);
}