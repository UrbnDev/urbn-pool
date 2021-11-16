import React, { Component } from 'react';

import './style.scss';// Pagination module

// import components
import Details from '../../components/Details';
class DetailsItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      item: ''
    }

    var path = window.location.pathname;
    var n = path.lastIndexOf('/');
    var token_id = path.substring(n + 1);
    console.log(token_id);

    this.getSingleItem(token_id);
  }

  getSingleItem = (token_id) => {
    const addressWallet = process.env.REACT_APP_WALLET_ADDRESS_STORE; 
    const url = `https://api.opensea.io/api/v1/assets?owner=${addressWallet}&token_ids=${token_id}&order_direction=desc&offset=0&limit=20`;
    const options = {method: 'GET'};

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.assets[0]);
        this.setState({
          item: data.assets[0] // always return only 1
        })
      })
      .catch(err => console.error('error:' + err));
  }

  render() {
    return (
      <div className="container mt-5 text-center">
        {
          this.state.item &&
          <Details item={this.state.item} />
        }
      </div>
    );
  }
}

export default DetailsItem;
