import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import BigCard from '../BigCard';

import './style.scss';// Pagination module

class Carousel extends Component {

  async componentWillMount() {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      albums: [
        {
          "gender": "male",
          "id": 'cbjdbcuefv-22324324', 
          "name": {
            "title": "Mr",
            "first": "Rochy",
            "last": "RD"
          },
          "album": 'Team Wa Wa Wa Pal Mundo Entero Vol. 3',
          "email": "Team Wa Wa Wa Pal Mundo Entero Vol. 3",
          "picture": {
            "medium": "https://i1.sndcdn.com/avatars-frX1xoUA1fLoyyZ3-BDOpRA-t500x500.jpg"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-22324es4', 
          "name": {
            "title": "Mr",
            "first": "Quimico",
            "last": "Ultra Mega"
          },
          "album": 'Vamo a da Una Vuelta',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://resources.tidal.com/images/48cc6db5/7eac/4acd/b7dc/c4327e534754/750x750.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-22324345678', 
          "name": {
            "title": "Mr",
            "first": "El Cherry",
            "last": "Scom"
          },
          "album": 'Con To & Video',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://diariosocialrd.com/wp-content/uploads/2021/05/el-cherry-scom.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-2232ghd64', 
          "name": {
            "title": "Mr",
            "first": "La Perversa",
            "last": ""
          },
          "album": 'Vaqueo',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://images.genius.com/37380464de5273a8a2ce715855b91f93.639x639x1.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-vhjfbvjfbnk4454', 
          "name": {
            "title": "Mr",
            "first": "Yailin",
            "last": "La Mas Barrial"
          },
          "album": 'La Mas Viral',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i.scdn.co/image/ab6761610000e5ebb908d04bb5cb68ee151258e5"
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-cjfdv566', 
          "name": {
            "title": "Mr",
            "first": "Nino",
            "last": "Freestyle"
          },
          "album": 'No Hago Coro',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://images.genius.com/e6a9c01b50c26cdcd987bd897e08169e.1000x1000x1.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-cvbfjbvjg567', 
          "name": {
            "title": "Mr",
            "first": "Nene",
            "last": "Freestyle"
          },
          "album": 'La Ameazzy',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://nuevodiario-assets.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/10/3bd3a531-amenazzy-2020.jpg",
          },
          "nat": "FI"
        },{
          "gender": "male",
          "id": 'cbjdbcuefv-458568gnv', 
          "name": {
            "title": "Mr",
            "first": "Nino",
            "last": "Freestyle"
          },
          "album": 'Tivy Gunz',
          "email": "valtteri.kuusisto@example.com",
          "picture": {
            "medium": "https://i1.sndcdn.com/avatars-inGrL2XvlJBa0P3S-gjKnBg-t500x500.jpg",
          },
          "nat": "FI"
        }
      ]
    }

    // get getAlbum
    this.getAlbum();
  }

  getAlbum = () =>{

    /*
    axios.get('https://randomuser.me/api/?results=50')
    .then(function (response) {
      // handle success
      console.log(response.data);
      if (response.data){
        self.setState({
          Album: response.data.results
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
    console.log('getting Album: ', this.state.Album);
    if (this.state.albums.length > 0){
      return (
        <div  className="listing-albums-container">
          <div className="listing-albums">
            {
              this.state.albums.map((album,i) => {
                console.log(album);
                return(
                  <BigCard item={album} />
                )
              })
            }
          </div>
          <button className="btn btn-outline-success load-more" onClick={()=>{}}>Load More</button>
        </div>
      );
    } else {
      return (
        <p>Loading ....</p>
      )
    }
    
  }
}

export default Carousel;
