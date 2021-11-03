import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';

const web3 = new Web3(window.ethereum)

class App extends Component {

  async componentWillMount() {
    if(typeof window.ethereum!=='undefined'){
      await this.loadBlockchainData(this.props.dispatch)
    } else {
      window.alert('Please install MetaMask')
    }
  }

  async loadBlockchainData(dispatch) {
    // first of all enabled ethereum
    await window.ethereum.enable();
      
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts()

    console.log(web3, accounts);

    //load balance
    if(accounts[0] && typeof accounts[0] !=='undefined'){
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({
        account: accounts[0], 
        balance: balance, 
        web3: web3,
        netId: netId,
        accounts: accounts,
        connected: true
      })
    } else {
      window.alert('Please login with MetaMask');
      return;
    }

    //load contracts
    try {
      // console.log('eth: ', Token.abi, Token.networks, netId);
      const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
      const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
      const dBankAddress = dBank.networks[netId].address;
      const dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
      console.log('bank address: ', dBankAddress, dBankAddressBalance);
      this.setState({
        token: token, 
        dbank: dbank, 
        dBankAddress: dBankAddress,
        dbankBalance: dBankAddressBalance
      })
    } catch (e) {
      console.log('Error', e)
      window.alert('Contracts not deployed to the current network')
    }
  }

  async deposit(amount) {
    if(this.state.dbank!=='undefined'){
      try{
        // make deposit to bank
        await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account});
        // get bank information
        const dBankAddress = dBank.networks[this.state.netId].address;
        const dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
        // reset new balance
        this.setState({
          dbankBalance: dBankAddressBalance
        })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
      document.getElementById("depositAmount").value = '';
    }
  }

  async connect() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async disconnect() {
    console.log(web3.eth);
    const self = this;
    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
    } catch (error) {
      this.setState({
        account: '', 
        balance: 0, 
        netId: '',
        accounts: [],
        connected: false,
        token: '', 
        dbank: '', 
        dBankAddress: '',
        dbankBalance: 0
      })
    }

    
    // await web3.eth.currentProvider.disconnect();
    // await web3Modal.clearCachedProvider();
    //await this.loadBlockchainData(this.props.dispatch)
  }

  async withdraw(e) {
    e.preventDefault()
    if(this.state.dbank!=='undefined'){
      try{
        const dBankAddress = dBank.networks[this.state.netId].address;
        const dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
        
        console.log(this.state.account, this.state.dbank.methods, dBankAddressBalance);
        await this.state.dbank.methods.withdraw().send({from: this.state.account})
        // get bank information
        dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
        console.log(dBankAddressBalance);
        // reset new balance
        this.setState({
          dbankBalance: dBankAddressBalance
        })
      } catch(e) {
        console.log('Error, withdraw: ', e)
      }
    }
  }

  async borrow(amount) {
    if(this.state.dbank!=='undefined'){
      try{
        await this.state.dbank.methods.borrow().send({value: amount.toString(), from: this.state.account})
        // get bank information
        const dBankAddress = dBank.networks[this.state.netId].address;
        const dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
        // reset new balance
        this.setState({
          dbankBalance: dBankAddressBalance
        })
      } catch (e) {
        console.log('Error, borrow: ', e)
      }
      document.getElementById("depositAmount").value = '';
    }
  }

  async payOff(e) {
    e.preventDefault()
    if(this.state.dbank!=='undefined'){
      try{
        const collateralEther = await this.state.dbank.methods.collateralEther(this.state.account).call({from: this.state.account})
        const tokenBorrowed = collateralEther/2
        await this.state.token.methods.approve(this.state.dBankAddress, tokenBorrowed.toString()).send({from: this.state.account})
        await this.state.dbank.methods.payOff().send({from: this.state.account})
        // get bank information
        const dBankAddress = dBank.networks[this.state.netId].address;
        const dBankAddressBalance = await web3.utils.fromWei(await web3.eth.getBalance(dBankAddress));
        // reset new balance
        this.setState({
          dbankBalance: dBankAddressBalance
        })
      } catch(e) {
        console.log('Error, pay off: ', e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dbankBalance: 0,
      dBankAddress: null,
      connected: false
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dbank} className="App-logo" alt="logo" height="32"/>
            <b>d₿ank</b>
          </a>
          <button className="btn btn-primary" onClick={(e) => this.connect(e)}>Connect</button>
          <button className="btn btn-primary" onClick={(e) => this.disconnect(e)}>Disconnect</button>
        </nav>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          <h1>Welcome to d₿ank</h1>
          <h2>{this.state.account}</h2>
          <h2>Balance</h2>
          <h2>{this.state.dbankBalance}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab disabled={!this.state.connected} eventKey="deposit" title="Deposit">
                  <div>
                  <br></br>
                    How much do you want to deposit?
                    <br></br>
                    (min. amount is 0.01 ETH)
                    <br></br>
                    (1 deposit is possible at the time)
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmount.value
                      amount = amount * 10**18 //convert to wei
                      this.deposit(amount)
                    }}>
                      <div className='form-group mr-sm-2'>
                      <br></br>
                        <input
                          id='depositAmount'
                          step="0.01"
                          type='number'
                          ref={(input) => { this.depositAmount = input }}
                          className="form-control form-control-md"
                          placeholder='amount...'
                          required />
                      </div>
                      <button type='submit' className='btn btn-primary'>DEPOSIT</button>
                    </form>

                  </div>
                </Tab>
                <Tab disabled={!this.state.connected} eventKey="withdraw" title="Withdraw">
                  <br></br>
                    Do you want to withdraw + take interest?
                    <br></br>
                    <br></br>
                  <div>
                    <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                  </div>
                </Tab>
                <Tab disabled={!this.state.connected} eventKey="borrow" title="Borrow">
                  <div>

                  <br></br>
                    Do you want to borrow tokens?
                    <br></br>
                    (You'll get 50% of collateral, in Tokens)
                    <br></br>
                    Type collateral amount (in ETH)
                    <br></br>
                    <br></br>
                    <form onSubmit={(e) => {

                      e.preventDefault()
                      let amount = this.borrowAmount.value
                      amount = amount * 10 **18 //convert to wei
                      this.borrow(amount)
                    }}>
                      <div className='form-group mr-sm-2'>
                        <input
                          id='borrowAmount'
                          step="0.01"
                          type='number'
                          ref={(input) => { this.borrowAmount = input }}
                          className="form-control form-control-md"
                          placeholder='amount...'
                          required />
                      </div>
                      <button type='submit' className='btn btn-primary'>BORROW</button>
                    </form>
                  </div>
                </Tab>
                <Tab disabled={!this.state.connected} eventKey="payOff" title="Payoff">
                  <div>

                  <br></br>
                    Do you want to payoff the loan?
                    <br></br>
                    (You'll receive your collateral - fee)
                    <br></br>
                    <br></br>
                    <button type='submit' className='btn btn-primary' onClick={(e) => this.payOff(e)}>PAYOFF</button>
                  </div>
                </Tab>
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
