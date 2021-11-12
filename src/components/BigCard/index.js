import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Card } from 'react-bootstrap';

import './style.scss';// Pagination module

import favIcon from '../../assets/img/heart.png';
import favIconO from '../../assets/img/heart-o.png';

import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

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
    
    const price = this.state.item.sell_orders ? web3.utils.fromWei(this.state.item.sell_orders[0].base_price, 'ether') + ' ETH' : 'Not on Sell Yet'
    
    return (
      <Card className="big-card">
        <Link 
          to={{
            pathname: `item/${this.state.item.token_id}`
          }}
        >
          <div className="big-card-container">
            <div className="big-card-profile" style={{ backgroundImage: `url(${this.state.item.image_preview_url})` }}></div>
            {/* <img className="verified" src={verified} alt={'verified'} /> */}
            <Card.Body>
              <Card.Title>{ this.state.item.name }</Card.Title>
              <div className="album-meta">
                <Card.Text>
                  { price }
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
