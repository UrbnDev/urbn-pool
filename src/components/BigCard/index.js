import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Card } from 'react-bootstrap';

import './style.scss';// Pagination module

import favIcon from '../../assets/img/heart.png';
import favIconO from '../../assets/img/heart-o.png';

class BigCard extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
      isFavorite: false
    }
  }

  setFavorite = () => {
    this.setState({
      isFavorite: !this.state.isFavorite
    })
  }
 
  render() {
    return (
      <Card className="big-card">
        <Link to={`album/${this.state.item.id}`}>
          <div className="big-card-container">
            <div className="big-card-profile" style={{ backgroundImage: `url(${this.state.item.picture.medium})` }}></div>
            {/* <img className="verified" src={verified} alt={'verified'} /> */}
            <Card.Body>
              <Card.Title>{ this.state.item.album }</Card.Title>
              <div className="album-meta">
                <Card.Text>
                  { (Math.floor(Math.random() * (1000 - 100) + 100) / 100).toFixed(3) } ETH
                </Card.Text>
                <Card.Text onClick={this.setFavorite}>
                  <img className="favorite" src={ this.state.isFavorite ? favIcon : favIconO } alt={'favorite'} /> 92 
                </Card.Text>
              </div>
            </Card.Body>
          </div>
        </Link>
      </Card>
    );
  }
}

export default BigCard;
