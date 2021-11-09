import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

import './style.scss';

import backgroundCollection from '../../assets/img/collection.png';

class Collection extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    
    return (
      <Card className="d-flex collection" style={{ background: `url(${backgroundCollection})` }}>
        <Card.Body>
          <Card.Title>Discover, invest, and sell extraordinary Music NFTs</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default Collection;
