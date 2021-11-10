import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
import Token from '../../abis/Token.json'
import dBank from '../../abis/dBank.json';
import Web3 from 'web3';
import { Container, Row, Col } from 'react-bootstrap';

import '../../assets/style/main.scss';

import './style.scss';// Pagination module

// import components
import Header from '../../components/Header';
import Collection from '../../components/Collections';
import Carousel from '../../components/Carousel';
import ListingAlbums from '../../components/ListingAlbums';
import Footer from '../../components/Footer';

const web3 = new Web3(window.ethereum)

class DetailsAlbum extends Component {

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
      <div className="container mt-5 text-center">

      </div>
    );
  }
}

export default DetailsAlbum;
