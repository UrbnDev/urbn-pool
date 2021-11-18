import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Button, Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import Modal from 'react-modal';
import Uniswap from '../Uniswap';

import logo from '../../assets/img/logo-urbn.svg';

import './style.scss';

import Web3 from 'web3';

import UrbnToken from '../../abis/UrbnToken.json';

const web3 = new Web3(window.ethereum);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Header extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      openUniswap: false,
      urbnTokenBalance: 0,
      wrongNet: false
    }
  }
 
  toogleModal = () =>{ 
    console.log('toogle: ' );
    this.setState({
      openUniswap: !this.state.openUniswap
    })
  }

  async loadContracts() {
    const networkId = await web3.eth.net.getId();
    // Load UrbnToken
    const urbnTokenData = UrbnToken.networks[networkId]
    if(urbnTokenData) {
      const urbnToken = new web3.eth.Contract(UrbnToken.abi, urbnTokenData.address)
      let urbnTokenBalance = await urbnToken.methods.balanceOf(this.state.account).call()
      this.setState({ 
        wrongNet: false,
        urbnToken,
        urbnTokenBalance: urbnTokenBalance.toString()
      })
    } else {
      this.setState({ 
        wrongNet: true
      })
    }
  }

  render() {
    
    return (
      <Navbar expand="lg" className="main-menu">
        <Container>
          <Navbar.Brand>
            <Link to={`/`}>
              <img src={logo} className="App-logo" alt="logo" height="32"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-between">
            <div className="d-flex navbar-middle align-items-center">
              <Form className="d-flex flex-grow-1 search-bar">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
              >
                <Link to="/" className="nav-link active">Explore</Link>
                <Nav.Link href="#" disabled>Following</Nav.Link>
                <Nav.Link onClick={()=> this.toogleModal()} >Uniswap</Nav.Link>
                <Nav.Link href="#" disabled>{ this.state.urbnTokenBalance } URBN</Nav.Link>
              </Nav>
            </div>
            <div className="buttons">
              {
                this.props.connected &&
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.disconnect}>Disconnect</button>
              }
              {
                !this.props.connected &&
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.props.connect}>Connect</button>
              }
            </div>
          </Navbar.Collapse>
        </Container>
        <Modal
          isOpen={this.state.openUniswap}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
          contentLabel="Uniswap Modal"
        >

          <div className="uniswap-content">

            <a onClick={this.toogleModal} className="close"></a>
            <Uniswap />
            
          </div>
        </Modal>
      </Navbar>
    );
  }
}

export default Header;
