import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Button, Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import Modal from 'react-modal';
import Uniswap from '../Uniswap';

import logo from '../../assets/img/logo-urbn.svg';

import './style.scss';

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
      openUniswap: false
    }
  }
 
  toogleModal = () =>{ 
    console.log('toogle: ' );
    this.setState({
      openUniswap: !this.state.openUniswap
    })
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
                <Nav.Link href="#" disabled>My Activities</Nav.Link>
                <Nav.Link href="#" disabled>Following</Nav.Link>
                <Nav.Link onClick={()=> this.toogleModal()} >Uniswap</Nav.Link>
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

            <a onClick={this.toogleModal} class="close"></a>
            <Uniswap />
            
          </div>
        </Modal>
      </Navbar>
    );
  }
}

export default Header;
