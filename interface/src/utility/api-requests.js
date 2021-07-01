import fetch from "isomorphic-unfetch";

export const sendTransaction = async (from, to, amount) => {
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

export const mineTransactions = async (minerAddress) => {
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

export const getBlockchain = async () => {
  const data = await fetch('http://localhost:8080/blockchain')
  .then( r => r.json() )
  .then( data => {
    return data;
  });

  return data;
}

export const getBalance = async (address) => {
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