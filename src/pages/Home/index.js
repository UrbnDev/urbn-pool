import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
import Token from '../../abis/Token.json'
import dBank from '../../abis/dBank.json';
import Web3 from 'web3';

import '../../assets/style/main.scss';

import './style.css';// Pagination module

// import components
import ListingAlbums from '../../components/ListingAlbums';
import Collection from '../../components/Collections';
import Carousel from '../../components/Carousel';

const web3 = new Web3(window.ethereum)

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
      <div className='content'>
          {/*
          
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
          
          */}

        <div className="container mt-5 text-center">
          <Collection />
          <div className="top-section top-artists">
            <h2>Top Artists</h2>
            <Carousel />
          </div>

          <div className="top-section hot-albums">
            <h2>Hot Albums</h2>
            <ListingAlbums />
          </div>

          <div className="top-section top-track">
            <h2>Top Tracks</h2>
            <Carousel />
          </div>

        </div>

      </div>
    );
  }
}

export default Home;
