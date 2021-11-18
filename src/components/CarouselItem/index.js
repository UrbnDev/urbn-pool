import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap';
import Modal from 'react-modal';

import './style.scss';// Pagination module

import verified from '../../assets/img/verified.png';

import Web3 from 'web3';

// Contracts
import DaiToken from '../../abis/DaiToken.json';
import UrbnToken from '../../abis/UrbnToken.json';

const web3 = new Web3(window.ethereum);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


class CarouselItem extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      artist: this.props.artist,
      account: this.props.account,
      openModal: false,
      loading: true
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
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ 
        wrongNet: false,
        daiToken,
        daiTokenBalance: daiTokenBalance.toString()
      })
    } else {
      this.setState({ 
        wrongNet: true
      })
    }

    // Load urbnFarm
    const urbnFarmData = artistContract.networks[networkId]
    if(urbnFarmData) {
      const urbnFarm = new web3.eth.Contract(artistContract.abi, urbnFarmData.address)
      let stakingBalance = await urbnFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ 
        wrongNet: false,
        urbnFarm: urbnFarm,
        stakingBalance: stakingBalance.toString()
      });
    } else {
      this.setState({ wrongNet: true });
    }
  }

  stakeTokens = (amount) => {

    if (!this.depositAmount.value) return;
    console.log('stacking: ', amount);
    
    this.setState({ loading: true })
    console.log('approving dai before transact');
    this.state.daiToken.methods.approve(this.state.urbnFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.stakingTokens(amount);
    })

  }

  stakingTokens = (amount) =>{
    console.log('staking into contract: ', this.state.urbnFarm);
    console.log('staking by account: ', this.state.account);
    this.state.urbnFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      console.log('transaction done: ', hash);
      this.setState({ 
        loading: false
      });
      this.toogleModal();
      // refresh component
      this.loadContracts(this.state.artist.artistContract);
    })
  }
   
  toogleModal = () =>{ 
    console.log('toogle: ' );
    this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {
    if (this.state.wrongNet){
      return (
        <Card>
          <div className="artist-img-profile-container">
            <div className="artist-img-profile">
              <iframe src="https://giphy.com/embed/Y8a0CT2xsbo9G" width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
          </div>
          <Card.Body>
            <Card.Title>{ 'Warning' }</Card.Title>
            <Card.Text>
              Wrong Network
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }

    return (
      <div>
        <Card className="artist-img-profile-card" onClick={()=>this.toogleModal()} >
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
        <Modal
          isOpen={this.state.openModal}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          contentLabel="Stake Modal"
        >

          {
            !this.state.loading &&
            <div className="artist-invest-content">

              <a onClick={this.toogleModal} className="close"></a>

              <h4>
                How much would<br />you like to stake?
              </h4>

              <div className="form">
                <input
                  id='depositAmount'
                  step="0.01"
                  type='number'
                  ref={(input) => { this.depositAmount = input }}
                  className="form-control form-control-md"
                  placeholder='amount...'
                  disabled={this.state.loading}
                  required />
                  <span>(min 0.01) mDAI</span>
              </div>

              <div className="actions">
                <Button disabled={this.state.loading} onClick={()=>this.stakeTokens(this.depositAmount.value)} className="btn btn-primary">Stake</Button>
              </div>
              
            </div>
          }

          {
            this.state.loading &&
            <div className="artist-invest-content loading">

              <a onClick={this.toogleModal} className="close"></a>

              <div class="loader"></div>
              
            </div>
          }

        </Modal>
      </div>
    );
  }
}

export default CarouselItem;
