import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

import './style.scss';// Pagination module

import verified from '../../assets/img/verified.png';

class CarouselItem extends Component {

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
      <Card>
        <div className="artist-img-profile-container">
          <div className="artist-img-profile">
            <Card.Img variant="top" src={this.state.artist.picture.medium} />
          </div>
          <img className="verified" src={verified} alt={'verified'} />
        </div>
        <Card.Body>
          <Card.Title>{ this.state.artist.name.first + ' ' + this.state.artist.name.last }</Card.Title>
          <Card.Text>
            { (Math.floor(Math.random() * (1000 - 100) + 100) / 100).toFixed(3) } ETH
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CarouselItem;
