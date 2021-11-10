import React, { Component } from 'react';

import { Form, FormControl, Container, Row, Col } from 'react-bootstrap';

import './style.scss';// Pagination module

class Details extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      artist: this.props.artist
    }
  }
 
  render() {
    return (
      <Container>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;
