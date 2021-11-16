import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { createBrowserHistory } from "history";

import Token from '../abis/Token.json';
import dBank from '../abis/dBank.json';
import Web3 from 'web3';

import Home from '../pages/Home';
import DetailsItem from '../pages/DetailsItem';

import Footer from '../components/Footer';
import Header from '../components/Header';

const web3 = new Web3(window.ethereum);

const history = createBrowserHistory();

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
      <Router history={history}>
        <div>
          <Header connected={this.state.connected} connect={e => this.connect(e)} disconnect={e => this.disconnect(e)} />
          <Container fliud className="warning">
            this is a Prototype. Is not intended to be used yet.
          </Container>
        
          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
          <Routes>
            <Route path='/item/:id' element={<DetailsItem/>} />
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