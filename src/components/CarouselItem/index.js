import React, { Component } from 'react';

import { Card } from 'react-bootstrap';

import './style.scss';// Pagination module

import verified from '../../assets/img/verified.png';

import Web3 from 'web3';

// Contracts
import DaiToken from '../../abis/DaiToken.json';
import UrbnToken from '../../abis/UrbnToken.json';

const web3 = new Web3(window.ethereum);

class CarouselItem extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      artist: this.props.artist,
      account: this.props.account
    }

    if (this.state.artist?.artistContract){
      this.loadContracts(this.state.artist.artistContract);
    } else {
      window.alert('Missing Contract for Artist.')
    }

  }

  async loadContracts(artistContract) {
    const networkId = await web3.eth.net.getId();
    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load DappToken
    const urbnTokenData = UrbnToken.networks[networkId]
    if(urbnTokenData) {
      const urbnToken = new web3.eth.Contract(UrbnToken.abi, urbnTokenData.address)
      this.setState({ urbnToken })
      let urbnTokenBalance = await urbnToken.methods.balanceOf(this.state.account).call()
      this.setState({ urbnTokenBalance: urbnTokenBalance.toString() })
    } else {
      window.alert('UrbnToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = artistContract.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(artistContract.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
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
            { this.state.stakingBalance } DAI
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CarouselItem;
