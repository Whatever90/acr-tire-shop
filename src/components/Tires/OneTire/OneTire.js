import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../../Navbar/Navbar";
import Slider from 'react-slick';
// import { Link } from 'react-router-dom';
import "./OneTire.css";
import aws from '../../images/aws.png'

export default class OneTire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tire: {},
      photos: []
    };
  }

  componentWillMount(){
    // console.log("ONE tire!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/tires/find/', id)
      .then(res => {
        this.setState({ tire: res.data, photos: res.data.photos })
        console.log(this.state.tire);
        console.log(this.state.tire.photos);
      })
      .catch(error => console.log(error));
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 1700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3700, // Delay between each auto scroll
      pauseOnHover: true
    };

    const display = this.state.photos
    .map((element, index) => {
      return (
        <div key={ index }>
          <div className="slider-container">
            <img className="slider-container-img" src={ element } alt="hui"/>
          </div>
        </div>
      )
    })

    return (
      <div>
        < Navbar />
        <div id="main">
          <div id="oneTire">
            <div className="container" id="tire">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.tire.brand} {this.state.tire.ration} {this.state.tire.width} {this.state.tire.diameter}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-tire-img" src={aws} alt="default image of a tire" id="noImage"/>}
                  {this.state.tire.photos && <Slider className="slider-component" {...settings}>
                    { display }
                    </Slider> }
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <p id="model">Count: {this.state.tire.count}, Type: {this.state.tire.type}, Condition: {this.state.tire.condition}</p>
                  <p id="condition">{this.state.tire.description}</p>
                </div>
                <div className="col-md-5">
                  <p id="price">${this.state.tire.price}</p>
                </div>
              </div>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}
