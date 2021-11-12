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
      items: this.props.items
    }

    // get getAlbum
    this.getAlbum();
  }

  getAlbum = () =>{

    console.log(this.state.items);

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

    return (
      <div  className="listing-albums-container">
        <div className="listing-albums">
          {
            this.state.items.map((item,i) => {
              return(
                <BigCard item={item} key={`item_${i}`} />
              )
            })
          }
        </div>
        <button className="btn btn-outline-success load-more" onClick={()=>{}}>Load More</button>
      </div>
    );
    
  }
}

export default Carousel;
