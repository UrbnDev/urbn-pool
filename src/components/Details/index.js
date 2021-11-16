import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

import './style.css';// Pagination module

import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
class Details extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item
    }

    console.log(this);
  }
 
  render() {
    const price = this.state.item.sell_orders ? web3.utils.fromWei(this.state.item.sell_orders[0].base_price, 'ether') + ' ETH' : 'Not on Sell Yet';
    const sold = this.state.item.num_sales ? this.state.item.num_sales : 0;
    const available = this.state.item.sell_orders ? this.state.item.sell_orders[0].quantity : 0;
    return (
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="detail-image" style={{ backgroundImage: `url(${this.state.item.image_url})` }}></div>
          </Col>
          <Col xs={12} md={6}>
            <div className="details-content">
              <div className="details-title">
                <h2>{ this.state.item.name }</h2>
                <div className="price">from { price } <div className="dot"></div> { available - sold } of { available } available</div>
              </div>
              <div className="details-creator">
                <h6 className="details-creator-title">Creator</h6>
                <div className="details-creator-profile">
                  <div className="details-creator-profile-img" style={{ backgroundImage: `url(${ this.state.item.creator.profile_img_url})` }}></div>
                  <div className="details-creator-profile-name">{ this.state.item.creator.user.username }</div>
                </div>
              </div>
              <div className="details-tabs">
                <Tabs defaultActiveKey="details" id="uncontrolled-tab" className="mb-3">
                  <Tab eventKey="details" title="Details">
                    <p>{ this.state.item.description }</p>
                  </Tab>
                  <Tab eventKey="offers" title="Offers" disabled>
                    <p>{ '-' }</p>
                  </Tab>
                  <Tab eventKey="history" title="History" disabled>
                    <p>{ '-' }</p>
                  </Tab>
                </Tabs>
              </div>
              <div className="details-actions">
                <a className="btn btn-primary my-2 my-sm-0" href={ this.state.item.permalink } target="_blank">Buy on Opensea</a>
                <Link className="goBack" to={`/`}>
                  Go Back
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Details;
