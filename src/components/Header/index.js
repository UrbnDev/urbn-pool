import React, { Component } from 'react';

import { Button, Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';

import logo from '../../assets/img/logo-urbn.svg';

import './style.scss';

class Header extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} className="App-logo" alt="logo" height="32"/>
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
                <Nav.Link href="#" className="active">Explore</Nav.Link>
                <Nav.Link href="#">My Activities</Nav.Link>
                <Nav.Link href="#">Following</Nav.Link>
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
      </Navbar>
    );
  }
}

export default Header;
