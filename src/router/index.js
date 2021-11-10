import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import Token from '../abis/Token.json'
import dBank from '../abis/dBank.json';
import Web3 from 'web3';

import Home from '../pages/Home';
import DetailsAlbum from '../pages/DetailsAlbum';

import Footer from '../components/Footer';
import Header from '../components/Header';

const web3 = new Web3(window.ethereum)

class RouterApp extends Component {
  async componentWillMount() {
    if(typeof window.ethereum!=='undefined'){
      await this.loadBlockchainData()
    } else {
      window.alert('Please install MetaMask')
    }
  }

  async loadBlockchainData() {
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
    await this.loadBlockchainData()
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
      <Router>
        <div>
          <Header connected={this.state.connected} connect={e => this.connect(e)} disconnect={e => this.disconnect(e)} />
          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
          <Routes>
            <Route path='/album/:id' element={<DetailsAlbum/>} />
          </Routes>

          <div className="footer">
            <Footer />
          </div>

          <div className="copywriting">
            <Container>
              <Row>
                <Col>
                  @2021 Urbn Music Pool
                </Col>
                <Col>
                    
                </Col>
              </Row>
            </Container>
          </div>

        </div>
      </Router>
    );
  }
}

export default RouterApp;