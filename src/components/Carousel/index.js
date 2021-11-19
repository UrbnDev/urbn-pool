import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap';

import axios from 'axios';
import Web3 from 'web3';

// Core modules imports are same as usual
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

// Styles must use direct files imports
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import './style.scss';

import CarouselItem from '../CarouselItem';

// load contracts artists
import RochyFarm from '../../abis/RochyFarm.json';

const web3 = new Web3(window.ethereum);

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: [
        {
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Rochy",
            "last": "RD"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i1.sndcdn.com/avatars-frX1xoUA1fLoyyZ3-BDOpRA-t500x500.jpg"
          },
          "nat": "FI",
          "artistContract": RochyFarm
        }
      ],
      account: '', 
      balance: 0, 
      netId: '',
      connected: false
    }

    // get getArtists
    if(typeof window.ethereum!=='undefined'){
      this.loadWallet();
    } else {
      // not connected
    }
    
    this.getArtists();
    
  }

  getArtists = () =>{

    /*
    axios.get('https://randomuser.me/api/?results=50')
    .then(function (response) {
      // handle success
      console.log(response.data);
      if (response.data){
        self.setState({
          artists: response.data.results
        })
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    */

  }


  async loadWallet(){
    const netId = await web3.eth.net.getId()
    const accounts = await web3.eth.getAccounts();
    //load balance
    if(accounts[0] && typeof accounts[0] !=='undefined'){
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({
        account: accounts[0], 
        balance: balance, 
        web3: web3,
        netId: netId,
        connected: true
      })
    } else {
      window.alert('Please login with MetaMask');
      return;
    }
  }

  render() {
    
    if (this.state.artists.length > 0){
      return (
        <Swiper 
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={'auto'}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => {
            // console.log(swiper);
          }}
          onSlideChange={() => console.log('slide change')}
          className="carousel-swiper"
        >
          {
            this.state.account && this.state.artists.map((artist,i) => {
              return(
                <SwiperSlide key={`swipe_artist_${i}`} style={{ width: '180px' }}>
                  <CarouselItem 
                    artist={artist} 
                    account={this.state.account} 
                  />
                </SwiperSlide>
              )
            })
          }
          {
            !this.state.account &&
            <SwiperSlide style={{ width: '180px' }}>
              <Card>
                <div className="artist-img-profile-container">
                  <div className="artist-img-profile">
                    <iframe src="https://giphy.com/embed/Y8a0CT2xsbo9G" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{ 'Warning' }</Card.Title>
                  <Card.Text>
                    Wrong Network
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
          }
        </Swiper>
      );
    } else {
      return (
        <p>Loading ....</p>
      )
    }
    
  }
}

export default Carousel;
