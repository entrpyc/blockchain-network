import { useState } from "react"
import "./styles/global/_export.scss";
import { sendTransaction, mineTransactions, getBlockchain, getBalance } from "./utility/api-requests";

function App() {
  const [blockchain, setBlockchain] = useState();
  const [userBalance, setUserBalance] = useState();
  const [userAddressInput, setUserAddressInput] = useState('');
  const [userAddressFromInput, setUserAddressFromInput] = useState('');
  const [userAddressToInput, setUserAddressToInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [minerAddress, setMinerAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState();
  const [mineStatus, setMineStatus] = useState();

  async function onGetBlockchain() {
    const res = await getBlockchain();
    setBlockchain(JSON.stringify(res, null, 2))
  }

  async function onMineTransactions() {
    const res = await mineTransactions(minerAddress);
    
    setMineStatus(false)
    setTimeout(() => {
      setMineStatus(JSON.stringify(res))
    }, 50);
    setTimeout(() => {
      setMineStatus(false)
    }, 2000);
  }
  
  async function onSendTransaction() {
    const res = await sendTransaction(
      userAddressFromInput,
      userAddressToInput,
      amountInput
    );
    
    setTransactionStatus(false)
    setTimeout(() => {
      setTransactionStatus(JSON.stringify(res))
    }, 50);
    setTimeout(() => {
      setTransactionStatus(false)
    }, 2000);
  }

  async function onGetUserBalance() {
    const res = await getBalance(userAddressInput);
    setUserBalance(JSON.stringify(res))
  }

  return (
    <div className="app-container container">
      <div className="primary-button" onClick={onGetBlockchain}>Get Blockchain</div>
      
      <div className="wrapper flex center">
        <input type="text" placeholder="Address" onInput={e => setUserAddressInput(e.target.value)} value={userAddressInput} />
        <div className="primary-button" onClick={onGetUserBalance}>Get User Balance</div>
      </div>

      <div className="wrapper flex center">
        <input type="text" placeholder="From Address" value={userAddressFromInput} onInput={e => setUserAddressFromInput(e.target.value)}/>
        <input type="text" placeholder="To Address" value={userAddressToInput} onInput={e => setUserAddressToInput(e.target.value)}/>
        <input type="number" placeholder="Amount" value={amountInput} onInput={e => setAmountInput(e.target.value)}/>
        <div className="primary-button" onClick={onSendTransaction} >Send Transaction</div>
      </div>

      <div className="wrapper">
        <input type="text" placeholder="Miner Address" value={minerAddress} onInput={e => setMinerAddress(e.target.value)}/>
        <div className="primary-button" onClick={onMineTransactions}>Mine Transactions</div>
      </div>

      <div className="status">
        <pre>{blockchain}</pre>
      </div>

      <div className="status">
        {userBalance}
      </div>

      <div className="status">
        {transactionStatus}
      </div>
      
      <div className="status">
        {mineStatus}
      </div>
    </div>
  );
}

export default App;
