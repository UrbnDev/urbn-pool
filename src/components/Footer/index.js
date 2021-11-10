import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';

import './style.scss';// Pagination module

import logo from '../../assets/img/logo-urbn.svg';

class Footer extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  setFavorite = () => {
    this.setState({
      
    })
  }
 
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Link to={`/`}>
              <img src={logo} className="app-logo" alt="logo" height="32"/>
            </Link>
            <p>Get the last updates</p>
            <Form className="d-flex flex-grow-1 subs-bar">
              <FormControl
                type="search"
                placeholder="Email"
                className="me-2"
                aria-label="Email"
              />
              <button type='submit' className='btn btn-primary'>Email me!</button>
            </Form>
          </Col>
          <Col xs={12} md={3}>
            <b>Music Pool</b>
            <ul>
              <li><a href="#">Explore</a></li>
              <li><a href="#">how it Works</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <b>Support</b>
            <ul>
              <li><a href="#">Hep Center</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Legal</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
