import React, { Component } from 'react';

import { Card } from 'react-bootstrap';
import axios from 'axios';

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

class Carousel extends Component {

  async componentWillMount() {
    
  }

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
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Quimico",
            "last": "Ultra Mega"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://resources.tidal.com/images/48cc6db5/7eac/4acd/b7dc/c4327e534754/750x750.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "El Cherry",
            "last": "Scom"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://diariosocialrd.com/wp-content/uploads/2021/05/el-cherry-scom.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "La Perversa",
            "last": ""
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://images.genius.com/37380464de5273a8a2ce715855b91f93.639x639x1.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Yailin",
            "last": "La Mas Barrial"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i.scdn.co/image/ab6761610000e5ebb908d04bb5cb68ee151258e5"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Nino",
            "last": "Freestyle"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://images.genius.com/e6a9c01b50c26cdcd987bd897e08169e.1000x1000x1.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Bulin",
            "last": "47"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://yt3.ggpht.com/ytc/AKedOLR9SNsW-DF3XCMC6IaH-nJRl2zx-MbZwGrYAjjGog=s900-c-k-c0x00ffffff-no-rj"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Tokisha",
            "last": ""
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i.scdn.co/image/ab6761610000e5eb9f6c10cfcdf00a6c8ab99194"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Nene",
            "last": "La Amenazzy"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://nuevodiario-assets.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/10/3bd3a531-amenazzy-2020.jpg"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "name": {
            "title": "Mr",
            "first": "Tivy",
            "last": "Gunz"
          },
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i1.sndcdn.com/avatars-inGrL2XvlJBa0P3S-gjKnBg-t500x500.jpg"
          },
          "nat": "FI"
        }
      ]
    }

    // get getArtists
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

  render() {
    console.log('getting artists: ', this.state.artists);
    if (this.state.artists.length > 0){
      return (
        <Swiper 
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={'auto'}
          navigation
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="carousel-swiper"
        >
          {
            this.state.artists.map((artist,i) => {
              return(
                <SwiperSlide key={`swipe_artist_${i}`} style={{ width: '180px' }}>
                  <CarouselItem artist={artist} />
                </SwiperSlide>
              )
            })
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
