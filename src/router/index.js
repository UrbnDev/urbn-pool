import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { createBrowserHistory } from "history";

import Web3 from 'web3';

import DaiToken from '../abis/DaiToken.json';
import Faucet from '../abis/Faucet.json';

import Home from '../pages/Home';
import DetailsItem from '../pages/DetailsItem';

import Footer from '../components/Footer';
import Header from '../components/Header';

const web3 = new Web3(window.ethereum);

const history = createBrowserHistory();
class RouterApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      balance: 0,
      netId: '',
      accounts: '',
      connected: false,
    }
  }

  
  async componentWillMount() {
    if(typeof window.ethereum!=='undefined'){
      await this.loadWeb3();
      await this.loadContracts();
    } else {
      window.alert('Please install MetaMask')
    }
  }

  async loadWeb3() {
    // first of all enabled ethereum
    await window.ethereum.enable();
      
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts();

    
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
      console.log('loaded wallet: ', web3);
    } else {
      window.alert('Please login with MetaMask');
      return;
    }
  }

  async loadContracts(){
    const networkId = await web3.eth.net.getId();
    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ 
        wrongNet: false,
        daiToken,
        daiTokenBalance: daiTokenBalance.toString()
      })
      console.log('loaded dai contract: ', daiToken);
    } else {
      this.setState({ 
        wrongNet: true
      })
    }

    // Load Faucet Contract
    const faucetTokenData = Faucet.networks[networkId]
    if(faucetTokenData) {
      const faucetToken = new web3.eth.Contract(Faucet.abi, faucetTokenData.address)
      this.setState({ 
        wrongNet: false,
        faucetToken
      })
      console.log('loaded faucet: ', this.state.faucetToken);
    } else {
      this.setState({ 
        wrongNet: true
      })
    }
  }

  async connect() {
    await this.loadWeb3()
  }

  async disconnect() {
    
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
        connected: false
      })
    }

    
    // await web3.eth.currentProvider.disconnect();
    // await web3Modal.clearCachedProvider();
    //await this.loadWeb3(this.props.dispatch)
  }

  render() {
    console.log(this.state.faucetToken);
    return (
      <Router history={history}>
        <div>
          <Header connected={this.state.connected} connect={e => this.connect(e)} disconnect={e => this.disconnect(e)} />
          <Container className="warning">
            This is a Prototype. Is not intended to be used yet.
          </Container>
        
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
          <Routes>
            <Route path='/item/:id' element={<DetailsItem/>} />
          </Routes>

          <div className="footer">
            {
              this.state.daiToken && this.state.faucetToken &&
              <Footer 
                faucetToken={ this.state.faucetToken } 
                daiToken={this.state.daiToken}  
                account={ this.state.account }
              />
            }
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